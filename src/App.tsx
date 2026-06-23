import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import { ThemeProvider, Loader } from "@/components";
import router from "@/router";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ThemeProvider storageKey="theme-buscanime">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader />}>
          <NuqsAdapter>
            <RouterProvider router={router} />
          </NuqsAdapter>
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
