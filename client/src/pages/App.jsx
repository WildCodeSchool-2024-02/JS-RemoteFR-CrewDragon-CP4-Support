import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function App() {
	return (
		<div className="flex min-h-screen flex-col">
			<Navbar />
			<div className="mx-20 max-w-7xl px-4 sm:px-6 lg:px-8">
				<div className="mx-auto">
					<Outlet />
				</div>
			</div>
			<Footer />
		</div>
	);
}
