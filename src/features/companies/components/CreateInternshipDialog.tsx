import { Plus } from "lucide-react";

import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

import AppButton from "@/components/common/AppButton";

import InternshipForm, {
  type InternshipFormData,
} from "@/features/internships/components/InternshipForm";

import { useCreateInternship } from "@/features/internships/hooks/useCreateInternship";

import { useAuth } from "@/hooks/useAuth";

import type { Company } from "@/types/company";
import { toast } from "sonner";
interface Props {
  company: Company;
}
export default function CreateInternshipDialog({ company }: Props) {
  const { user } = useAuth();

  const createInternship = useCreateInternship();

  const handleSubmit = async (data: InternshipFormData) => {
    await createInternship.mutateAsync({
      ...data,

      ownerId: user?.uid || "",

      companyId: company.id,

      companyName: company.name,
      companyLogo: company.logo,
    });
    toast.success("Internship created successfully");
  };

  return (
    <Dialog>
      <DialogTrigger
        render={
          <AppButton>
            <Plus size={16} />
            Create Internship
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
          loading={createInternship.isPending}
          onSubmit={handleSubmit}
        />
      </DialogContent>
    </Dialog>
  );
}
