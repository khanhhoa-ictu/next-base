'use client'
import { useCallback, useState } from "react";

export default function useToggleSideNav() {
  const [collapsed, setCollapsed] = useState(false)
  const toggleSideNav = useCallback(() => {
    setCollapsed(!collapsed)
  }, []);
  return { collapsed: Boolean(collapsed), toggleSideNav };
}