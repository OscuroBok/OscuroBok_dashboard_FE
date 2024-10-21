import { useRouter } from "next/navigation";
import { store } from "../store/store";
import { resetAuthState } from "@/store/auth/authSlice";
import { appPaths } from "@/utils/helper/appPaths";
import { deleteCookie } from "cookies-next";

const useLogout = () => {
  const router = useRouter();
  const logoutHandler = async () => {
    deleteCookie('authToken')
    store.dispatch(resetAuthState());
      return router.push(appPaths.AUTH_ROUTES.SIGNIN);
  };

  return logoutHandler;
};

export default useLogout;
