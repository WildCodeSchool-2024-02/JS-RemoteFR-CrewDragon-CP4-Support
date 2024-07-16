import { toast } from "react-toastify";

export const toasts = {
	success: (message) => {
		toast.success(message);
	},
	error: (message) => {
		toast.error(message);
	},
	loading: (message) => {
		toast.info(message);
	},
};

// Usage:
// import { toasts } from "./services/toasts";
// toasts.success("User created successfully");
