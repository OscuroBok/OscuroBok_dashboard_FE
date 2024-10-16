export const url=import.meta.env.BACKEND_URL

export const appPaths = {
    AUTH_ROUTES: {
        SIGNUP: "/auth/sign-up",
        SIGNIN: "/auth/sign-in",
        FORGOT_PASSWORD: "/auth/forgot-password"
    },

    DASHBOARD: {
        HOME: "/dashboard/home"
    }
}
// Meant for users who are not logged in, but has opened our app, show them only below set of Pages
export const guestRoutes = [
    appPaths.LOGIN,
    appPaths.REGISTER,
    appPaths.FORGOT_PASSWORD,
    // Add more guest routes as needed
  ];