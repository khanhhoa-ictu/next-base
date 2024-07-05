'use client'
import { Dropdown, Menu } from "antd";
import React from "react";
import Link from "next/link";
import styles from "./styles.module.scss";
import Image from "next/image";
import useProfile from "@/hook/useProfile";
import ListMenu from "@/components/list-menu";
import logo from '@/assets/logo/logo.png';
import noAvatar from "@/assets/images/no-avatar.png";
import { useRouter } from "next/navigation";

function HeaderDeskTop() {
  const router = useRouter();

  const logout = () => {
    // Cookies.remove("token");
    // Cookies.remove("refreshToken");

    if (typeof window !== "undefined") {
      window.location.reload();
    }
  };
  const { profile } = useProfile();
  const menu = (
    <Menu style={{ minWidth: 220 }}>
      <Menu.Item key="1" onClick={() => router.push(`/profile/${profile.id}`)}>
        profile
      </Menu.Item>
      <Menu.Item key="2" onClick={logout}>
        logout
      </Menu.Item>
      {profile?.role === "admin" && (
        <Menu.Item key="3" onClick={() => router.push("/manager")}>
          manager
        </Menu.Item>
      )}
    </Menu>
  );

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">
          <Image src={logo} alt="logo" width={600} height={480} />
        </Link>
      </div>
      <ListMenu />
      {profile ? (
        <div className={styles.headerControl}>
          <div className={styles.menuWrapperControl}>
            <div className={styles.menuControlItem}>
              <Dropdown overlay={menu} trigger={["click"]}>
                <div className={styles.avatar}>
                  <Image
                    src={profile?.avatar || noAvatar}
                    alt=""
                    height={30}
                    width={30}
                  />
                </div>
              </Dropdown>
            </div>
          </div>
        </div>
      ) : (
        <Link href="/login">Login</Link>
      )}
    </div>
  );
}

export default HeaderDeskTop;