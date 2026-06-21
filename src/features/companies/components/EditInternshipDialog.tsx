import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Pencil } from "lucide-react";

import AppButton from "@/components/common/AppButton";

import InternshipForm, {
  type InternshipFormData,
} from "@/features/internships/components/InternshipForm";

import { useUpdateInternship } from "@/features/internships/hooks/useUpdateInternship";

import type { Internship } from "@/types/internship";

interface Props {
  internship: Internship;
}

export default function EditInternshipDialog({ internship }: Props) {
  const updateInternship = useUpdateInternship();

  const handleSubmit = async (data: InternshipFormData) => {
    await updateInternship.mutateAsync({
      id: internship.id,
      data,
    });
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <AppButton>
            <Pencil size={16} />
          </AppButton>
        }
      />
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Edit Internship</DialogTitle>
        </DialogHeader>

        <InternshipForm
          defaultValues={internship}
          loading={updateInternship.isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
