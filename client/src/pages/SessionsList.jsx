import { useLoaderData } from "react-router-dom";
function SessionsList() {
	const { sessions } = useLoaderData();

	return (
		<section>
			<h1>Je suis le composant : `SessionsList`</h1>
			<ul>
				{sessions.map((session) => (
					<li key={session.id}>{session.title}</li>
				))}
			</ul>
		</section>
	);
}

export default SessionsList;
