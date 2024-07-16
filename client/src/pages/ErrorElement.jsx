// ErrorBoundary.js
import { useRouteError } from "react-router-dom";

function ErrorElement() {
	const error = useRouteError();

	return (
		<div>
			<h1>Something went wrong</h1>
			<p>{error.message}</p>
		</div>
	);
}

export default ErrorElement;
