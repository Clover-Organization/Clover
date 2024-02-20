import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/errors/ErrorPage.jsx";
import Home from "./pages/home/Home.jsx";
import Auth from "./pages/auth/Auth.jsx";
import Welcome from "./pages/welcomePage/welcome.jsx";
import SplashScreen from "./pages/components/SplashScreen.jsx";
import Settings from "./pages/settings/settings.jsx";
import Project from "./pages/projects/project.jsx";
import ProtectedRoute from "./pages/auth/components/protectedRoute/ProtectedRoute.jsx";
import FileView from "./pages/projects/components/file-view/FileView.jsx";
import FolderView from "./pages/projects/components/folder-view/FolderView.jsx";
import Annotation from "./pages/annotation/Annotation.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    // element: <ProtectedRoute element={App} />,
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "Home",
        element: <Home />,
      },
    ],
  },
  {
    path: "/Settings/:idProject?",
    element: <Settings />,
  },
  {
    path: `/Project/:idProject`,
    element: <Project />,
  },
  {
    path: "/Project/Folder/:idProject/:idFolder",
    element: <FolderView />,
  },
  {
    path: `/Project/File/:idProject/:idFile/:idFolder?`,
    element: <FileView />,
  },
  {
    path: "/Annotation/:idProject",
    element: <Annotation />,
  },
  {
    path: "/Welcome",
    element: <Welcome />,
  },
  {
    path: "/auth",
    element: <Auth />,
  },
  {
    path: "/Welcome",
    element: <Welcome />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SplashScreen />
    <RouterProvider router={router} />
  </React.StrictMode>
);
