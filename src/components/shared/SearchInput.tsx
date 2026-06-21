import { Search } from "lucide-react";

import AppInput from "@/components/common/AppInput";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

export default function SearchInput({ value, onChange }: Props) {
  return (
    <div className="relative">
      <Search
        size={16}
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
        placeholder="Search..."
        className="pl-10"
      />
    </div>
  );
}
