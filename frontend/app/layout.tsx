import type { Metadata } from "next";
import "./globals.css";
import { AuthContextProvider } from "@/context/AuthProvider";

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
        <AuthContextProvider>
          {children}
        </AuthContextProvider>
      </body>
    </html>
  );
}
