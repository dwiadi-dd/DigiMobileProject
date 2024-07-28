import {CheckEmailReq, CheckEmailRes, LoginReq, LoginRes} from '@utils/props';
import {ApiResponse, createApiInstance, postRequest} from './httprequester';

const api = createApiInstance('https://develop.investly.id/api');

export const checkEmail = async (
  data: CheckEmailReq,
): Promise<ApiResponse<CheckEmailRes | undefined>> => {
  return await postRequest(api, '/auth/v1/email/check', data);
};

export const login = async (
  data: LoginReq,
): Promise<ApiResponse<LoginRes | undefined>> => {
  return await postRequest(api, '/auth/v2/login', data);
};

export const fetchFeed = async (
  data: LoginReq,
): Promise<ApiResponse<LoginRes | undefined>> => {
  return await postRequest(api, '/auth/v2/login', data);
};

export default {
  checkEmail,
  login,
  fetchFeed,
};
