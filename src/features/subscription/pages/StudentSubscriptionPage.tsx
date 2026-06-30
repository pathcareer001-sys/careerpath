import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useUpdateUser } from "@/features/users/hooks/useUpdateUser";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
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
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { Crown, CheckCircle, Sparkles, ArrowUp } from "lucide-react";

const benefits = [
  {
    icon: Crown,
    title: "Kandidat Prioritas",
    description: "Tampil sebagai Kandidat Prioritas dengan badge Premium di profil Anda",
  },
  {
    icon: ArrowUp,
    title: "Urutan teratas dalam daftar pelamar",
    description: "Pelamar Premium muncul pertama di perusahaan Premium",
  },
  {
    icon: Sparkles,
    title: "Prioritas pada fitur Premium di masa mendatang",
    description: "Jadi pengguna awal fitur-fitur eksklusif yang akan datang",
  },
];

export default function StudentSubscriptionPage() {
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
    <PageContainer>
      <PageHeader
        title="Berlangganan"
        description="Tingkatkan visibilitas Anda dengan langganan Premium"
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_380px] animate-fade-in-up">
        <div className="space-y-6">
          <AppCard>
            <h2 className="text-base font-medium text-heading mb-2">Status Langganan</h2>
            <div className="flex items-center gap-3">
              {isPremium ? (
                <>
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Crown size="20" className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-heading">Premium</p>
                      <VerifiedBadge show />
                    </div>
                    <p className="text-xs text-secondary-text mt-0.5">Nikmati semua fitur Premium</p>
                  </div>
                </>
              ) : (
                <>
                  <div className="h-10 w-10 rounded-full bg-section flex items-center justify-center">
                    <Crown size="20" className="text-muted" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-heading">Gratis</p>
                    <p className="text-xs text-secondary-text mt-0.5">Tingkatkan ke Premium untuk manfaat lebih</p>
                  </div>
                </>
              )}
            </div>
          </AppCard>

          <AppCard>
            <h2 className="text-base font-medium text-heading mb-4">Manfaat Premium</h2>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit.title} className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <benefit.icon size="16" className="text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-heading">{benefit.title}</p>
                    <p className="text-xs text-secondary-text mt-0.5">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </AppCard>
        </div>

        <div className="space-y-4">
          <div className="rounded-xl border-2 border-primary/30 bg-gradient-to-br from-primary/[0.03] to-section p-6 shadow-card">
            <div className="flex items-center gap-2 mb-4">
              <Crown size="20" className="text-primary" />
              <h3 className="text-lg font-semibold text-heading">Premium Member</h3>
            </div>

            <div className="mb-5">
              <p className="text-3xl font-bold text-heading">Rp19.000</p>
              <p className="text-sm text-secondary-text">/ bulan</p>
            </div>

            <ul className="space-y-2 mb-6">
              {[
                "Kandidat Prioritas dengan badge Premium",
                "Urutan teratas dalam daftar pelamar",
                "Akses prioritas ke fitur Premium mendatang",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-body">
                  <CheckCircle size="14" className="text-success shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            {isPremium ? (
              <div className="rounded-lg bg-success/10 p-3 text-center">
                <p className="text-sm font-medium text-success">✓ Langganan Premium Aktif</p>
              </div>
            ) : (
              <>
                <AppButton className="w-full h-11 text-sm font-semibold" onClick={() => setDialogOpen(true)}>
                  <Crown size="16" />
                  Berlangganan Sekarang
                </AppButton>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
                      <AppButton variant="outline" disabled={isPaying} onClick={() => setDialogOpen(false)}>
                        Batal
                      </AppButton>
                      <AppButton onClick={handlePay} disabled={isPaying}>
                        {isPaying ? "Memproses..." : "Bayar Sekarang"}
                      </AppButton>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            )}
          </div>

          <p className="text-[11px] text-muted text-center leading-relaxed">
            Pembayaran disimulasikan untuk keperluan demonstrasi.
            <br />
            Tidak ada biaya yang akan dikenakan.
          </p>
        </div>
      </div>
    </PageContainer>
  );
}
