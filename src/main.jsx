import React from "react"; 
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@material-tailwind/react";
import { MaterialTailwindControllerProvider } from "@/context";
import "../public/css/tailwind.css";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Don't forget to import styles!

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <MaterialTailwindControllerProvider>
          <Provider store={store}>
            <App />
            <ToastContainer
              position="top-center" // You can change this to 'bottom-right', 'top-right', etc.
              autoClose={5000}
              hideProgressBar={false}
              newestOnTop={true} // Set to true if you want the newest toasts at the top
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored" // You can change this to 'light', 'dark', etc.
              style={{
                zIndex: 9999, // Ensure it overlays correctly
                marginTop: '20px' // Adjust top margin if needed
              }}
            />
          </Provider>
        </MaterialTailwindControllerProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
