import type { Metadata } from "next";
import { Inter, Manrope, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ThemeProvider from "../components/providers/ThemeProvider";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "cyrillic"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Геркулес — DevSecOps-платформа | Безопасность кода на автопилоте",
  description:
    "Автоматически находим уязвимости в коде, зависимостях и API. SAST, DAST, SCA, фаззинг. Бесплатная Community-версия навсегда. Соответствие 152-ФЗ и ГОСТ.",
  openGraph: {
    title: "Геркулес — DevSecOps-платформа",
    description:
      "Безопасность вашего кода — на автопилоте. Бесплатная версия навсегда.",
    type: "website",
    locale: "ru_RU",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ru"
      className={`${inter.variable} ${manrope.variable} ${jetbrainsMono.variable} antialiased`}
    >
      <body className="bg-bg-primary text-text-primary min-h-screen transition-colors duration-300">
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
