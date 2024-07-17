import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./pages/App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import SessionsList from "./pages/SessionsList.jsx";
import SupportsList from "./pages/SupportsList.jsx";
import Admin from "./pages/Admin.jsx";
import { UserContextProvider, useUser } from "./contexts/userContext";

// Add CSS
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

/**
 * Appel axios
 */
import { userSession, getSupports, getSessions } from "./services/axios";
import ErrorElement from "./pages/ErrorElement.jsx";
import Error404 from "./pages/Error404.jsx";
import Home from "./pages/Home.jsx";
import Wheel from "./pages/Wheel.jsx";

// Wrap the router with a component that loads the user
const RouterWithUser = () => {
	const { user } = useUser();

	const router = createBrowserRouter([
		{
			path: "/",
			element: <App />,
			children: [
				{
					path: "/",
					element: <Home />,
				},
				{
					path: "/register",
					element: <Register />,
				},
				{
					path: "/login",
					element: <Login />,
				},
				{
					path: "/sessions",
					element: <SessionsList />,
					errorElement: <ErrorElement />,
					loader: async () => {
						const response = await getSessions();
						return {
							sessions: response.data,
						};
					},
				},
				{
					path: "/supports",
					element: <SupportsList />,
					errorElement: <ErrorElement />,
					loader: async () => {
						const promisesAll = await Promise.all([
							getSupports(),
							userSession(user?.id),
						]);

						return {
							supports: promisesAll[0].data,
							sessions: promisesAll[1].data.sessions,
						};
					},
				},
				{
					path: "/wheel-support",
					element: <Wheel />,
					errorElement: <ErrorElement />,
					loader: async () => {
						const promisesAll = await Promise.all([
							getSupports(),
							userSession(user?.id),
						]);

						return {
							supports: promisesAll[0].data,
							sessions: promisesAll[1].data.sessions,
						};
					},
				},
			],
		},
		{
			path: "/admin",
			element: <Admin />,
			errorElement: <ErrorElement />,
			children: [
				{
					path: "/admin",
					element: <h1>Admin</h1>,
				},
			],
		},
		{
			path: "*",
			element: <Error404 />,
		},
	]);

	return <RouterProvider router={router} />;
};

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserContextProvider>
			<RouterWithUser />
			<ToastContainer
				position="top-right"
				autoClose={5000}
				hideProgressBar={false}
				newestOnTop={false}
				closeOnClick
				rtl={false}
				pauseOnFocusLoss={false}
				draggable
				pauseOnHover={false}
				theme="colored"
				transition:Bounce
			/>
		</UserContextProvider>
	</React.StrictMode>
);
