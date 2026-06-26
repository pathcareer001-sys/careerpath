import PageContainer from "@/components/common/PageContainer";

export default function AboutPage() {
  return (
    <PageContainer>
      <section className="py-16 text-center">
        <h1 className="text-5xl font-bold">About CareerPath</h1>

        <p className="mx-auto mt-6 max-w-3xl text-lg text-slate-600">
          CareerPath helps students discover internship opportunities, read
          company reviews, and track applications in one platform.
        </p>
      </section>

      <section className="grid gap-6 md:grid-cols-3">
        <div className="rounded-3xl border p-6">
          <h3 className="font-semibold">Internship Discovery</h3>
          <p className="mt-2 text-slate-500">
            Find opportunities that match your interests.
          </p>
        </div>

        <div className="rounded-3xl border p-6">
          <h3 className="font-semibold">Company Reviews</h3>
          <p className="mt-2 text-slate-500">
            Learn from real student experiences.
          </p>
        </div>

        <div className="rounded-3xl border p-6">
          <h3 className="font-semibold">Application Tracking</h3>
          <p className="mt-2 text-slate-500">
            Monitor every stage of your application.
          </p>
        </div>
      </section>
    </PageContainer>
  );
}
