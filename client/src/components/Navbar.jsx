import { Link } from "react-router-dom";
import { UserIcon, UserMinusIcon } from "@heroicons/react/24/solid";
import { useUser } from "../contexts/userContext";
function Navbar() {
	const { user, handleLogout } = useUser();

	const navConnected = [
		{ name: "Les supports", link: "/supports" },
		{ name: "Les sessions", link: "/sessions" },
	];

	return (
		<header className="text-gray-600 body-font">
			<div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
				<Link
					className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0"
					to="/"
				>
					<span className="ml-3 text-xl">Support wheels</span>
				</Link>
				<nav className="md:ml-auto flex flex-wrap items-center text-base justify-center">
					{user && (
						<>
							{navConnected.map((item, index) => (
								<Link
									className="mr-5 hover:text-gray-900"
									key={index}
									to={item.link}
								>
									{item.name}
								</Link>
							))}
						</>
					)}
				</nav>

				{user === null ? (
					<>
						<Link
							className="inline-flex items-center mr-5 hover:text-gray-900"
							to="/register"
						>
							S'inscrire
						</Link>
						<Link
							className="inline-flex items-center bg-gray-100 border-0 py-1 px-3 focus:outline-none hover:bg-gray-200 rounded text-base mt-4 md:mt-0"
							to="/login"
						>
							Connexion
							<UserIcon className="w-4 h-4 ml-1" />
						</Link>
					</>
				) : (
					<>
						<button
							onClick={handleLogout}
							className="inline-flex items-center"
						>
							Logout
							<UserMinusIcon className="w-4 h-4 ml-1" />
						</button>{" "}
					</>
				)}
			</div>
		</header>
	);
}

export default Navbar;
