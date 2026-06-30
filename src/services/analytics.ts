declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
    dataLayer: unknown[];
  }
}

const GA_ID = import.meta.env.VITE_GA_MEASUREMENT_ID as string | undefined;
const IS_PROD = import.meta.env.PROD;

function isReady() {
  return GA_ID && IS_PROD && typeof window.gtag === "function";
}

export const analytics = {
  init() {
    if (!GA_ID || !IS_PROD) return;

    const existing = document.querySelector(
      `script[src="https://www.googletagmanager.com/gtag/js?id=${GA_ID}"]`,
    );
    if (existing) return;

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer.push(args);
    };
    window.gtag("js", new Date());

    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}`;
    document.head.appendChild(script);
  },

  pageView(path: string, title?: string) {
    if (!isReady()) return;
    window.gtag("config", GA_ID, {
      page_path: path,
      page_title: title,
    });
  },

  event(action: string, params?: Record<string, unknown>) {
    if (!isReady()) return;
    window.gtag("event", action, params);
  },
};
