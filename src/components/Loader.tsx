import { Spinner } from "@/components/ui";

export const Loader = () => {
  return (
    <div className="flex justify-center items-center w-full min-h-screen bg-background text-foreground">
      <Spinner className="size-16" />
    </div>
  );
};

export default Loader;
