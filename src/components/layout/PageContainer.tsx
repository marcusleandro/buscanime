import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

/** Page shell with header, centered main content, and footer. */
export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main
        className={cn(
          "mx-auto flex w-full max-w-7xl flex-1 flex-col px-4 py-8 sm:px-6 lg:px-8",
          className
        )}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default PageContainer;
