'use client'
import React, { createContext, useContext, useState } from "react";



export default function AppProvider({ children}: { children: React.ReactNode }) {
  
    return (
        <>
            {children}
        </>
    )
}