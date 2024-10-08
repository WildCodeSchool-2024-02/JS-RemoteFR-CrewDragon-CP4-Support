import { useContext, createContext, useState, useMemo } from "react";
import { logout } from "../services/axios";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const handleLogout = () => {
		logout();
		setUser(null);
		window.location.href = "/";
	};

	const handleLogin = (user) => {
		setUser(user);
	};

	const value = useMemo(() => ({ user, handleLogin, handleLogout }), [user]);

	return (
		<UserContext.Provider value={value}>{children}</UserContext.Provider>
	);
};

export const useUser = () => {
	return useContext(UserContext);
};
