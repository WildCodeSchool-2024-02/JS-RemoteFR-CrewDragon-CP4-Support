import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toasts } from "../services/toasts";
import { register } from "../services/axios";
function Register() {
	const nav = useNavigate();
	const [user, setUser] = useState({
		email: "tony@admin.com",
		name: "tony",
		password: "tony",
	});

	const handleChange = (e) => {
		setUser({
			...user,
			[e.target.name]: e.target.value,
		});
	};

	const handleSubmit = async (e) => {
		try {
			e.preventDefault();
			await register(user);
			toasts.success("Utilisateur créé avec succès");
			nav("/login");
		} catch (error) {
			toasts.error("Erreur lors de la création de l'utilisateur");
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Espace d'inscription
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form className="space-y-6" onSubmit={handleSubmit}>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Adresse email
								</label>
								<div className="mt-2">
									<input
										id="name"
										name="name"
										type="text"
										required
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={user.name}
										onChange={handleChange}
									/>
								</div>
							</div>
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Votre nom
								</label>
								<div className="mt-2">
									<input
										id="email"
										name="email"
										type="email"
										required
										autoComplete="email"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={user.email}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div>
								<label
									htmlFor="password"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Mot de passe
								</label>
								<div className="mt-2">
									<input
										id="password"
										name="password"
										type="password"
										required
										autoComplete="current-password"
										className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
										value={user.password}
										onChange={handleChange}
									/>
								</div>
							</div>

							<div>
								<button
									type="submit"
									className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
								>
									Sign in
								</button>
							</div>
						</form>
					</div>

					<p className="mt-10 text-center text-sm text-gray-500">
						J'ai déjà un compte ?{" "}
						<Link
							to="/login"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							Se connecter
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default Register;
