'use client'
import React, { useEffect, useRef, useState } from "react";
// import { NavLink, useHistory } from 'react-router-dom';
import Link from "next/link";
import { CATEGORY } from "@/lib/constants";
import styles from './styles.module.scss';
import { isClient } from "@/lib/http";
import { CloseOutlined, MenuOutlined } from '@ant-design/icons';
import { useAppContext } from "@/AppProvider";

function HeaderMobile() {
  const [showNav, setShowNav] = useState(false);
  // const { setCategory } = useCategory();
  const toggleContainer = useRef<any>();
  const {profile} = useAppContext()
  useEffect(() => {
    if(!isClient) return;
    window.addEventListener("click", onClickOutsideHandler);
    return () => window.removeEventListener("click", onClickOutsideHandler);
  }, []);
  
  const handleClick = (value?: number) => {
    if (!value) {
      setShowNav(false);
      return;
    }

    const newCategory = {
      category: value,
      page: 1,
    };
    setShowNav(false);
    // setCategory([]);
  };

  const onClickOutsideHandler = (event: any) => {
    if (!toggleContainer.current.contains(event.target)) {
      setShowNav(false);
    }
  };

  const handleLogout = () => {
    // window.location.reload();
  };

  return (
    <div ref={toggleContainer}>
      <div
        className={`${styles.mobiNavigation} ${showNav && styles.showNav }`}
      >
        <div className={styles.mobiMainNav}>
          <ul>
            <li>
              <Link href="/" onClick={() => handleClick()}>
                Home
              </Link>
            </li>
            <li>
              <Link
                href="/article"
                onClick={() => handleClick(CATEGORY.HTML_CSS)}
              >
                HTML-CSS
              </Link>
            </li>
            <li>
              <Link
                href="/article"
                onClick={() => handleClick(CATEGORY.JAVASCRIPT)}
              >
                JavaScript
              </Link>
            </li>
            <li>
              <Link
                href="/article"
                onClick={() => handleClick(CATEGORY.REACTJS)}
              >
                ReactJs
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={() => handleClick()}>
                About
              </Link>
            </li>
            <li>
              {profile && <Link href={`/profile/${profile.id}`}>profile</Link>}
            </li>
            <li>
              {profile ? (
                <Link href="/" onClick={() => handleLogout()}>
                  Logout
                </Link>
              ) : (
                <Link href="/login" onClick={() => handleClick()}>
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
        <div className={styles.circleContainer}>
          <div className={styles.circle}>
            <button
              className={`${styles.close} ${styles.btn}`}
              onClick={() => setShowNav(!showNav)}
            >
              <CloseOutlined />
            </button>
            <button
              className={`${styles.open} ${styles.btn}`}
              onClick={() => setShowNav(!showNav)}
            >
              <MenuOutlined />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HeaderMobile;