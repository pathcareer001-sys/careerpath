import { Search } from "lucide-react";
import AppInput from "./AppInput";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

export default function SearchBar({
  value,
  onChange,
  placeholder,
  className,
}: SearchBarProps) {
  return (
    <div className="relative">
      <Search
        size={18}
        className="
        absolute
        left-3
        top-1/2
        -translate-y-1/2
        text-slate-400
        "
      />

      <AppInput
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder ?? "Search..."}
        className={`
          pl-10
          ${className ?? ""}
        `}
      />
    </div>
  );
}
