import AppProvider from "@/AppProvider";
import Navbar from "@/components/Navbar";
import RefreshToken from "@/components/RefreshToken";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import styles from "./styles.module.scss";
import Header from "@/components/header";
import ConfigProvider from "antd/es/config-provider";
import { configStyleComponent } from "@/lib/constants";

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
        <ConfigProvider theme={{ components:  configStyleComponent}}>
          <div className={styles.pageWrapper}>
            <div className={styles.mainWrapper}>
              <Header />
              <div className={styles.pageContent}>
                <AntdRegistry>
                  {/* <Navbar/> */}
                  <RefreshToken />
                  <AppProvider>{children}</AppProvider>
                </AntdRegistry>
              </div>
            </div>
          </div>
        </ConfigProvider>
      </body>
    </html>
  );
}
