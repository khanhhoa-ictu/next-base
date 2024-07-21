'use client'
import React, { createContext, useContext, useEffect, useState } from "react";
import useProfile from "./hook/useProfile";

const AppContext = createContext <any> ({
    profile : '',

})

export const useAppContext = () =>{
    const context = useContext(AppContext);
    return context
}

export default function AppProvider({ children}: { children: React.ReactNode }) {
    const {profile} = useProfile()
    // const [user, setUser] = useState('')
    // useEffect(()=>{
    //   if(profile){
    //     setUser(profile)
    //   }
    // },[profile])
    return (
      <AppContext.Provider value={{profile}}>
        {children}
      </AppContext.Provider>
    )
}