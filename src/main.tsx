import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";

const router = createBrowserRouter([
  {
    path: "register",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
