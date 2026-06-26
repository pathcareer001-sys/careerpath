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
      subject: `Application Received - ${internshipTitle} at ${companyName}`,
      title: "Application Received",
      message: `Your application for <strong>${internshipTitle}</strong> at <strong>${companyName}</strong> has been received. You can track your application status in your CareerPath dashboard.`,
    });
  },

  async sendStatusUpdate(to: string, applicantName: string, internshipTitle: string, status: string) {
    const statusLabels: Record<string, string> = {
      reviewed: "Application Reviewed",
      accepted: "Application Accepted",
      rejected: "Application Rejected",
      interview: "Interview Invitation",
    };

    const statusMessages: Record<string, string> = {
      reviewed: "Your application is now being reviewed by the company.",
      accepted: "Congratulations! Your application has been accepted.",
      rejected: "Unfortunately, your application was not selected for further processing.",
      interview: "You have been invited for an interview. Please check your dashboard for details.",
    };

    return send({
      to,
      name: applicantName,
      subject: `${statusLabels[status] || "Status Update"} - ${internshipTitle}`,
      title: statusLabels[status] || "Status Update",
      message: `Your application for <strong>${internshipTitle}</strong> has been updated. ${statusMessages[status] || "Your application status has changed."} Check your CareerPath dashboard for more details.`,
    });
  },

  async sendContactNotification(name: string, email: string, subject: string, message: string) {
    return send({
      to: "pathcareer001@gmail.com",
      name: "CareerPath Admin",
      subject: `New Contact Message: ${subject}`,
      title: "New Contact Message",
      message: `You received a new message from ${name} (${email}). Subject: ${subject} - Message: ${message}`,
    });
  },

  async sendVerificationNotification(to: string, companyName: string, verified: boolean) {
    return send({
      to,
      name: companyName,
      subject: `Company ${verified ? "Verified" : "Unverified"} - ${companyName}`,
      title: `Company ${verified ? "Verified" : "Unverified"}`,
      message: `Your company <strong>${companyName}</strong> has been ${verified ? "verified" : "unverified"} on CareerPath.${verified ? " Your company profile now shows the verified badge, increasing trust with potential applicants." : ""}`,
    });
  },
};
