import { useState } from "react";
import { login } from "../services/axios";
function Login() {
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
		console.log(response.data);
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
