"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

function GoogleAuthCallbackInner() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams?.get("code");

    if (!code) {
      console.error("No authorization code found");
      router.push("/log-in");
      return;
    }

    // Exchange the auth code for an access token
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_GOOGLE_AUTH_URL}?code=${code}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          // Send data back to the popup window
          if (window.opener) {
            window.opener.postMessage(
              { type: "GOOGLE_AUTH_SUCCESS", payload: data },
              window.location.origin
            );
            window.close();
          }
        } else {
          console.error("Google OAuth failed:", data);
          router.push("/log-in");
        }
      })
      .catch((error) => {
        console.error("Error fetching token:", error);
        router.push("/log-in");
      });
  }, [searchParams, router]);

  return <div>Authenticating with Google...</div>;
}

export default function GoogleAuthCallback() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <GoogleAuthCallbackInner />
    </Suspense>
  );
}
