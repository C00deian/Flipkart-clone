"use client";

import { useContext, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/app/context/AuthContext";
import Redirecting from "@/app/components/Redirecting";

export default function AuthSuccess() {
  const router = useRouter();
  const authContext = useContext(AuthContext);
  const isProcessed = useRef(false);

  useEffect(() => {

    if (!authContext) return;

    if (isProcessed.current) return;
    isProcessed.current = true;

    if (authContext.refreshUser) {
      authContext.refreshUser()
        .then(() => {
          router.push('/');
        })
        .catch((err) => {
          console.error("OAuth Refresh Failed", err);
          router.push("/login");
        });
    }
  }, [authContext, router]);

  return <Redirecting />;
}