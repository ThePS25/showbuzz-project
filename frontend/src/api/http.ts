import axios, { AxiosHeaders } from "axios";
import { message } from "antd";

import { authService } from "../auth/auth-service";

const paramsSerializer = (params: { [key: string]: string }) =>
  Object.entries(params)
    .map(([key, value]) => key + "=" + (value || ""))
    .join("&") || "";

const http = axios.create({ paramsSerializer });

http.interceptors.request.use(
  (config) => {
    // Ensure headers are initialized and cast to AxiosHeaders
    if (!config.headers) {
      config.headers = new AxiosHeaders();
    }

    config.headers.set("Content-Type", "application/json");
    config.headers.set("Access-Control-Allow-Origin", "*");
    config.headers.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );

    // Add authorization token if present
    const token = localStorage.getItem("user-access-token");
    if (token) {
      config.headers.set("Authorization", `Bearer ${token}`);
    }

    return config;
  },
  (error) => Promise.reject(error)
);

http.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401 && authService.isAuthenticated()) {
      message.error({
        content: "User not authorized!",
        key: "unauthorized",
        duration: 2,
      });
      authService.logout();
    }
    throw error;
  }
);

export default http;
