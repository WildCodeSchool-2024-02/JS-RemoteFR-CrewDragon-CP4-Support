import { useState } from "react";
import { login } from "../services/axios";
import { useUser } from "../contexts/userContext";
import { Link } from "react-router-dom";
function Login() {
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
		e.preventDefault();
		const response = await login(user);
		handleLogin(response.data);
	};

	return (
		<section>
			<h1>Je suis le composant : `Login`</h1>
			<form onSubmit={handleSubmit}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={user.email}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="********"
					value={user.password}
					onChange={handleChange}
				/>
				<button type="submit">Login</button>
			</form>
		</section>
	);
}

export default Login;
