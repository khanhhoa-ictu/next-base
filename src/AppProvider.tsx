'use client'
import { usePathname } from "next/navigation";
import React, { createContext, useContext } from "react";
import useProfile from "./hook/useProfile";

const AppContext = createContext <any> ({
    profile : '',

})

export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context
}

export default function AppProvider({ children}: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/login';
    const {profile} = useProfile(isLoginPage)
    return (
      <AppContext.Provider value={{profile}}>
        {children}
      </AppContext.Provider>
    )
}