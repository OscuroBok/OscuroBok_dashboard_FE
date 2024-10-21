// hooks/useAuth.js
import { store } from "@/store/store";
import { authSliceType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { appPaths } from "@/utils/helper/appPaths";

const useAuth = (): boolean => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const authState: authSliceType = store?.getState()?.auth;
  // console.log(authState.isLoggedIn)
  useEffect(() => {
    if (!authState?.isLoggedIn) {
      router.push(appPaths.AUTH_ROUTES.SIGNIN);
    } else {
      setChecking(false);
    }
  }, [router]);
  return checking;
};

export default useAuth;
