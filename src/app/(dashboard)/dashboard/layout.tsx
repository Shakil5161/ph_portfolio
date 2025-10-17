import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider>
      <main className="min-h-dvh flex gap-4">
        <AppSidebar />
        {children}
      </main>
    </SidebarProvider>
  );
}
