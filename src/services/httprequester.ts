import axios from 'axios';

const api = axios.create({
  baseURL: 'https://develop.investly.id/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const getRequest = async (url: string, params?: Record<string, any>) => {
  try {
    const config = params && Object.keys(params).length > 0 ? {params} : {};
    const response = await api.get(url, config);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const postRequest = async (url: string, data = {}) => {
  try {
    const response = await api.post(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

export const putRequest = async (url: string, data = {}) => {
  try {
    const response = await api.put(url, data);
    return response.data;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error: any) => {
  if (error.response) {
    const {status, data} = error.response;
    console.error(`Error ${status}: ${data?.messages || error.message}`);
    throw new Error(data?.messages || 'An error occurred');
  } else if (error.request) {
    console.error('No response received:', error.request);
    throw new Error('No response from server. Please try again later.');
  } else {
    console.error('Error', error.message);
    throw new Error(error.message);
  }
};
