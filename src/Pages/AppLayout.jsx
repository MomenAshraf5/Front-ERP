import { Outlet } from "react-router";
import { AppSidebar } from "../components/app-sidebar";
import {
  SidebarInset,
  SidebarTrigger,
  SidebarProvider,
} from "../components/ui/sidebar";
import { ModeToggle } from "../components/mode-toggle";
import { GridPattern } from "../components/ui/grid-pattern";
import { cn } from "../lib/utils";
import { CardHeader } from "../components/ui/card";

import { Toaster } from "sonner";

function AppLayout() {
  return (
    <SidebarProvider>
      <div className="grid grid-cols-[auto_1fr] h-dvh grid-rows-[auto_1fr]">
        <GridPattern
          strokeDasharray={"4 4"}
          className={cn(
            "mask-[radial-gradient(400px_circle_at_center,white,transparent)]",
            "inset-x-0 inset-y-[-30%] h-[150%] skew-y-12"
          )}
        />
        <AppSidebar />
        <SidebarInset>
          <CardHeader>
            <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 justify-between">
              <SidebarTrigger className="size-9" />
              <ModeToggle className="" />
            </header>
          </CardHeader>
        </SidebarInset>

        <main className="pb-2 px-2 col-start-2 row-start-2">
          <Outlet />
        </main>
      </div>
      <Toaster richColors closeButton position="top-center" />
    </SidebarProvider>
  );
}

export default AppLayout;
