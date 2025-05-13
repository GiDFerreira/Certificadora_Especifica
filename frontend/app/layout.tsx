import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SerenaMente",
  description: "Seu app de bem estar",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="pt-br">
      <body>
        {children}
      </body>
    </html>
  );
}
