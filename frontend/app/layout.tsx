import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ReduxProvider } from "@/lib/redux/ReduxProvider";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "KUET HACKATHON",
  description: "Team Machine Mindset",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
           <Navbar />
           <main>{children}</main>
          </ThemeProvider>
        </ReduxProvider>
        <Toaster />
      </body>
    </html>
  );
}
