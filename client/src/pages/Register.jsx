import { useState } from "react";
import { register } from "../services/axios";
function Register() {
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
		e.preventDefault();
		const response = await register(user);
		console.log(response);
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
					type="text"
					name="name"
					placeholder="Name"
					value={user.name}
					onChange={handleChange}
				/>
				<input
					type="password"
					name="password"
					placeholder="********"
					value={user.password}
					onChange={handleChange}
				/>
				<button type="submit">Créer un compte</button>
			</form>
		</section>
	);
}

export default Register;
