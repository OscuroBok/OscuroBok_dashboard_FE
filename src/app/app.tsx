"use client";
import React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import RTL from "@/app/(DashboardLayout)/layout/shared/customizer/RTL";
import { ThemeSettings } from "@/utils/theme/Theme";
import { useSelector } from "react-redux";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { AppState } from "@/store/store";
import "@/utils/i18n";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouterInitializer from "@/hooks/useRouteInitializer";
import "./global.css";

const MyApp = ({ children }: { children: React.ReactNode }) => {
  const theme = ThemeSettings();
  RouterInitializer();
  const customizer = useSelector((state: AppState) => state.customizer);

  return (
    <>
      <AppRouterCacheProvider options={{ enableCssLayer: true }}>
        <ThemeProvider theme={theme}>
          <RTL direction={customizer.activeDir}>
            <CssBaseline />
            <ToastContainer
              position="top-center"
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
            {children}
          </RTL>
        </ThemeProvider>
      </AppRouterCacheProvider>
    </>
  );
};

export default MyApp;
