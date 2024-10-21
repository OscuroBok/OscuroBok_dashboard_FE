import { store } from "../store/store";
import { getProfileDetails } from "@/services/profileService";
import { useEffect, useState } from "react";
import { setProfileDetails } from "@/store/auth/profileSlice";
import useAuth from "./useAuth";
import { setMenuItems } from "@/store/auth/menuSlice";

const useProfile = () : {success: boolean, loading: boolean} => {
  const checking = useAuth();
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(true);
  const getProfileHandler = async () => {
    if(!checking){
      const response = await getProfileDetails();
      if (response) {
        store.dispatch(setProfileDetails(response));
        store.dispatch(setMenuItems({profile: response}));
        setSuccess(true);
      } else {
        setSuccess(false)
      }
      setLoading(false)
    }
  };

  useEffect(() => {
    getProfileHandler();
  }, [checking])

  return { success, loading};
};

export default useProfile;
