import PageContainer from "@/components/common/PageContainer";

export default function ContactPage() {
  return (
    <PageContainer>
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold">Contact Us</h1>

        <p className="mt-4 text-slate-600">
          Have questions? We'd love to hear from you.
        </p>
      </section>

      <div className="mx-auto max-w-3xl rounded-3xl border p-8">
        <div className="grid gap-4">
          <input placeholder="Name" className="rounded-xl border p-3" />

          <input placeholder="Email" className="rounded-xl border p-3" />

          <textarea
            rows={5}
            placeholder="Message"
            className="rounded-xl border p-3"
          />

          <button className="rounded-xl bg-blue-600 py-3 text-white">
            Send Message
          </button>
        </div>
      </div>
    </PageContainer>
  );
}
