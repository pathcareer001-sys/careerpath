import { Search } from "lucide-react";
import AppInput from "@/components/common/AppInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchInput({ value, onChange, placeholder = "Cari..." }: Props) {
  return (
    <div className="relative">
      <Search size="15" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
      <AppInput value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className="pl-9" />
    </div>
  );
}
