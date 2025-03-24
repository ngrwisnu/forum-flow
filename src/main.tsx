import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./pages/Login.tsx";
import Signup from "./pages/Signup.tsx";
import RootLayout from "./components/layouts/RootLayout.tsx";
import Leaderboards from "./pages/Leaderboards.tsx";
import Threads from "./pages/Threads.tsx";

const router = createBrowserRouter([
  {
    path: "register",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  },
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <Threads />,
      },
      {
        path: "leaderboards",
        element: <Leaderboards />,
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
);
