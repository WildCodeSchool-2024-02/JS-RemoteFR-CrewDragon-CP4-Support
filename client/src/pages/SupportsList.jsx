import { useState, useEffect } from "react";
import { useLoaderData } from "react-router-dom";
import {
	CheckIcon,
	XCircleIcon,
	TrashIcon,
	PencilIcon,
	PlusCircleIcon,
	MinusCircleIcon,
} from "@heroicons/react/24/solid";
import {
	getSupports,
	createSupport,
	deleteSupport,
	updateSupport,
	isDoneSupport,
	isLikeSupport,
	isDislikeSupport,
} from "../services/axios";
import { toasts } from "../services/toasts";
import { useUser } from "../contexts/userContext";
function SupportList() {
	const { user: userConnected } = useUser();
	const { supports: initialeSupport } = useLoaderData();
	const { sessions } = useLoaderData();
	const [supports, setSupports] = useState(initialeSupport);
	const [editingSupport, setEditingSupport] = useState(null);
	const [selectedSession, setSelectedSession] = useState(null);

	const [showModal, setShowModal] = useState(false);
	const [newSupportTitle, setNewSupportTitle] = useState("");

	useEffect(() => {
		setSupports(initialeSupport);
	}, [initialeSupport]);

	const handleSelectChange = (e) => {
		setSelectedSession(e.target.value);
	};

	const handleDeleteSupport = async (id) => {
		try {
			await deleteSupport(id);
			toasts.success("support supprimée avec succès");
			const response = await getSupports();
			setSupports(response.data);
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de la suppression de la support"
			);
			console.error("Error deleting support:", error);
		}
	};

	const handleAddSupport = async () => {
		try {
			if (newSupportTitle === "" || selectedSession === null) {
				toasts.error("Veuillez remplir tous les champs");
				return;
			}
			await createSupport({
				title: newSupportTitle,
				userId: userConnected.id,
				sessionId: +selectedSession,
			});
			toasts.success("support ajoutée avec succès");
			const response = await getSupports();
			setSupports(response.data);
			setShowModal(false);
			setNewSupportTitle("");
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de l'ajout de la support"
			);
			console.error("Error adding support:", error);
		}
	};

	const handleLikeSupport = async (id) => {
		try {
			const support = supports.find((support) => support.id === id);
			await isDoneSupport(id, {
				checked: !support.checked,
			});
			toasts.success("support modifiée avec succès");
			const response = await getSupports();
			setSupports(response.data);
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de la modification de la support"
			);
			console.error("Error editing support:", error);
		}
	};

	const handleEditsupport = async () => {
		try {
			await updateSupport(editingSupport.id, {
				title: newSupportTitle,
				userId: userConnected.id,
				sessionId: +selectedSession,
			});
			toasts.success("support modifiée avec succès");
			const response = await getSupports();
			setSupports(response.data);
			setShowModal(false);
			setNewSupportTitle("");
			setEditingSupport(null);
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de la modification de la support"
			);
			console.error("Error editing support:", error);
		}
	};

	const handleVoteSupport = async (id, choice) => {
		try {
			if (choice === "like") {
				await isLikeSupport(id);
				const response = await getSupports();
				setSupports(response.data);
			} else {
				await isDislikeSupport(id);
				const response = await getSupports();
				setSupports(response.data);
			}

			toasts.success("support modifiée avec succès");
			const response = await getSupports();
		} catch (error) {
			toasts.error(
				"Une erreur s'est produite lors de la modification de la support"
			);
			console.error("Error editing support:", error);
		}
	};

	const openAddModal = () => {
		setShowModal(true);
		setEditingSupport(null);
		setNewSupportTitle("");
	};

	const openEditModal = (support) => {
		setShowModal(true);
		setEditingSupport(support);
		setNewSupportTitle(support.title);
	};

	return (
		<div className="px-4 sm:px-6 lg:px-8 mt-16">
			<div className="sm:flex sm:items-center">
				<div className="sm:flex-auto">
					<h1 className="text-base font-semibold leading-6 text-gray-900">
						Supports
					</h1>
					<p className="mt-2 text-sm text-gray-700">
						La liste des supports
					</p>
				</div>
				{
					// If the user is not connected or userConnected is not TRAINER, we display a message
					!userConnected ? null : (
						<div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
							<button
								type="button"
								onClick={openAddModal}
								className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
							>
								Ajouter une support
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
										Titre
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										De
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Pour
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Nombre de vote
									</th>
									<th
										scope="col"
										className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
									>
										Fait
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
								{supports.map((support) => {
									return (
										<tr key={support.id}>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
												{support.title}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
												{support.user.name}
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
												{support.session.title}
											</td>
											<td className="flex gap-3 pt-3 text-center justify-center">
												<button
													onClick={() =>
														handleVoteSupport(
															support.id,
															"like"
														)
													}
												>
													<PlusCircleIcon className="w-5 h-5 text-green-500" />
												</button>
												{support.like}
												<button
													onClick={() =>
														handleVoteSupport(
															support.id,
															"dislike"
														)
													}
												>
													<MinusCircleIcon className="w-5 h-5 text-red-500" />
												</button>
											</td>
											<td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0 text-center">
												<button
													onClick={() => {
														handleLikeSupport(
															support.id
														);
													}}
												>
													{support.checked ? (
														<CheckIcon className="w-5 h-5 text-green-500" />
													) : (
														<XCircleIcon className="w-5 h-5 text-red-500" />
													)}
												</button>
											</td>
											<td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
												{userConnected?.role ===
													"TRAINER" && (
													<>
														<button
															className="text-indigo-600 hover:text-indigo-900 ml-4"
															onClick={() =>
																openEditModal(
																	support
																)
															}
														>
															<PencilIcon className="w-5 h-5" />
														</button>
														<button
															className="text-red-600 hover:text-red-900 ml-4"
															onClick={() => {
																handleDeleteSupport(
																	support.id
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
										{editingSupport
											? "Modifier la support"
											: "Ajouter une support"}
									</h3>
									<div className="mt-2">
										<input
											type="text"
											className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
											placeholder="Titre de la support"
											value={newSupportTitle}
											onChange={(e) =>
												setNewSupportTitle(
													e.target.value
												)
											}
										/>
									</div>
									<select
										name="session"
										id="session"
										onChange={handleSelectChange}
										className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
									>
										{sessions.map((session) => (
											<option
												value={session.id}
												key={session.id}
											>
												{session.title}
											</option>
										))}
									</select>
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
										editingSupport
											? handleEditsupport
											: handleAddSupport
									}
								>
									{editingSupport ? "Modifier" : "Ajouter"}
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</div>
	);
}

export default SupportList;
