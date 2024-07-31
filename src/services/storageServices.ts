import {MMKV} from 'react-native-mmkv';

export const storageServices = new MMKV();

enum STORAGE_KEYS {
  IS_LOGGED_IN = 'IS_LOGGED_IN',
}
const login = () => {
  storageServices.set(STORAGE_KEYS.IS_LOGGED_IN, true);
};

const isLoggedIn = () => {
  storageServices.getBoolean(STORAGE_KEYS.IS_LOGGED_IN);
};

const logout = () => {
  storageServices.delete(STORAGE_KEYS.IS_LOGGED_IN);
};

export default {login, isLoggedIn, logout};
