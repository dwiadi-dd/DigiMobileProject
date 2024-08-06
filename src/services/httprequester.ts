import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import storageService from './storageServices'; // Import your storage service

const createApiInstance = (baseURL: string): AxiosInstance => {
  const instance = axios.create({
    baseURL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.response.use(
    response => response,
    error => {
      if (error.response) {
        return error.response;
      } else {
        return error.response;
      }
    },
  );

  return instance;
};

export interface ApiResponse<T> {
  status: number;
  data: T | undefined;
}
const getRequest = async <T>(
  api: AxiosInstance,
  url: string,
  params?: Record<string, any>,
  requiresAuth: boolean = false,
): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig = params ? {params} : {};
  if (requiresAuth) {
    const token = storageService.getLoginData().accessToken;
    config.headers = {...config.headers, Authorization: `Bearer ${token}`};
  }
  const response: AxiosResponse<T> = await api.get(url, config);
  return {
    status: response.status,
    data: response.data,
  };
};

const postRequest = async <T>(
  api: AxiosInstance,
  url: string,
  data = {},
  requiresAuth: boolean = false,
): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig = {};
  if (requiresAuth) {
    const token = storageService.getLoginData().accessToken;
    config.headers = {Authorization: `Bearer ${token}`};
  }
  const response: AxiosResponse<T> = await api.post(url, data, config);
  return {
    status: response.status,
    data: response.data,
  };
};

const postRequestFormData = async <T>(
  api: AxiosInstance,
  url: string,
  data = {},
  requiresAuth: boolean = false,
): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  if (requiresAuth) {
    const token = storageService.getLoginData().accessToken;
    config.headers = {...config.headers, Authorization: `Bearer ${token}`};
  }

  const formData = new FormData();
  Object.keys(data).forEach(key => {
    formData.append(key, (data as Record<string, any>)[key]);
  });

  const response: AxiosResponse<T> = await api.post(url, formData, config);
  return {
    status: response.status,
    data: response.data,
  };
};
const putRequest = async <T>(
  api: AxiosInstance,
  url: string,
  data = {},
  requiresAuth: boolean = false,
): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig = {};
  if (requiresAuth) {
    const token = storageService.getLoginData().accessToken;
    config.headers = {Authorization: `Bearer ${token}`};
  }
  const response: AxiosResponse<T> = await api.put(url, data, config);
  return {
    status: response.status,
    data: response.data,
  };
};

export {
  createApiInstance,
  getRequest,
  postRequest,
  putRequest,
  postRequestFormData,
};
