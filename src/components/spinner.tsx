import { LucideLoader2 } from "lucide-react";

const Spinner = () => {
  return (
    <div className="flex-1 flex justify-center items-center self-center">
      <LucideLoader2 className="animate-spin w-12 h-12" />
    </div>
  );
};

export { Spinner };
