import { createRoot } from "react-dom/client";
import React from "react";
import "./index.css";
import Login from "./components/Login.jsx";
import Signup from "./components/SignUp.jsx";
import Home from "./components/Home.jsx";
import Layout from "./components/Layout.jsx";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import UrlShortner from "./UrlShortner.jsx";

import { ToastContainer } from "react-toastify";
import "./styles/ReactToastify.css";

// using redux store
import { Provider } from "react-redux";
import store from "./store/store.js";
import UserProfile from "./components/user-profile/UserProfile.jsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="" element={<Home />} />
      <Route path="urlshortener" element={<UrlShortner />} />
      <Route path="login" element={<Login />} />
      <Route path="signup" element={<Signup />} />
      <Route path="profile" element={<UserProfile />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="colored"
        // transition={Bounce}
        progressClassName="toastProgress"
        bodyClassName="toastBody"
      />
    </Provider>
  </React.StrictMode>
);

