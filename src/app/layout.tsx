import "~/styles/globals.css";

import { Inter } from "next/font/google";
import { TRPCReactProvider } from "~/trpc/react";
import { Sidebar } from "./_components/Sidebar";
import { useSearchParams } from "next/navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata = {
  title: "Tree Tracker",
  description: "International Sustainable Forest Management Inc. Tree Tracker",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en h-full bg-white">
      <body className={`h-full font-sans ${inter.variable}`}>
        <TRPCReactProvider>
          <Sidebar>
            <div className="lg:ml-72">{children}</div>
          </Sidebar>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
