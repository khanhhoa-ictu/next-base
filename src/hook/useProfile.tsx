'use client'
import { handleErrorMessage } from "@/lib/utils";
import { getProfile } from "@/service/auth";
import { useEffect, useState } from "react";

export default function useProfile(enabled = false) {
  const [profile, setProfile] = useState<any>('')
  useEffect(()=>{
    if(enabled){
      setProfile("")
      return 
    } 
    const loadProfile  = async()=>{
      try {
        const dataProfile = await getProfile();
        setProfile(dataProfile.payload)
      } catch (error) {
        console.log(error)
        // handleErrorMessage(error)
      }
    }
    loadProfile()
  },[enabled])
  const firstLoading = profile === undefined;
  return { profile, firstLoading };
}