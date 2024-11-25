"use client";
import "react-toastify/dist/ReactToastify.css";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import "./globals.css";
import { Sidebar } from "@/components/layout/sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@mui/material";
import { theme } from "@/utils/mui/theme";
const queryClient = new QueryClient();
export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ThemeProvider theme={theme}>
      <html lang="ko" className="bg-gray-100">
        <QueryClientProvider client={queryClient}>
          <body className={`flex h-full`}>
            <Sidebar />
            <div className="flex-1 p-8">{children}</div>
            <ToastContainer position="bottom-right" limit={1} />
          </body>
        </QueryClientProvider>
      </html>
    </ThemeProvider>
  );
}
