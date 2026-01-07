import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AppLayout from "./Pages/AppLayout";
import { ThemeProvider } from "./components/them-provider";
import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router-dom";
import Attendance from "./Pages/Attendance";
import Login from "./Pages/Login";

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 1000,
      },
    },
  });
  const router = createBrowserRouter(
    [
      {
        path: "/",
        Component: AppLayout,
        children: [
          // { index: true, Component: ResizableDemo },
          { path: "login", Component: Login },
          { path: "attendance", Component: Attendance },
        ],
      },
    ],
    {
      basename: "/Front-ERP",
    }
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <RouterProvider router={router} />
      </ThemeProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
