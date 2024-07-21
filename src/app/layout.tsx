import AppProvider from "@/AppProvider";
import Header from "@/components/header";
import NavbarManager from "@/components/navbar-manager/NavbarManager";
import RefreshToken from "@/components/RefreshToken";
import { configStyleComponent } from "@/lib/constants";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ConfigProvider from "antd/es/config-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import styles from "./styles.module.scss";
import { Suspense } from "react";
import Loading from "@/components/loading";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html suppressHydrationWarning={true} lang="en">
      <body className="min-h-screen">
        <ConfigProvider theme={{ components: configStyleComponent }}>
          <AntdRegistry>
          <AppProvider>
            
            <div className={styles.pageWrapper}>
              <NavbarManager />
              <div className={styles.mainWrapper}>
                <Header />
                <div className={styles.pageContent}>
                  <RefreshToken />
                  {children}
                </div>
              </div>
            </div>
            </AppProvider>
          </AntdRegistry>
        </ConfigProvider>
      </body>
    </html>
  );
}
