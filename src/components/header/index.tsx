'use client'
import React from "react";
import styles from "./styles.module.scss";
import useMobile from "@/hook/useMobile";
import HeaderMobile from "./components/HeaderMobile/HeaderMobile";
import HeaderDeskTop from "./components/HeaderDeskTop/HeaderDeskTop";

export default function Header() {
  const { isMobile } = useMobile();
  return (
    <div className={styles.headerWrapper}>
      {isMobile ? <HeaderMobile /> : <HeaderDeskTop />}
    </div>
  );
}