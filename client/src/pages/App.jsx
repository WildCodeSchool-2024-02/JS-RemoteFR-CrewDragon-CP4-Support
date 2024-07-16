import { Outlet } from "react-router-dom";
import { useUser } from "../contexts/userContext";
function App() {
	const { user } = useUser();
	console.log("user", user);
	return (
		<section className="bg-red-800">
			<h1>Je suis le composant : `App`</h1>
			<Outlet />
		</section>
	);
}

export default App;
