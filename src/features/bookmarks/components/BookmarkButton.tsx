import { Bookmark } from "lucide-react";

import AppButton from "@/components/common/AppButton";

import { useCreateBookmark } from "../hooks/useCreateBookmark";
import { useAuth } from "@/features/auth/hooks/useAuth";
import { toast } from "sonner";

interface Props {
  companyId: string;
}

export default function BookmarkButton({ companyId }: Props) {
  const createBookmark = useCreateBookmark();
  const { user } = useAuth();

  const handleBookmark = async () => {
    if (!user) return;

    try {
      await createBookmark.mutateAsync({
        userId: user.uid,
        companyId,
      });

      toast.success("Company bookmarked");
    } catch {
      toast.error("Already bookmarked");
    }
  };

  return (
    <AppButton variant="secondary" onClick={handleBookmark}>
      <Bookmark size={16} />
      Save Company
    </AppButton>
  );
}
