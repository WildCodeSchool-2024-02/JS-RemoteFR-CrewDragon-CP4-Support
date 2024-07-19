import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import {
	HandThumbUpIcon,
	TrashIcon,
	PencilIcon,
	StarIcon,
} from "@heroicons/react/24/solid";

import {
	joinSession,
	getSessions,
	createSession,
	deleteSession,
	updateSession,
} from "../services/axios";
import { toasts } from "../services/toasts";
import { useUser } from "../contexts/userContext";

function SessionsList() {
	const { user: userConnected } = useUser();
	const { sessions: initialSessions } = useLoaderData();
	const [sessions, setSessions] = useState(initialSessions);
	const [editingSession, setEditingSession] = useState(null);

	const [showModal, setShowModal] = useState(false);
	const [newSessionTitle, setNewSessionTitle] = useState("");

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

	const handleDeleteSession = async (id) => {
		try {
			await deleteSession(id);
			toasts.info("Session supprimée avec succès");
			const response = await getSessions();
			setSessions(response.data);
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de la suppression de la session"
			);
			console.error("Error deleting session:", error);
		}
	};

	const handleAddSession = async () => {
		try {
			await createSession({
				title: newSessionTitle,
				users: userConnected.id,
			});
			toasts.success("Session ajoutée avec succès");
			const response = await getSessions();
			setSessions(response.data);
			setShowModal(false);
			setNewSessionTitle("");
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de l'ajout de la session"
			);
			console.error("Error adding session:", error);
		}
	};

	const handleEditSession = async () => {
		try {
			await updateSession(editingSession.id, {
				title: newSessionTitle,
				users: userConnected.id,
			});
			toasts.success("Session modifiée avec succès");
			const response = await getSessions();
			setSessions(response.data);
			setShowModal(false);
			setNewSessionTitle("");
			setEditingSession(null);
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de la modification de la session"
			);
			console.error("Error editing session:", error);
		}
	};

	const openAddModal = () => {
		setShowModal(true);
		setEditingSession(null);
		setNewSessionTitle("");
	};

	const openEditModal = (session) => {
		setShowModal(true);
		setEditingSession(session);
		setNewSessionTitle(session.title);
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
				{
					// If the user is not connected or userConnected is not TRAINER, we display a message
					!userConnected ||
					userConnected?.role !== "TRAINER" ? null : (
						<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
							<button
								type="button"
								onClick={openAddModal}
								className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Ajouter une session
							</button>
						</div>
					)
				}
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
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Mon crew préféré !
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
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
												<StarIcon className="h-5 w-5" />
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
														<HandThumbUpIcon className="w-5 h-5" />
													) : (
														"Rejoindre"
													)}
													<span className="sr-only">
														, {session.title}
													</span>
												</button>
												{userConnected?.role ===
													"TRAINER" && (
													<>
														<button
															className="text-indigo-600 hover:text-indigo-900 ml-4"
															onClick={() =>
																openEditModal(
																	session
																)
															}
														>
															<PencilIcon className="w-5 h-5" />
														</button>
														<button
															className="text-red-600 hover:text-red-900 ml-4"
															onClick={() => {
																handleDeleteSession(
																	session.id
																);
															}}
														>
															<TrashIcon className="w-5 h-5" />
														</button>
													</>
												)}
											</td>
										</tr>
									);
								})}
							</tbody>
						</table>
					</div>
				</div>
			</div>

			{showModal && (
				<div className="fixed z-10 inset-0 overflow-y-auto">
					<div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
						<div
							className="fixed inset-0 transition-opacity"
							aria-hidden="true"
						>
							<div className="absolute inset-0 bg-gray-500 opacity-75"></div>
						</div>

						<span
							className="hidden sm:inline-block sm:align-middle sm:h-screen"
							aria-hidden="true"
						>
							&#8203;
						</span>

						<div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
							<div>
								<div className="mt-3 text-center sm:mt-5">
									<h3
										className="text-lg leading-6 font-medium text-gray-900"
										id="modal-title"
									>
										{editingSession
											? "Modifier la session"
											: "Ajouter une session"}
									</h3>
									<div className="mt-2">
										<input
											type="text"
											className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											placeholder="Titre de la session"
											value={newSessionTitle}
											onChange={(e) =>
												setNewSessionTitle(
													e.target.value
												)
											}
										/>
									</div>
								</div>
							</div>
							<div className="flex gap-5 flex-end mt-5 sm:mt-6">
								<button
									type="button"
									className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:text-sm"
									onClick={() => setShowModal(false)}
								>
									Annuler
								</button>
								<button
									type="button"
									className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
									onClick={
										editingSession
											? handleEditSession
											: handleAddSession
									}
								>
									{editingSession ? "Modifier" : "Ajouter"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SessionsList;
