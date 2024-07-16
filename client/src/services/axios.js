import axios from "axios";

const instance = axios.create({
	baseURL:
		`${import.meta.env.VITE_API_URL}/api` || "http://localhost:5500/api",
	withCredentials: true,
});

/**
 * All routes related to auth
 */
export const register = async (user) => {
	return await instance.post("/register", user);
};

export const login = async (user) => {
	return await instance.post("/login", user);
};

/**
 * All routes related to sessions
 */
export const createSession = async (session) => {
	return await instance.post("/sessions", session);
};

export const getSessions = async () => {
	return await instance.get("/sessions");
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
	return await instance.post("/supports", support);
};

export const getSupports = async () => {
	return await instance.get("/supports");
};

export const getSupportById = async (id) => {
	return await instance.get(`/supports/${id}`);
};

export const updateSupport = async (id, support) => {
	return await instance.put(`/supports/${id}`, support);
};

export const deleteSupport = async (id) => {
	return await instance.delete(`/supports/${id}`);
};

export const isLikeSupport = async (id) => {
	return await instance.post(`/supports/${id}/like`);
};

export const isDislikeSupport = async (id) => {
	return await instance.post(`/supports/${id}/dislike`);
};

export const isDoneSupport = async (id) => {
	return await instance.post(`/supports/${id}/is_done`);
};
