import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
function Admin() {
	return (
		<ProtectedRoute>
			<h1>Admin</h1>
			<Outlet />
		</ProtectedRoute>
	);
}

export default Admin;
