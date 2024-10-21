// hooks/usePermission.js
import { AppState, store } from "@/store/store";
import { authSliceType } from "@/types/auth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { appPaths } from "@/utils/helper/appPaths";
import { useSelector } from "react-redux";

const usePermission = (profileInfoUpdated: boolean): boolean => {
  const router = useRouter();
  const route = usePathname();
  const profile = useSelector((state: AppState) => state.profile);
  const [permissionChecking, setPermissionChecking] = useState(true);
  const menuList = store?.getState()?.menu;

  useEffect(() => {
    if (profileInfoUpdated) {
      if (
        route !== appPaths.AUTH_ROUTES.DASHBOARD &&
        route !== appPaths.AUTH_ROUTES.PROFILE
      ) {
        const routeArr = route.split("/");
        const requestedRoutePermission =
          menuList?.find((menu) => menu.href === `/${routeArr?.[1]}`)
            ?.display ?? false;

        if (requestedRoutePermission) {
          if (routeArr?.[2] === "bulk-import-domain") {
            if (!profile?.isSuperAdmin) {
              router.replace(appPaths.AUTH_ROUTES.ACCESS_DENIED);
            } else {
              setPermissionChecking(false);
            }
          } else {
            setPermissionChecking(false);
          }
        } else {
          router.replace(appPaths.AUTH_ROUTES.ACCESS_DENIED);
        }
      } else {
        setPermissionChecking(false);
      }
    }
  }, [profileInfoUpdated, route, router, menuList, profile]);
  return permissionChecking;
};

export default usePermission;
