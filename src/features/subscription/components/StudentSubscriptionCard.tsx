import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import AppCard from "@/components/common/AppCard";
import AppButton from "@/components/common/AppButton";
import VerifiedBadge from "@/components/company/VerifiedBadge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Crown } from "lucide-react";

export default function StudentSubscriptionCard() {
  const { user, refreshUser } = useAuth();
  const updateUser = useUpdateUser();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isPaying, setIsPaying] = useState(false);

  const isPremium = user?.subscription === "premium";

  const handlePay = async () => {
    if (!user) return;
    setIsPaying(true);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    await updateUser.mutateAsync({
      uid: user.uid,
      data: { subscription: "premium" },
    });

    await refreshUser();

    setIsPaying(false);
    setDialogOpen(false);
    toast.success("Pembayaran berhasil! Selamat datang di Member Premium.");
  };

  return (
    <AppCard>
      <div className="flex items-start justify-between gap-4">
        <div className="space-y-2">
          <h2 className="text-base font-medium text-heading">Status Langganan</h2>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-sm font-semibold text-heading">
              {isPremium ? "Premium" : "Free"}
            </span>
            {isPremium && <VerifiedBadge show size={14} />}
          </div>
          {isPremium && (
            <p className="text-xs text-secondary-text">Nikmati semua fitur Premium.</p>
          )}
        </div>
        {!isPremium && (
          <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
            <DialogTrigger asChild>
              <AppButton size="sm">
                <Crown size="14" />
                Berlangganan Sekarang
              </AppButton>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Premium Member</DialogTitle>
                <DialogDescription>
                  <div className="flex items-center gap-3 mt-2 p-3 rounded-lg bg-primary/[0.03] border border-border">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <Crown size="18" className="text-primary" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-heading">Paket Premium</p>
                      <p className="text-xl font-bold text-heading mt-1">
                        Rp19.000{" "}
                        <span className="text-xs font-normal text-secondary-text">/ bulan</span>
                      </p>
                    </div>
                  </div>
                </DialogDescription>
              </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <AppButton variant="outline" disabled={isPaying}>
                    Batal
                  </AppButton>
                </DialogClose>
                <AppButton onClick={handlePay} disabled={isPaying}>
                  {isPaying ? "Memproses..." : "Bayar Sekarang"}
                </AppButton>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        )}
      </div>
    </AppCard>
  );
}
