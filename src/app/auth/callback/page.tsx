"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";

// Component that uses useSearchParams
function AuthCallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const code = searchParams.get("code");
    console.log("OAuth Code:", code);

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

  return <div>Processing authentication...</div>;
}

// Main component with Suspense boundary
export default function GoogleAuthCallback() {
  return (
      <Suspense fallback={<div>Authenticating with Google...</div>}>
        <AuthCallbackContent />
      </Suspense>
  );
}