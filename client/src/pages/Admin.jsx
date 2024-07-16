import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Admin() {
	return (
		<>
			<Navbar />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<ProtectedRoute>
						<Outlet />
					</ProtectedRoute>
				</div>
			</div>
			<Footer />
		</>
	);
}
