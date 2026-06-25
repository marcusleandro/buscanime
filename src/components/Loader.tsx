import { Spinner } from "@/components/ui/spinner";

export const Loader = () => {
  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-background text-foreground">
      <Spinner className="size-16" />
    </div>
  );
};

export default Loader;
