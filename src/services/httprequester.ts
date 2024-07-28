import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';

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
): Promise<ApiResponse<T>> => {
  const config: AxiosRequestConfig =
    params && Object.keys(params).length > 0 ? {params} : {};
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
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.post(url, data);
  return {
    status: response.status,
    data: response.data,
  };
};

const putRequest = async <T>(
  api: AxiosInstance,
  url: string,
  data = {},
): Promise<ApiResponse<T>> => {
  const response: AxiosResponse<T> = await api.put(url, data);
  return {
    status: response.status,
    data: response.data,
  };
};

export {createApiInstance, getRequest, postRequest, putRequest};
