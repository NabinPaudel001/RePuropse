import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Providers from "./providers";
import { AuthProvider } from '../contexts/AuthContext';
import { SocketProvider } from '../contexts/SocketContext' // Import the SocketProvider
import { NotificationProvider } from "@/contexts/NotificationContext";
import { UserProvider } from '../contexts/UserContext';
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RePurpose",
  description: "Turning Preloved items into reward points for better future",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <Providers>
            <SocketProvider>
              <UserProvider>
                <NotificationProvider>
                  {children} {/* Now all components have Redux access */}
                </NotificationProvider>
              </UserProvider>
            </SocketProvider>
          </Providers>
        </AuthProvider>
      </body>
    </html>
  );
}
