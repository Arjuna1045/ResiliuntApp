import AsyncStorage from '@react-native-async-storage/async-storage';

const AUTH_TOKEN = 'AUTH_TOKEN';
const USER_TYPE = 'USER_TYPE';
const UNAME = 'UNAME';
const PASWD = 'PASWD';
const ROLE = 'ROLE';
const TOKEN_INFO = 'TOKEN_INFO';

export const setROLE = async val => {
  try {
    return await AsyncStorage.setItem(ROLE, JSON.stringify(val));
  } catch (e) {}
};

export const getROLE = async () => {
  try {
    return await AsyncStorage.getItem(ROLE);
  } catch (e) {
    // saving errorr
  }
  return '';
};
export const saveToken = async val => {
  try {
    return await AsyncStorage.setItem(AUTH_TOKEN, JSON.stringify(val));
  } catch (e) {
    // saving error
  }
};

export const saveUserType = async val => {
  try {
    return await AsyncStorage.setItem(USER_TYPE, JSON.stringify(val));
  } catch (e) {
    // saving error
  }
};
export const setUname = async val => {
  try {
    return await AsyncStorage.setItem(UNAME, JSON.stringify(val));
  } catch (e) {}
};

export const getUname = async () => {
  try {
    return await AsyncStorage.getItem(UNAME);
  } catch (e) {
    // saving errorr
  }
  return '';
};

export const setPswd = async val => {
  try {
    return await AsyncStorage.setItem(PASWD, JSON.stringify(val));
  } catch (e) {}
};

export const getPswd = async () => {
  try {
    return await AsyncStorage.getItem(PASWD);
  } catch (e) {
    // saving errorr
  }
  return '';
};
export const getToken = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(AUTH_TOKEN);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // saving errorr
  }
  return null;
};

export const getUserType = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem(USER_TYPE);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    // saving errorr
  }
  return null;
};

export const removeUser = async () => {
  const keys = [AUTH_TOKEN,TOKEN_INFO];
  try {
    await AsyncStorage.multiRemove(keys);
  } catch (e) {
    // remove error
  }
};


export const setTokenInfo = async (val) => {
  try {
    return await AsyncStorage.setItem(TOKEN_INFO, JSON.stringify(val));
  } catch (e) {}
};

export const getTokenInfo = async () => {
  try {
    return await AsyncStorage.getItem(TOKEN_INFO);
  } catch (e) {
    // saving errorr
  }
  return '';
};