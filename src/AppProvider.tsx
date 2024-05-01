'use client'
import React, { createContext, useContext, useState } from "react";

const Appcontext = createContext({
    sesstionToken: '',
    setSesstionToken: (sesstionToken: string) =>{}
})

export const useAppContext = () =>{
    const context = useContext(Appcontext)
    if(!context){
        throw new Error('useAppContext must be used within an AppProvider')
    }
    return context
}
export default function AppProvider({ children, initSessiontoken = '' }: { children: React.ReactNode, initSessiontoken?: string }) {
    const [sesstionToken, setSesstionToken] = useState(initSessiontoken)
    return (
        <Appcontext.Provider value={{ sesstionToken, setSesstionToken }}>
            {children}
        </Appcontext.Provider>
    )
}