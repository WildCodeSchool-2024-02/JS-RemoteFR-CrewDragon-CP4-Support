import { Outlet } from "react-router-dom";
function App() {
	return (
		<section className="bg-red-800">
			<h1>Je suis le composant : `App`</h1>
			<Outlet />
		</section>
	);
}

export default App;
