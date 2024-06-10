import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ErrorPage from "./pages/errors/ErrorPage.jsx";
import Home from "./pages/home/Home.jsx";
import Welcome from "./pages/welcomePage/welcome.jsx";
import SplashScreen from "./pages/components/SplashScreen.jsx";
import Settings from "./pages/settings/settings.jsx";
import Project from "./pages/projects/project.jsx";
import ProtectedRoute from "./pages/auth/components/protectedRoute/ProtectedRoute.jsx";
import FileView from "./pages/projects/components/file-view/FileView.jsx";
import FolderView from "./pages/projects/components/folder-view/FolderView.jsx";
import Annotation from "./pages/annotation/Annotation.jsx";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import RoadMap from "./pages/roadmap/RoadMap.jsx";
import Register from "./pages/auth/register/Register.jsx";
import Login from "./pages/auth/login/Login.jsx";
import ProjectShare from "./pages/projects/components/share-project/ProjectShare.jsx";
import Docs from "./pages/docs/Docs.jsx";
import Structure from "./pages/docs/components/structure/Structure.jsx";
import Versioning from "./pages/docs/components/versioning/Versioning.jsx";
import AnnotationDocs from "./pages/docs/components/annotationsDocs/AnnotationsDocs.jsx";
import RoadmapDocs from "./pages/docs/components/roadmap/RoadmapDocs.jsx";
import Notification from "./pages/notification/Notification.jsx";
import Issues from "./pages/issues/Issues.jsx";
import CreateIssueScreen from "./pages/issues/components/createIssueScreen/CreateIssueScreen.jsx";
import ViewIssue from "./pages/issues/components/viewIssue/ViewIssue.jsx";

const router = createBrowserRouter([
	{
		path: "/",
		element: <ProtectedRoute element={App} />,
		errorElement: <ErrorPage />,
		children: [
			{
				path: "Home",
				element: <Home />,
			},
		],
	},
	{
		path: "/Settings/:idProject?/:selected?",
		element: <ProtectedRoute element={Settings} />,
	},
	{
		path: `/Project/:idProject`,
		element: <ProtectedRoute element={Project} />,
	},
	{
		path: "/Project/Folder/:idProject/:idFolder",
		element: <ProtectedRoute element={FolderView} />,
	},
	{
		path: `/Project/File/:idProject/:idFile/:idFolder?`,
		element: <ProtectedRoute element={FileView} />,
	},
	{
		path: "/Project/Share/:token/:idProject",
		element: <ProtectedRoute element={ProjectShare} />,
	},
	{
		path: "/Annotation/:idProject",
		element: <ProtectedRoute element={Annotation} />,
	},
	{
		path: "/roadmap",
		element: <ProtectedRoute element={RoadMap} />,
	},
	{
		path: "/issues/:idProject",
		element: <ProtectedRoute element={Issues} />,
	},
	{
		path: "/issue/new/:idProject",
		element: <ProtectedRoute element={CreateIssueScreen} />,	
	},
	{
		path: "/issue/view/:idProject/:idIssue",
		element: <ProtectedRoute element={ViewIssue} />,
	},
	{
		path: "/Welcome",
		element: <Welcome />,
	},
	{
		path: "/notifications",
		element: <Notification />,
	},
	{
		path: "/docs",
		element: <Docs />,
	},
	{
		path: "/docs/structure",
		element: <Structure />
	},
	{
		path: "/docs/versioning",
		element: <Versioning />
	},
	{
		path: "/docs/annotations",
		element: <AnnotationDocs />
	},
	{
		path: "/docs/roadmap",
		element: <RoadmapDocs />
	},
	{
		path: "Auth/Register",
		element: <Register />,
	},
	{
		path: "Auth/Login",
		element: <Login />,
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
			<SplashScreen />
			<RouterProvider router={router} />
			<Toaster closeButton={true} richColors visibleToasts="1" />
		</ThemeProvider>
	</React.StrictMode>
);
