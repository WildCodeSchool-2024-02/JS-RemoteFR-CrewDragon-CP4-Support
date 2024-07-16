import { useContext, createContext, useState, useMemo } from "react";

const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
	const [user, setUser] = useState(null);

	const handleLogout = () => {
		setUser(null);
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
