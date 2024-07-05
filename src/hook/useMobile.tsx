import { useEffect, useState } from "react";

export default function useIsMobile() {
    const [isMobile, setIsMobile] = useState(false)
 

  const listenerScreen = () => {
    let isMobiles = true;
    if (typeof window !== "undefined") {
      isMobiles = window.innerWidth <= 600 ? true : false;
    }
    setIsMobile(isMobiles)
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("resize", listenerScreen);
    }
    return () => {
      if (typeof window !== "undefined") {
        window.removeEventListener("resize", listenerScreen);
      }
    };
  }, []);

  return { isMobile };
}