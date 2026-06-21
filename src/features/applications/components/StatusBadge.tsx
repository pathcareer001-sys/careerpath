import { Badge } from "@/components/ui/badge";

interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const variants = {
    pending: "bg-yellow-100 text-yellow-700",

    reviewed: "bg-blue-100 text-blue-700",

    accepted: "bg-green-100 text-green-700",

    rejected: "bg-red-100 text-red-700",
  };

  return (
    <Badge className={variants[status as keyof typeof variants]}>
      {status}
    </Badge>
  );
}
