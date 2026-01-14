import { Separator } from "./ui/separator";

type HeadingProps = {
  title: string;
  description?: string;
};

const Heading = ({ title, description }: HeadingProps) => {
  return (
    <>
      <div>
        <h2 className="text-3xl font-bold">{title}</h2>
        {description && <p>{description}</p>}
      </div>

      <Separator />
    </>
  );
};

export { Heading };
