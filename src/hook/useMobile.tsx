import { isClient } from "@/lib/http";
import { useEffect, useState } from "react";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
 

  const listenerScreen = () => {
    let isMobiles = true;
    if (isClient) {
      isMobiles = window.innerWidth <= 600;
    }
    setIsMobile(isMobiles)
  };

  useEffect(() => {
    if (isClient) {
      window.addEventListener("resize", listenerScreen);
      setIsMobile(window.innerWidth <= 600)
    }
    return () => {
      if (isClient) {
        window.removeEventListener("resize", listenerScreen);
      }
    };
  }, []);

  return { isMobile };
}