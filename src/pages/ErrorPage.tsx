import { Link, useRouteError } from "react-router-dom";

import PageContainer from "@/components/common/PageContainer";
import AppButton from "@/components/common/AppButton";

export default function ErrorPage() {
  const error = useRouteError();

  console.error(error);

  return (
    <PageContainer>
      <div
        className="
        min-h-[70vh]
        flex
        flex-col
        items-center
        justify-center
        text-center
        "
      >
        <h1
          className="
          text-6xl
          font-bold
          text-blue-600
          "
        >
          404
        </h1>

        <h2
          className="
          mt-4
          text-2xl
          font-semibold
          "
        >
          Page Not Found
        </h2>

        <p
          className="
          mt-2
          text-slate-500
          "
        >
          The page you are looking for does not exist.
        </p>

        <Link to="/" className="mt-6">
          <AppButton>Back to Home</AppButton>
        </Link>
      </div>
    </PageContainer>
  );
}
