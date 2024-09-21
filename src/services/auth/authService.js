import api from "@/configs/axios-config";
import { toast } from "react-toastify";

export const signUp = async (userDetails) => {
    try {
        const response = await api.post('/user-registration', userDetails);
        
        if (response?.status === 201) {
            const { success, message, data } = response.data;
            if (success) {
                toast.success(message || "User created successfully!");
                return data;
            } else {
                toast.error("Failed to register! Please try again.");
                return null;
            }
        } else {
            toast.error("Unexpected response from the server.");
            return null;
        }
    } catch (error) {
        console.log("Sign up error:", error);
        toast.error("Something went wrong!");
        return null;
    }
}

export const signIn = async (userDetails) => {
    try {
        const response = await api.post('/login', userDetails);
        console.log('response', response);

        if (response?.status === 200) {
            const { message, data, token } = response.data; // Extract message and data

            // Check if the data contains the user details
            if (data) {
                // console.log(token)
                toast.success(message || "User logged in successfully!");
                return {data : data, token: token}; // Return the user data
            } else {
                toast.error("Failed to login! Please try again.");
                return null;
            }
        } else {
            toast.error("Unexpected response from the server.");
            return null;
        }
    } catch (error) {
        console.log("Sign in error:", error);
        toast.error("Something went wrong!");
        return null;
    }
}
