import { useState } from "react";

export default function useProfile(enabled = false) {
  const [profile, setProfile] = useState<any>()
  const firstLoading = profile === undefined;
  return { profile, firstLoading };
}