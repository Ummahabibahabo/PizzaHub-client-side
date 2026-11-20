import DashboardSidebarPage from "@/component/dashboard/DashboardSidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";

const LayoutDashboardPage = async ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const user = session?.user;
  console.log("DashboardLayout", user);
  return (
    <SidebarProvider>
      <DashboardSidebarPage user={user}></DashboardSidebarPage>
      <main>
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  );
};

export default LayoutDashboardPage;
