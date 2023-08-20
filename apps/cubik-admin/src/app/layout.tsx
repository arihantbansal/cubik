"use client";
import WalletContext from "@/context/walletContext";
import { Provider } from "@/layouts/Provider";
import { Plus_Jakarta_Sans } from "next/font/google";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = new QueryClient();
  return (
    <html lang="en">
      <body className={`${jakarta.className}`}>
        <QueryClientProvider client={queryClient}>
          <WalletContext>
            <Provider>{children}</Provider>
          </WalletContext>
        </QueryClientProvider>
      </body>
    </html>
  );
}
