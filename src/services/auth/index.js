import axiosInstance from "@/configs/axios-config";
export const userRegistration=async (userdetails)=>{
    try {
        const response= await axiosInstance.post('/user-registration',userdetails);
        return response.data
    } catch (error) {
        return error
    }
}
export const userSignIn=async (userdetails)=>{
    try {
        const response= await axiosInstance.post('/login',userdetails);
        return response.data
    } catch (error) {
        return error
    }
}