import { getUserSession } from "@/app/helpers/getUserSession";
import { AppSidebar } from "@/components/shared/Sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

   const session = await getUserSession()
      if (!session) {
      redirect("/login");
    }

  return (
    <SidebarProvider>
      <main className="min-h-dvh flex gap-4">
        <AppSidebar />
        {children}
      </main>
    </SidebarProvider>
  );
}
