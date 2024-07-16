import { Outlet } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function Admin() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto max-w-3xl">
					<ProtectedRoute>
						<Outlet />
					</ProtectedRoute>
				</div>
			</div>
			<Footer />
		</div>
	);
}
