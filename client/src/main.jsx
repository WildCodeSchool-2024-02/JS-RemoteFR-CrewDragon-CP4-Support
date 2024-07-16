import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import SessionsList from "./pages/SessionsList.jsx";
import Admin from "./pages/Admin.jsx";

// Add Context
import { UserContextProvider } from "./contexts/userContext";

// Add CSS
import "./index.css";

/**
 * Appel axios
 */

import { getSessions } from "./services/axios";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
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
				loader: async () => {
					const response = await getSessions();
					return {
						sessions: response.data,
					};
				},
			},
		],
	},
	{
		path: "/admin",
		element: <Admin />,
		children: [
			{
				path: "/",
				element: <h1>Admin</h1>,
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<UserContextProvider>
			<RouterProvider router={router} />
		</UserContextProvider>
	</React.StrictMode>
);
