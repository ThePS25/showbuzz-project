import { api } from "../api";

export const authService = {
	isAuthenticated() {
		return !!localStorage.getItem("user-access-token");
	},

	login(data: { email: string; password: string; remember_me: boolean }) {
		return api.post({ path: "/users/login", formdata: data, service: "auth" }).then((response) => {
			if (response.data?.data?.token) {
				localStorage.setItem("user-access-token", response.data?.data?.token);
			}
			if (!localStorage.getItem("isStaticWeatherData")) {
				localStorage.setItem("isStaticWeatherData", "true");
			}
			return response;
		});
	},

	logout() {
		const isMenuCollapsed = localStorage.getItem("menuCollapsed");
		localStorage.clear();
		localStorage.setItem("menuCollapsed", isMenuCollapsed === "true" ? "true" : "false");
		window.location.assign("/");
	},
};
