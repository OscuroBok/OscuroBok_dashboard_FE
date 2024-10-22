// hooks/useAuth.js
import { store } from "@/store/store";
import { authSliceType } from "@/types/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { appPaths } from "@/utils/helper/appPaths";
import { hasCookie } from "cookies-next";

// This code is called to check at every page, if the user is logged in after fetching AuthState from Redux Store and has set Cookies containing token, if no, then redirect to Dashboard
const useUnAuth = (): boolean => {
  const router = useRouter();
  const [checking, setChecking] = useState(true);
  const authState: authSliceType = store?.getState()?.auth;
  useEffect(() => {
    if (authState?.isLoggedIn === true && hasCookie("authToken")) {
      router.push(appPaths.AUTH_ROUTES.DASHBOARD);
    } else {
      setChecking(false);
    }
  }, [router]);
  return checking;
};

export default useUnAuth;
