import {postRequest} from './httprequester';
import {CheckEmailReq, CheckEmailRes, LoginReq, LoginRes} from './props';

export const checkEmail = async (
  data: CheckEmailReq,
): Promise<CheckEmailRes> => {
  return await postRequest('/auth/v1/email/check', data);
};

export const login = async (data: LoginReq): Promise<LoginRes> => {
  return await postRequest('/auth/v2/login', data);
};

export const fetchFeed = async (data: LoginReq): Promise<LoginRes> => {
  return await postRequest('/auth/v2/login', data);
};
