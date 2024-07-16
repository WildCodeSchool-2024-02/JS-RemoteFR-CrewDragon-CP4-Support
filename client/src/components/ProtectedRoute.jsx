import { useUser } from "../contexts/userContext";

function ProtectedRoute({ children }) {
	const { user } = useUser();

	if (user?.role !== "TRAINER") {
		return <h1>Vous n'avez pas les droits</h1>;
	}

	return children;
}

export default ProtectedRoute;
