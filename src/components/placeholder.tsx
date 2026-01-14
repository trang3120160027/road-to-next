import { LucideMessageCircleWarning } from "lucide-react";
import { cloneElement } from "react";

type PlaceholderProps = {
  label: string;
  icon?: React.ReactElement<React.SVGProps<SVGSVGElement>>;
  button?: React.ReactNode;
};

const Placeholder = ({
  label,
  icon = <LucideMessageCircleWarning />,
  button = null,
}: PlaceholderProps) => {
  return (
    <h2 className="text-lg font-semibold flex-1 flex flex-col justify-center items-center">
      {cloneElement(icon, {
        className: "w-16 h-16",
      })}
      {label}
      {button}
    </h2>
  );
};

export { Placeholder };
