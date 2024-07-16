import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import { joinSession, getSessions } from "../services/axios";
import { toasts } from "../services/toasts";
import { useUser } from "../contexts/userContext";
import { CheckIcon } from "@heroicons/react/24/solid";
function SessionsList() {
	const { user: userConnected } = useUser();
	console.log(userConnected);
	const { sessions: initialSessions } = useLoaderData();
	const [sessions, setSessions] = useState(initialSessions);

	useEffect(() => {
		setSessions(initialSessions);
	}, [initialSessions]);

	const handleJoinSession = async (id) => {
		try {
			await joinSession(id);
			toasts.success("Vous avez rejoint la session");
			const response = await getSessions();
			setSessions(response.data);
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de la jonction de la session"
			);
			console.error("Error joining session:", error);
		}
	};

	return (
		<div className="px-4 sm:px-6 lg:px-8 mt-16">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">
						Sessions
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						La liste des sessions
					</p>
				</div>
				<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
					<button
						type="button"
						className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
					>
						Ajouter une session
					</button>
				</div>
			</div>
			<div className="mt-8 flow-root">
				<div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
					<div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
						<table className="min-w-full divide-y divide-gray-300">
							<thead>
								<tr>
									<th
										scope="col"
										className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
									>
										Nom de session
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Créée le
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Nombre d'étudiants
									</th>
									<th
										scope="col"
										className="relative py-3.5 pl-3 pr-4 sm:pr-0"
									>
										<span className="sr-only">Edit</span>
									</th>
								</tr>
							</thead>
							<tbody className="divide-y divide-gray-200">
								{sessions.map((session) => {
									const isUserInSession = session.users.some(
										(user) => user.id === userConnected?.id
									);
									return (
										<tr key={session.id}>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
												{session.title}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
												{new Date(
													session.createdAt
												).toLocaleDateString()}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
												{session.users.length}
											</td>
											<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												<button
													className={`text-indigo-600 hover:text-indigo-900 ${
														isUserInSession
															? "cursor-default"
															: ""
													}`}
													onClick={() =>
														!isUserInSession &&
														handleJoinSession(
															session.id
														)
													}
													disabled={isUserInSession}
												>
													{isUserInSession ? (
														<CheckIcon className="w-5 h-5" />
													) : (
														"Rejoindre"
													)}
													<span className="sr-only">
														, {session.title}
													</span>
												</button>
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
	);
}

export default SessionsList;
