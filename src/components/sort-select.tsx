import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

export type SortSelectOption = {
  sortKey: string;
  sortValue: string;
  label: string;
};

type SortObject = {
  sortKey: string;
  sortValue: string;
};

type SortSelectProps = {
  options: SortSelectOption[];
  onChange: (compositeKey: string) => void;
  value: SortObject;
};

const SortSelect = ({ options, onChange, value }: SortSelectProps) => {
  return (
    <Select
      defaultValue={value.sortKey + "_" + value.sortValue}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem
            key={option.sortKey + "_" + option.sortValue}
            value={option.sortKey + "_" + option.sortValue}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export { SortSelect };
