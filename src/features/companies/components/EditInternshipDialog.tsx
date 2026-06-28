import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { FirebaseError } from "firebase/app";

import { Pencil } from "lucide-react";

import AppButton from "@/components/common/AppButton";

import InternshipForm, {
  type InternshipFormData,
} from "@/features/internships/components/InternshipForm";

import { useUpdateInternship } from "@/features/internships/hooks/useUpdateInternship";

import type { Internship } from "@/types/internship";
import { toast } from "sonner";

interface Props {
  internship: Internship;
}

export default function EditInternshipDialog({ internship }: Props) {
  const [open, setOpen] = useState(false);
  const updateInternship = useUpdateInternship();

  const handleSubmit = async (data: InternshipFormData) => {
    try {
      await updateInternship.mutateAsync({
        id: internship.id,
        data,
      });
      toast.success("Internship updated successfully");
      setOpen(false);
    } catch (error: unknown) {
      console.error(error);
      const message =
        error instanceof FirebaseError
          ? `[${error.code}] ${error.message}`
          : error instanceof Error
            ? error.message
            : "Unknown error";
      toast.error(message);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger
        render={
          <AppButton>
            <Pencil size={16} />
          </AppButton>
        }
      />
      <DialogContent
        className="
  sm:max-w-4xl
  max-h-[90vh]
  overflow-y-auto
  p-2
  "
      >
        <InternshipForm
          defaultValues={internship}
          loading={updateInternship.isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
