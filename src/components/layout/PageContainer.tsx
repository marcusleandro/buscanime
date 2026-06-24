import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Header, Footer } from "@/components";

interface PageContainerProps {
  children: ReactNode;
  className?: string;
}

export const PageContainer = ({ children, className }: PageContainerProps) => {
  return (
    <>
      <Header />
      <div
        className={cn(
          "mx-auto w-full max-w-7xl px-4 py-8 sm:px-6 lg:px-8",
          className
        )}
      >
        {children}
      </div>
      <Footer />
    </>
  );
};

export default PageContainer;
