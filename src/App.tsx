import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { Loader } from "@/components/Loader";
import { ThemeProvider } from "@/components/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import router from "@/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      retry: 1,
    },
  },
});

export const App = () => {
  return (
    <ThemeProvider storageKey="theme-buscanime">
      <TooltipProvider>
        <QueryClientProvider client={queryClient}>
          <Suspense fallback={<Loader />}>
            <NuqsAdapter>
              <RouterProvider router={router} />
            </NuqsAdapter>
          </Suspense>
        </QueryClientProvider>
      </TooltipProvider>
    </ThemeProvider>
  );
};

export default App;
