import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "AWS-USAR RAG Assistant | Knowledge Base",
  description: "AI Research & Knowledge Assistant for AWS Cloud Club USAR, powered by Pinecone & Gemini",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} h-full`}>
      <body className="h-full bg-slate-50 text-slate-900 font-sans antialiased overflow-hidden">
        {children}
      </body>
    </html>
  );
}
