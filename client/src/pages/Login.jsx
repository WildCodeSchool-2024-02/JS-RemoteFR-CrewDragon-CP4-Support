import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/axios";
import { useUser } from "../contexts/userContext";
import { toasts } from "../services/toasts";
function Login() {
	const nav = useNavigate();
	const { handleLogin } = useUser();
	const [user, setUser] = useState({
		email: "tony@admin.com",
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
			const response = await login(user);
			handleLogin(response.data);
			toasts.success(`Ravie de te revoir ${response.data.name} 👋`);
			nav("/");
		} catch (error) {
			toasts.error("Erreur lors de la connexion");
		}
	};

	return (
		<>
			<div className="flex min-h-full flex-1 flex-col justify-center py-12 sm:px-6 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-md">
					<h2 className="mt-6 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
						Espace de Connexion
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
					<div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
						<form onSubmit={handleSubmit} className="space-y-6">
							<div>
								<label
									htmlFor="email"
									className="block text-sm font-medium leading-6 text-gray-900"
								>
									Adresse email
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
						Pas de compte ?{" "}
						<Link
							to="/register"
							className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
						>
							S'inscrire
						</Link>
					</p>
				</div>
			</div>
		</>
	);
}

export default Login;
