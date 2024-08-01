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

const api = createApiInstance('https://develop.investly.id/api');

export const checkEmail = async (
  data: CheckEmailReq,
): Promise<ApiResponse<CheckValidRes | undefined>> => {
  return await postRequest(api, '/auth/v1/email/check', data);
};

export const checkUsername = async (
  data: CheckUsernameReq,
): Promise<ApiResponse<CheckValidRes | undefined>> => {
  return await getRequest(
    api,
    `/social/v1/public/userbane/${data.username}`,
    data,
  );
};

export const login = async (
  data: LoginReq,
): Promise<ApiResponse<LoginRes | undefined>> => {
  return await postRequest(api, '/auth/v2/login', data);
};

export const register = async (
  data: RegisterReq,
): Promise<ApiResponse<RegisterRes | undefined>> => {
  return await postRequest(api, '/auth/v4/register', data);
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
  login,
  fetchFeed,
  fetchTopics,
};
