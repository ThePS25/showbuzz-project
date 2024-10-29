import http from "./http";

const getServicePath = (service: string) => {
  switch (service) {
    case "auth":
      return process.env.REACT_APP_AUTH_SERVICE_BASE_URL;
    case "job":
      return process.env.REACT_APP_JOB_SERVICE_BASE_URL;
    case "attendance":
      return process.env.REACT_APP_ATTENDANCE_SERVICE_BASE_URL;
    case "finance":
      return process.env.REACT_APP_FINANCE_SERVICE_BASE_URL;
    default:
      return "";
  }
};

export type ApiServiceType = "auth" | "job" | "finance" | "attendance" | "";

interface propsType {
  path: string;
  formdata?: any;
  params?: { [key: string]: string | number | boolean };
  service?: ApiServiceType;
  config?: { [key: string]: any };
}

interface postPropsType extends Omit<propsType, "formdata"> {
  formdata?: any;
}

function get({ path, params = {}, service = "", config = {} }: propsType) {
  const finalPath = `${getServicePath(service)}${path}`;

  return http.get(finalPath, { ...config, params });
}

function post({
  path,
  formdata = {},
  params = {},
  service = "",
  config = {},
}: postPropsType) {
  const finalPath = `${getServicePath(service)}${path}`;
  return http.post(finalPath, formdata, { ...config, params });
}

function patch({
  path,
  formdata = {},
  params = {},
  service = "",
  config = {},
}: postPropsType) {
  const finalPath = `${getServicePath(service)}${path}`;

  return http.patch(finalPath, formdata, { ...config, params });
}

function put({
  path,
  formdata = {},
  params = {},
  service = "",
  config = {},
}: postPropsType) {
  const finalPath = `${getServicePath(service)}${path}`;

  return http.put(finalPath, formdata, { ...config, params });
}

function remove({ path, params = {}, service = "", config = {} }: propsType) {
  const finalPath = `${getServicePath(service)}${path}`;

  return http.delete(finalPath, { ...config, params });
}

export const api = { get, post, patch, put, remove };
