"use client";

import Cookies from "js-cookie";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPageWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = Cookies.get("isLoggedIn") === "true";

    if (!isLoggedIn) {
      router.replace("/");
    }
  }, [router]);

  return <>{children}</>;
}
