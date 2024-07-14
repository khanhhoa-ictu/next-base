"use client";
import useToggleSideNav from "@/hook/useToggleSideNav";
import {
    HomeOutlined,
    ReadOutlined,
    SettingOutlined,
    TableOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";

export default function SideNav() {
  const { collapsed } = useToggleSideNav();
  const [selectedKey, setSelectedKey] = useState("1");
  const pathname = usePathname();

  const routes = [
    {
      key: "1",
      text: "Manager",
      url: "/manager",
      icon: <HomeOutlined />,
    },
    {
      key: "2",
      text: "Post",
      url: "/manager/post",
      icon: <TableOutlined />,
    },
    {
      key: "3",
      text: "Users",
      url: "/manager/users",
      icon: <UserOutlined />,
    },
    {
      key: "4",
      text: "About",
      url: "/manager/about-setting",
      icon: <SettingOutlined />,
    },
    {
      key: "5",
      text: "Category",
      url: "/manager/category",
      icon: <ReadOutlined />,
    },
  ];

  useEffect(() => {
    routes.forEach((route) => {
      if (pathname.startsWith(route.url || "###")) {
        setSelectedKey(route.key);
      }
    });
  }, [pathname]);

  return (
    <div
      className={`${styles.sideNav} ${collapsed && styles.sideNavCollapsed}`}
      style={{ width: collapsed ? 80 : 250, transition: "width 0.3s" }}
    >
      <Link className={styles.logo} href="/">
        HOME
      </Link>
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[]}
        mode="inline"
        inlineCollapsed={collapsed}
      >
        {routes.map((route) => {
          return (
            <Menu.Item key={route.key} icon={route.icon}>
              <Link href={route.url}>{route.text}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}
