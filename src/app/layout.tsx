import type { Metadata } from "next";
import "./globals.css";
import { Mulish } from "next/font/google"
import { ToastContainer } from "react-toastify"
import { AppWrapper } from "@/context";

const mulish = Mulish({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Altbucks",
  description: "Get Paid for Simple Tasks Online",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${mulish.className} antialiased`}
      >
        <AppWrapper>
          {children}
          <ToastContainer
            position="top-right"
            autoClose={5000}
            theme="light"
          />
        </AppWrapper>
      </body>
    </html>
  );
}
