'use client'
import { handleErrorMessage } from "@/lib/utils";
import { getProfile } from "@/service/auth";
import { useEffect, useState } from "react";

export default function useProfile(enabled = false) {
  const [profile, setProfile] = useState<any>('')
  useEffect(()=>{
    const loadProfile  = async()=>{
      try {
        const dataProfile = await getProfile();
        setProfile(dataProfile.payload)
      } catch (error) {
        handleErrorMessage(error)
      }
    }
    loadProfile()
  },[])
  const firstLoading = profile === undefined;
  return { profile, firstLoading };
}