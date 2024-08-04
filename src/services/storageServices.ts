import {MMKV} from 'react-native-mmkv';

const STORAGE_KEYS = {
  IS_LOGGED_IN: 'IS_LOGGED_IN',
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  REFRESH_TOKEN: 'REFRESH_TOKEN',
  IS_VERIFIED: 'IS_VERIFIED',
  TOKEN_EXPIRY: 'TOKEN_EXPIRY',
};

const storageService = new MMKV();

function setLoginData(loginResponse: {
  access_token: string;
  refresh_token: string;
  is_verified: boolean;
  expired_at: string;
}) {
  storageService.set(STORAGE_KEYS.IS_LOGGED_IN, true);
  storageService.set(STORAGE_KEYS.ACCESS_TOKEN, loginResponse.access_token);
  storageService.set(STORAGE_KEYS.REFRESH_TOKEN, loginResponse.refresh_token);
  storageService.set(STORAGE_KEYS.IS_VERIFIED, loginResponse.is_verified);
  storageService.set(STORAGE_KEYS.TOKEN_EXPIRY, loginResponse.expired_at);
}

function getLoginData() {
  return {
    isLoggedIn: storageService.getBoolean(STORAGE_KEYS.IS_LOGGED_IN) || false,
    accessToken: storageService.getString(STORAGE_KEYS.ACCESS_TOKEN) || '',
    refreshToken: storageService.getString(STORAGE_KEYS.REFRESH_TOKEN) || '',
    isVerified: storageService.getBoolean(STORAGE_KEYS.IS_VERIFIED) || false,
    tokenExpiry: storageService.getString(STORAGE_KEYS.TOKEN_EXPIRY) || '',
  };
}

function clearLoginData() {
  Object.values(STORAGE_KEYS).forEach(key => storageService.delete(key));
}

export default {setLoginData, getLoginData, clearLoginData};
