import "../globals.css";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import Sidebar from "@/components/Sidebar/Sidebar";

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <SidebarProvider>
      <Sidebar />
        <SidebarTrigger/>
        <main className={"min-h-screen w-full "}>
          {children}
        </main>
    </SidebarProvider>
  );
}
