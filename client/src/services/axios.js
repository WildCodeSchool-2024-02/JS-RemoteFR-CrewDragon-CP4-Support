import axios from "axios";

const instance = axios.create({
	baseURL: import.meta.env.VITE_API_URL || "http://localhost:5500",
	withCredentials: true,
});

/**
 * All routes related to auth
 */

export const register = async (user) => {
	return await instance.post("/api/register", user);
};

export const login = async (user) => {
	return await instance.post("/api/login", user);
};

/**
 * All routes related to sessions
 */
export const createSession = async (session) => {
	return await instance.post("/api/sessions", session);
};

export const getSessions = async () => {
	// send cookie token to authorize the request
	return await instance.get("/api/sessions");
};

export const getSessionById = async (id) => {
	return await instance.get(`/sessions/${id}`);
};

export const updateSession = async (id, session) => {
	return await instance.put(`/sessions/${id}`, session);
};

export const deleteSession = async (id) => {
	return await instance.delete(`/sessions/${id}`);
};

export const joinSession = async (id) => {
	return await instance.put(`/sessions/${id}/join`);
};

/**
 * All routes related to supports
 */

export const createSupport = async (support) => {
	return await instance.post("/api/supports", support);
};

export const getSupports = async () => {
	return await instance.get("/api/supports");
};

export const getSupportById = async (id) => {
	return await instance.get(`/supports/${id}`);
};
