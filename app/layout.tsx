import type { Metadata } from "next";
import "@/template/styles/globals.scss";

export const metadata: Metadata = {
  title: "Cognito",
  description: "Modern AI-powered e-commerce platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
