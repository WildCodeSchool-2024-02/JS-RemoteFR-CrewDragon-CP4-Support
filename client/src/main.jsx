import React from "react";
import ReactDOM from "react-dom/client";

import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./pages/App.jsx";
import Register from "./pages/Register.jsx";
import Login from "./pages/Login.jsx";
import SessionsList from "./pages/SessionsList.jsx";
import "./index.css";

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
			},
		],
	},
]);

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);
