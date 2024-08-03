import {
  CheckEmailReq,
  CheckUsernameReq,
  CheckValidRes,
  FeedsReq,
  LoginReq,
  LoginRes,
  PostDetailReq,
  PostPropsRes,
  RegisterReq,
  RegisterRes,
  TopicsMasterPropsRes,
} from '@utils/props';
import {
  ApiResponse,
  createApiInstance,
  getRequest,
  postRequest,
} from './httprequester';

const apiDev = createApiInstance('https://develop.investly.id/api');
const api = createApiInstance('https://api.investly.id/api');

export const checkEmail = async (
  data: CheckEmailReq,
): Promise<ApiResponse<CheckValidRes | undefined>> => {
  return await postRequest(apiDev, '/auth/v1/email/check', data);
};

export const checkUsername = async (
  data: CheckUsernameReq,
): Promise<ApiResponse<CheckValidRes | undefined>> => {
  return await getRequest(
    apiDev,
    `/social/v1/public/username/${data.username}`,
    data,
  );
};

export const register = async (
  data: RegisterReq,
): Promise<ApiResponse<RegisterRes | undefined>> => {
  return await postRequest(apiDev, '/auth/v4/register', data);
};
export const login = async (
  data: LoginReq,
): Promise<ApiResponse<LoginRes | undefined>> => {
  return await postRequest(apiDev, '/auth/v2/login', data);
};

export const fetchFeed = async (
  data: FeedsReq,
): Promise<ApiResponse<PostPropsRes | undefined>> => {
  return await getRequest(
    api,
    `/social/v2/feed?sort_by=${data.sort}&page=${data.page}&perpage=${data.size}`,
    data,
  );
};

export const fetchFeedDev = async (
  data: FeedsReq,
): Promise<ApiResponse<PostPropsRes | undefined>> => {
  return await getRequest(
    apiDev,
    `/social/v2/feed?sort_by=${data.sort}&page=${data.page}&perpage=${data.size}`,
    data,
  );
};
export const fetchPostById = async (
  data: PostDetailReq,
): Promise<ApiResponse<PostPropsRes | undefined>> => {
  return await getRequest(api, `/social/v1/public/post/${data.post_id}`, data);
};

export const fetchTopics = async (): Promise<
  ApiResponse<TopicsMasterPropsRes | undefined>
> => {
  return await getRequest(api, '/social/v1/public/masterdata/topic');
};

export default {
  checkEmail,
  checkUsername,
  login,
  register,
  fetchFeed,
  fetchTopics,
  fetchFeedDev,
};
