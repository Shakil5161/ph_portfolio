"use client"

import {
  type ColumnDef,
  type ColumnFiltersState,
  type FilterFn,
  flexRender,
  getCoreRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  type PaginationState,
  type Row,
  type SortingState,
  useReactTable,
  type VisibilityState,
} from "@tanstack/react-table"
import {
  ChevronDownIcon,
  ChevronFirstIcon,
  ChevronLastIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
  CircleAlertIcon,
  CircleXIcon,
  EllipsisIcon,
  FilterIcon,
  ListFilterIcon,
  TrashIcon
} from "lucide-react"
import { useId, useRef, useState } from "react"

import { deleteProject } from "@/action/project/deleteProject"
import { extractTextFromLexical } from "@/app/helpers/lexicalParser"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Skeleton } from "@/components/ui/skeleton"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

type Item = {
  id: string;
  title: string;
  slug: string;
  description: string;
  image?: string;
  liveUrl?: string;
  githubUrl?: string;
  videoUrl?: string;
  featured: boolean;
  techStack: string[];
  content?: string; // Added content field for description
}

type ProjectTableProps = {
  data: Item[];
  isLoading?: boolean;
  error?: any;
};

// Custom filter function for multi-column searching
const multiColumnFilterFn: FilterFn<Item> = (row, columnId, filterValue) => {
  const searchableRowContent =
        `${row.original.title} ${row.original.techStack?.join(' ')}`.toLowerCase();
  const searchTerm = (filterValue ?? "").toLowerCase()
  return searchableRowContent.includes(searchTerm)
}

const columns: ColumnDef<Item>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    size: 40,
    enableSorting: false,
    enableHiding: false,
  },
  {
    header: "Name",
    accessorKey: "title",
    cell: ({ row }) => {
      const title = row.getValue("title") as string
      return (
        <div className="font-medium min-w-[120px] max-w-[200px]">
          <div className="truncate" title={title}>
            {title}
          </div>
        </div>
      )
    },
    size: 200,
    filterFn: multiColumnFilterFn,
    enableHiding: false,
  },
  {
    header: "Description",
    accessorKey: 'content',
    cell: ({ row }) => {
      const rawContent = row.getValue("content") as string;
      let text = "";

      try {
        const parsed = JSON.parse(rawContent);
        text = extractTextFromLexical(parsed);
      } catch {
        text = rawContent || "";
      }

      return (
        <div className="min-w-[150px] max-w-[300px]">
          <div className="text-sm text-muted-foreground line-clamp-2 truncate" title={text}>
            {text || "No description"}
          </div>
        </div>
      );
    },
    size: 300,
  },
  {
    header: "Live Link",
    accessorKey: "liveUrl",
    cell: ({ row }) => {
      const liveUrl = row.getValue("liveUrl") as string;
      return (
        <div className="min-w-[100px] max-w-[150px]">
          {liveUrl ? (
            <a 
              href={liveUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 truncate block text-sm"
              title={liveUrl}
            >
              {liveUrl.length > 20 ? `${liveUrl.slice(0, 20)}...` : liveUrl}
            </a>
          ) : (
            <span className="text-muted-foreground text-sm">No link</span>
          )}
        </div>
      )
    },
    size: 150,
  },
  {
    header: "Featured",
    accessorKey: "featured",
    cell: ({ row }) => {
      const featured = row.getValue("featured") as boolean;
      return (
        <div className="min-w-[80px] max-w-[100px]">
          <Badge
            className={cn(
              "px-2 py-1 text-xs font-medium rounded-md truncate",
              featured
                ? "bg-green-100 text-green-800"
                : "bg-yellow-100 text-yellow-800"
            )}
          >
            {featured ? "Featured" : "Default"}
          </Badge>
        </div>
      );
    },
    size: 100,
  },
  {
    header: "Tech Stack",
    accessorKey: "techStack",
    cell: ({ row }) => {
      const tags = row.getValue("techStack") as string[] || [];

      const tagColors: Record<string, string> = {
        "React": "bg-blue-100 text-blue-800",
        "Next.js": "bg-gray-100 text-gray-800",
        "Node.js": "bg-green-100 text-green-800",
        "Express": "bg-emerald-100 text-emerald-800",
        "MongoDB": "bg-teal-100 text-teal-800",
        "JavaScript": "bg-yellow-100 text-yellow-800",
        "TypeScript": "bg-sky-100 text-sky-800",
        "GraphQL": "bg-pink-100 text-pink-800",
        "Firebase": "bg-orange-100 text-orange-800",
        "PostgreSQL": "bg-blue-100 text-blue-800",
        "Tailwind CSS": "bg-cyan-100 text-cyan-800",
        "Redis": "bg-red-100 text-red-800",
        "Socket.io": "bg-purple-100 text-purple-800",
      };

      return (
        <div className="min-w-[120px] max-w-[200px]">
          <div className="flex flex-wrap gap-1 max-h-12 overflow-hidden">
            {tags.slice(0, 3).map((tag, index) => (
              <Badge
                key={index}
                className={cn(
                  "text-xs font-medium rounded-md truncate max-w-[80px]",
                  tagColors[tag] || "bg-gray-100 text-gray-800"
                )}
                title={tag}
              >
                {tag}
              </Badge>
            ))}
            {tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{tags.length - 3}
              </Badge>
            )}
          </div>
        </div>
      );
    },
    size: 200,
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => <RowActions row={row} />,
    size: 60,
    enableHiding: false,
  },
]

export default function ProjectTable({ data, isLoading }: ProjectTableProps) {
  const id = useId()
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [pagination, setPagination] = useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  })
  const inputRef = useRef<HTMLInputElement>(null)
  const [sorting, setSorting] = useState<SortingState>([{ id: "title", desc: false }])

  const handleDeleteRows = () => {
    console.log("delete handle")
  }

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onSortingChange: setSorting,
    enableSortingRemoval: false,
    getPaginationRowModel: getPaginationRowModel(),
    onPaginationChange: setPagination,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getFilteredRowModel: getFilteredRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    state: {
      sorting,
      pagination,
      columnFilters,
      columnVisibility,
    },
  })

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          {/* Filter by name or tags */}
          <div className="relative min-w-[200px] flex-1">
            <Input
              id={`${id}-input`}
              ref={inputRef}
              className={cn(
                "peer w-full ps-9",
                Boolean(table.getColumn("title")?.getFilterValue()) && "pe-9"
              )}
              value={(table.getColumn("title")?.getFilterValue() ?? "") as string}
              onChange={(e) => table.getColumn("title")?.setFilterValue(e.target.value)}
              placeholder="Filter by name or tags..."
              type="text"
              aria-label="Filter by name or tags"
            />
            <div className="text-muted-foreground/80 pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 peer-disabled:opacity-50">
              <ListFilterIcon size={16} aria-hidden="true" />
            </div>
            {Boolean(table.getColumn("title")?.getFilterValue()) && (
              <button
                className="text-muted-foreground/80 hover:text-foreground focus-visible:border-ring focus-visible:ring-ring/50 absolute inset-y-0 end-0 flex h-full w-9 items-center justify-center rounded-e-md transition-[color,box-shadow] outline-none focus:z-10 focus-visible:ring-[3px] disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Clear filter"
                onClick={() => {
                  table.getColumn("title")?.setFilterValue("")
                  if (inputRef.current) {
                    inputRef.current.focus()
                  }
                }}
              >
                <CircleXIcon size={16} aria-hidden="true" />
              </button>
            )}
          </div>
          
          {/* Featured Filter */}
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" className="whitespace-nowrap">
                <FilterIcon className="me-1 opacity-60" size={16} aria-hidden="true" />
                Status
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-48 p-3" align="start">
              <div className="space-y-3">
                <div className="text-muted-foreground text-xs font-medium">Filter by Status</div>
                <div className="space-y-2">
                  {[
                    { label: "All", value: "all" },
                    { label: "Featured", value: true },
                    { label: "Default", value: false },
                  ].map(({ label, value }) => (
                    <div key={String(value)} className="flex items-center gap-2">
                      <Checkbox
                        checked={table.getColumn("featured")?.getFilterValue() === value}
                        onCheckedChange={() =>
                          table.getColumn("featured")?.setFilterValue(
                            table.getColumn("featured")?.getFilterValue() === value ? undefined : value
                          )
                        }
                      />
                      <Label className="text-sm font-normal cursor-pointer">
                        {label}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        </div>

        {/* Delete selected rows (hidden as per your code) */}
        <div className="flex dlt items-center gap-3 hidden">
          {table.getSelectedRowModel().rows.length > 0 && (
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button className="ml-auto" variant="outline">
                  <TrashIcon className="-ms-1 opacity-60" size={16} aria-hidden="true" />
                  Delete
                  <span className="bg-background text-muted-foreground/70 -me-1 inline-flex h-5 max-h-full items-center rounded border px-1 font-[inherit] text-[0.625rem] font-medium">
                    {table.getSelectedRowModel().rows.length}
                  </span>
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <div className="flex flex-col gap-2 max-sm:items-center sm:flex-row sm:gap-4">
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full border" aria-hidden="true">
                    <CircleAlertIcon className="opacity-80" size={16} />
                  </div>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                    <AlertDialogDescription>
                      This action cannot be undone. This will permanently delete{" "}
                      {table.getSelectedRowModel().rows.length} selected{" "}
                      {table.getSelectedRowModel().rows.length === 1 ? "row" : "rows"}.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                </div>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleDeleteRows}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </div>

      {/* Table Container with Horizontal Scroll */}
      <div className="bg-background overflow-hidden rounded-md border">
        <div className="overflow-x-auto">
          <Table className="w-full min-w-[800px] lg:min-w-0">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className="hover:bg-transparent">
                  {headerGroup.headers.map((header) => (
                    <TableHead
                      key={header.id}
                      style={{ width: `${header.getSize()}px` }}
                      className="h-11 whitespace-nowrap"
                    >
                      {header.isPlaceholder ? null : header.column.getCanSort() ? (
                        <div
                          className={cn(
                            "flex h-full cursor-pointer items-center justify-between gap-2 select-none"
                          )}
                          onClick={header.column.getToggleSortingHandler()}
                          onKeyDown={(e) => {
                            if ((e.key === "Enter" || e.key === " ") && header.column.getCanSort()) {
                              e.preventDefault()
                              header.column.getToggleSortingHandler()?.(e)
                            }
                          }}
                          tabIndex={header.column.getCanSort() ? 0 : undefined}
                        >
                          {flexRender(header.column.columnDef.header, header.getContext())}
                          {{
                            asc: <ChevronUpIcon className="shrink-0 opacity-60" size={16} />,
                            desc: <ChevronDownIcon className="shrink-0 opacity-60" size={16} />,
                          }[header.column.getIsSorted() as string] ?? null}
                        </div>
                      ) : (
                        flexRender(header.column.columnDef.header, header.getContext())
                      )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {isLoading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <TableRow key={`skeleton-${i}`}>
                    {columns.map((col, j) => (
                      <TableCell key={j}>
                        <Skeleton className="h-4 w-full" />
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 align-top">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={columns.length} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Pagination - Same as before */}
      <div className="flex items-center justify-between gap-8 flex-wrap">
        <div className="flex items-center gap-3">
          <Label htmlFor={id} className="max-sm:sr-only">Rows per page</Label>
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => table.setPageSize(Number(value))}
          >
            <SelectTrigger id={id} className="w-fit whitespace-nowrap">
              <SelectValue placeholder="Select number of results" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 25, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="text-muted-foreground flex grow justify-end text-sm whitespace-nowrap">
          <p aria-live="polite">
            <span className="text-foreground">
              {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1}-
              {Math.min(
                (table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize,
                table.getRowCount()
              )}
            </span> of <span className="text-foreground">{table.getRowCount()}</span>
          </p>
        </div>

        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <Button size="icon" variant="outline" onClick={() => table.firstPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronFirstIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                <ChevronLeftIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                <ChevronRightIcon size={16} />
              </Button>
            </PaginationItem>
            <PaginationItem>
              <Button size="icon" variant="outline" onClick={() => table.lastPage()} disabled={!table.getCanNextPage()}>
                <ChevronLastIcon size={16} />
              </Button>
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  )
}

// RowActions component remains the same
function RowActions({ row }: { row: Row<Item> }) {
  const router = useRouter();
  const projectTitle = row.original.title;
  const projectSlug = row.original.slug;
  const projectId = row.original.id;
  const [historyOpen, setHistoryOpen] = useState(false);

  const handleEdit = () => {
    router.push(`/dashboard/project/edit/${projectSlug}`);
  };
  const handleView = () => {
    router.push(`/project/${projectSlug}`);
  };

  const handleDeleteItem = async () => {
    
    try {
      const result = await deleteProject(projectId)
      if(result.success){
        toast.success(result.message)
        setHistoryOpen(false)
      } else {
        toast.error(result.message)
      }
    } catch (error: any) {
      toast.error(error.message)
    }
  }

  return (
    <div className="flex justify-end">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button size="icon" variant="ghost" className="shadow-none" aria-label="Row actions">
            <EllipsisIcon size={16} aria-hidden="true" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleView}>View</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem onClick={handleEdit}>Edit</DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuGroup>
            <DropdownMenuItem onSelect={(e) => { e.preventDefault(); setHistoryOpen(true); }}>
              Delete
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={historyOpen} onOpenChange={setHistoryOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Think Again 💭</DialogTitle>
            <DialogDescription>Are you sure you want to delete: {projectTitle}</DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <DialogClose asChild><Button variant="outline">Cancel</Button></DialogClose>
            <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteItem}>
              <TrashIcon className="me-2 opacity-60" size={16} /> Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}