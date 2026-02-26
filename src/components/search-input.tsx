import { Input } from "./ui/input";

type SearchInputProps = {
  placeholder: string;
  onChange: (value: string) => void;
  value: string;
};

const SearchInput = ({ placeholder, onChange, value }: SearchInputProps) => {
  return (
    <Input
      placeholder={placeholder}
      onChange={(e) => onChange(e.target.value)}
      defaultValue={value}
    />
  );
};

export { SearchInput };
