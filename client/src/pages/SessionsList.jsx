import { getSessions } from "../services/axios";

import { useEffect, useState } from "react";
function SessionsList() {
	const [sessions, setSessions] = useState([]);

	useEffect(() => {
		const fetchSessions = async () => {
			const response = await getSessions();
			setSessions(response.data);
		};
		fetchSessions();
	}, []);

	return (
		<section>
			<h1>Je suis le composant : `SessionsList`</h1>
			<ul>
				{sessions.map((session) => (
					<li key={session._id}>{session.title}</li>
				))}
			</ul>
		</section>
	);
}

export default SessionsList;
