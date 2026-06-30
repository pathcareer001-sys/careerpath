import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

emailjs.init(PUBLIC_KEY);

interface EmailParams {
  to: string;
  name: string;
  subject: string;
  title: string;
  message: string;
}

async function send(params: EmailParams) {
  if (!SERVICE_ID || !TEMPLATE_ID || !PUBLIC_KEY) {
    console.warn("EmailJS not configured. Set VITE_EMAILJS_* vars in .env");
    return;
  }

  try {
    await emailjs.send(SERVICE_ID, TEMPLATE_ID, {
      to_email: params.to,
      to_name: params.name,
      subject: params.subject,
      title: params.title,
      message: params.message,
    });
  } catch (error) {
    console.error("Failed to send email:", error);
  }
}

export const emailService = {
  async sendApplicationConfirmation(to: string, applicantName: string, internshipTitle: string, companyName: string) {
    return send({
      to,
      name: applicantName,
      subject: `Lamaran Diterima - ${internshipTitle} di ${companyName}`,
      title: "Lamaran Diterima",
      message: `Lamaran Anda untuk <strong>${internshipTitle}</strong> di <strong>${companyName}</strong> telah diterima. Anda dapat melacak status lamaran di dashboard CareerPath Anda.`,
    });
  },

  async sendStatusUpdate(to: string, applicantName: string, internshipTitle: string, status: string) {
    const statusLabels: Record<string, string> = {
      reviewed: "Lamaran Ditinjau",
      accepted: "Lamaran Diterima",
      rejected: "Lamaran Ditolak",
      interview: "Undangan Wawancara",
    };

    const statusMessages: Record<string, string> = {
      reviewed: "Lamaran Anda sedang ditinjau oleh perusahaan.",
      accepted: "Selamat! Lamaran Anda telah diterima.",
      rejected: "Maaf, lamaran Anda tidak dipilih untuk diproses lebih lanjut.",
      interview: "Anda telah diundang untuk wawancara. Silakan cek dashboard Anda untuk detailnya.",
    };

    return send({
      to,
      name: applicantName,
      subject: `${statusLabels[status] || "Pembaruan Status"} - ${internshipTitle}`,
      title: statusLabels[status] || "Pembaruan Status",
      message: `Lamaran Anda untuk <strong>${internshipTitle}</strong> telah diperbarui. ${statusMessages[status] || "Status lamaran Anda telah berubah."} Cek dashboard CareerPath Anda untuk detail lebih lanjut.`,
    });
  },

  async sendContactNotification(name: string, email: string, subject: string, message: string) {
    return send({
      to: "pathcareer001@gmail.com",
      name: "CareerPath Admin",
      subject: `Pesan Kontak Baru: ${subject}`,
      title: "Pesan Kontak Baru",
      message: `Anda menerima pesan baru dari ${name} (${email}). Subjek: ${subject} - Pesan: ${message}`,
    });
  },

  async sendVerificationNotification(to: string, companyName: string, verified: boolean) {
    return send({
      to,
      name: companyName,
      subject: `Perusahaan ${verified ? "Terverifikasi" : "Tidak Terverifikasi"} - ${companyName}`,
      title: `Perusahaan ${verified ? "Terverifikasi" : "Tidak Terverifikasi"}`,
      message: `Perusahaan Anda <strong>${companyName}</strong> telah ${verified ? "terverifikasi" : "tidak terverifikasi"} di CareerPath.${verified ? " Profil perusahaan Anda sekarang menampilkan lencana terverifikasi, meningkatkan kepercayaan dengan calon pelamar." : ""}`,
    });
  },
};
