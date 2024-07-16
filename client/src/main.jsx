import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import App from "./pages/App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import SessionsList from "./pages/SessionsList.jsx";
import SupportsList from "./pages/SupportsList.jsx";
import Admin from "./pages/Admin.jsx";

// Add Context
import { UserContextProvider } from "./contexts/userContext";

// Add CSS
import "./index.css";
import "react-toastify/dist/ReactToastify.min.css";

/**
 * Appel axios
 */

import { getSessions, getSupports } from "./services/axios";
import ErrorElement from "./pages/ErrorElement.jsx";
import Error404 from "./pages/Error404.jsx";
import Home from "./pages/Home.jsx";

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
						getSessions(),
					]);
					return {
						supports: promisesAll[0].data,
						sessions: promisesAll[1].data,
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

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserContextProvider>
			<RouterProvider router={router} />
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
