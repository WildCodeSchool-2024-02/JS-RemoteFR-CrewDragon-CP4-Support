import { useRouteError, Link } from "react-router-dom";

function ErrorElement() {
	const error = useRouteError();

	return (
		<div className="bg-white p-8 rounded-md mt-20">
			<h1 className="text-3xl font-bold text-red-600">
				Oops! Something went wrong
			</h1>
			<p className="mt-4 text-gray-700">{error.message}</p>
			<Link
				to="/"
				className="mt-6 inline-block px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-600"
			>
				Go Back to Home
			</Link>
		</div>
	);
}

export default ErrorElement;
