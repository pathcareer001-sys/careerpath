import { Helmet } from "react-helmet-async";

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://mycareerpath.site";
const SITE_NAME = "CareerPath";
const DEFAULT_DESCRIPTION =
  "CareerPath menghubungkan mahasiswa dengan peluang magang terbaik. Temukan magang, jelajahi perusahaan, baca ulasan, dan mulai karir Anda.";
const DEFAULT_KEYWORDS =
  "magang, karir, mahasiswa, lowongan magang, internship Indonesia, careerpath, cari magang";

export default function SEO({
  title,
  description = DEFAULT_DESCRIPTION,
  keywords = DEFAULT_KEYWORDS,
  ogImage = `${BASE_URL}/logo.png`,
  ogUrl,
  ogType = "website",
  twitterCard = "summary_large_image",
  noIndex = false,
}: SEOProps) {
  const pageTitle = title
    ? `${title} | ${SITE_NAME}`
    : `${SITE_NAME} - Temukan Magang Impianmu`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      <meta property="og:title" content={pageTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={ogUrl || BASE_URL} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content={SITE_NAME} />

      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={pageTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {noIndex && <meta name="robots" content="noindex,nofollow" />}
      <link rel="canonical" href={ogUrl || BASE_URL} />
    </Helmet>
  );
}
