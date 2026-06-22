import { RouterProvider } from "react-router-dom";
import { Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider, Loader } from "@/components";
import router from "@/router";

const queryClient = new QueryClient();

export const App = () => {
  return (
    <ThemeProvider storageKey="theme-buscanime">
      <QueryClientProvider client={queryClient}>
        <Suspense fallback={<Loader />}>
          <RouterProvider router={router} />
        </Suspense>
      </QueryClientProvider>
    </ThemeProvider>
  );
};

export default App;
