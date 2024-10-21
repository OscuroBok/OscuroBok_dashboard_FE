
import { profileSliceType } from '@/types/profile';
import { createSlice } from '@reduxjs/toolkit';
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL
const initialState: profileSliceType = {
    _id: "",
    email: "",
    createdAt: "",
    firstName: "",
    isSuperAdmin: false,
    lastName: "",
    status: false,
    updatedAt: "",
    fullName: "",
    slot: 0,
    redirect_rule: 1,
    role: null,
    profileImage: '',
    companyName: "",
  };

export const ProfileSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setProfileDetails: (state: profileSliceType, action) => {
      state._id = action?.payload?._id ?? state._id;
      state.email = action?.payload?.email ?? state.email;
      state.createdAt = action?.payload?.createdAt ?? state.createdAt;
      state.firstName = action?.payload?.firstName ?? state.firstName;
      state.isSuperAdmin = action?.payload?.isSuperAdmin ?? state.isSuperAdmin;
      state.lastName = action?.payload?.lastName ?? state.lastName;
      state.status = action?.payload?.status ?? state.status;
      state.updatedAt = action?.payload?.updatedAt ?? state.updatedAt;
      state.fullName = action?.payload?.fullName ?? state.fullName;
      state.slot = action?.payload?.slot ?? state.slot;
      state.redirect_rule = action?.payload?.redirect_rule ?? state.redirect_rule;
      state.role = action?.payload?.role ?? state.role;
      state.profileImage = action?.payload?.profileImage ? `${BASE_IMAGE_URL}${action?.payload?.profileImage}` : state.profileImage;
      state.companyName = action?.payload?.companyName ?? state.companyName;
    },
    resetProfileDetails: (state: profileSliceType) => {
        state._id = initialState._id;
        state.email = initialState.email;
        state.createdAt = initialState.createdAt;
        state.firstName = initialState.firstName;
        state.isSuperAdmin = initialState.isSuperAdmin;
        state.lastName = initialState.lastName;
        state.status = initialState.status;
        state.updatedAt = initialState.updatedAt;
        state.fullName = initialState?.fullName;
        state.slot = initialState?.slot;
        state.redirect_rule = initialState.redirect_rule;
        state.role = initialState?.role;
        state.profileImage = initialState?.profileImage;
        state.companyName = initialState?.companyName;
      },
  },
});

export const {
    setProfileDetails,
    resetProfileDetails,
} = ProfileSlice.actions;

export default ProfileSlice.reducer;
