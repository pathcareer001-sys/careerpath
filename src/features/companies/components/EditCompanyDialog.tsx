import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AppButton from "@/components/common/AppButton";
import AppInput from "@/components/common/AppInput";
import AppTextarea from "@/components/common/AppTextarea";
import { useUpdateCompany } from "@/features/companies/hooks/useUpdateCompany";
import type { Company } from "@/types/company";
import { toast } from "sonner";

interface Props {
  company: Company | null;
  open: boolean;
  onClose: () => void;
}

export default function EditCompanyDialog({ company, open, onClose }: Props) {
  const updateCompany = useUpdateCompany();
  const [name, setName] = useState(company?.name || "");
  const [industry, setIndustry] = useState(company?.industry || "");
  const [location, setLocation] = useState(company?.location || "");
  const [website, setWebsite] = useState(company?.website || "");
  const [description, setDescription] = useState(company?.description || "");

  const handleSave = async () => {
    if (!company?.id) {
      toast.error("Data perusahaan tidak valid");
      return;
    }
    try {
      await updateCompany.mutateAsync({
        id: company.id,
        data: { name, industry, location, website, description },
      });
      toast.success("Perusahaan diperbarui");
      onClose();
    } catch {
      toast.error("Gagal memperbarui perusahaan");
    }
  };

  return (
    <Dialog open={open} onOpenChange={(o) => { if (!o) onClose(); }}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto p-6">
        <h2 className="text-xl font-medium mb-6">Edit Perusahaan</h2>
        <div className="space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium">Nama</label>
            <AppInput value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Industri</label>
            <AppInput value={industry} onChange={(e) => setIndustry(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Lokasi</label>
            <AppInput value={location} onChange={(e) => setLocation(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Website</label>
            <AppInput value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium">Deskripsi</label>
            <AppTextarea value={description} onChange={(e) => setDescription(e.target.value)} className="min-h-[100px]" />
          </div>
          <div className="flex justify-end gap-2 pt-4 border-t">
            <AppButton variant="secondary" onClick={onClose}>Batal</AppButton>
            <AppButton onClick={handleSave} disabled={updateCompany.isPending}>
              {updateCompany.isPending ? "Menyimpan..." : "Simpan"}
            </AppButton>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
