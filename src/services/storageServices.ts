import {MMKV} from 'react-native-mmkv';

const STORAGE_KEYS = {
  IS_LOGGED_IN: 'IS_LOGGED_IN',
};

const storageservice = new MMKV();

function login() {
  storageservice.set(STORAGE_KEYS.IS_LOGGED_IN, true);
}

function isLoggedIn() {
  return storageservice.getBoolean(STORAGE_KEYS.IS_LOGGED_IN);
}

function logout() {
  storageservice.delete(STORAGE_KEYS.IS_LOGGED_IN);
}

export default {login, isLoggedIn, logout};
