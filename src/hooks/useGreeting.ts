import { useMemo, useState, useEffect } from "react";

export interface Greeting {
  text: string;
  subtitle: string;
}

function detectTimezone(): string {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "Asia/Jakarta";
  } catch {
    return "Asia/Jakarta";
  }
}

function getHourInTimezone(tz: string): number {
  try {
    return parseInt(
      new Date().toLocaleTimeString("en-US", { hour12: false, timeZone: tz }),
      10,
    );
  } catch {
    return new Date().getHours();
  }
}

export function getGreeting(hour: number): Greeting {
  if (hour >= 5 && hour < 12) {
    return {
      text: "Selamat Pagi",
      subtitle: "Mari mulai perjalanan kariermu hari ini.",
    };
  }
  if (hour >= 12 && hour < 15) {
    return {
      text: "Selamat Siang",
      subtitle: "Terus jelajahi peluang baru.",
    };
  }
  if (hour >= 15 && hour < 18) {
    return {
      text: "Selamat Sore",
      subtitle: "Kamu membuat kemajuan besar hari ini.",
    };
  }
  return {
    text: "Selamat Malam",
    subtitle: "Istirahatlah. Peluang baru menanti besok.",
  };
}

export function useGreeting(): { greeting: Greeting; timezone: string } {
  const timezone = useMemo(detectTimezone, []);
  const [hour, setHour] = useState(() => getHourInTimezone(timezone));

  useEffect(() => {
    const timer = setInterval(() => {
      setHour(getHourInTimezone(timezone));
    }, 60_000);
    return () => clearInterval(timer);
  }, [timezone]);

  return { greeting: getGreeting(hour), timezone };
}
