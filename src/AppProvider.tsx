'use client'
import React, { createContext, useContext, useState } from "react";
import { clientToken } from "./lib/http";



export default function AppProvider({ children, initSessiontoken = '' }: { children: React.ReactNode, initSessiontoken?: string }) {
    useState(()=>{
        if(typeof window !== 'undefined'){
            clientToken.value = initSessiontoken

        }
    })
    return (
        <>
            {children}
        </>
    )
}