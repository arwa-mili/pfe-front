import SensitiveInfo from 'react-native-sensitive-info';
import {
  constants,
  keyChainOptions
} from '../consts/SensitiveStorageConsts/consts';

export async function getItem<T>(key: string): Promise<T | null> {
  const value = await SensitiveInfo.getItem(key, keyChainOptions);
  return value ? JSON.parse(value)?.[key] || null : null;
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  SensitiveInfo.setItem(key, JSON.stringify({ [key]: value }), keyChainOptions);
}
export async function removeItem(key: string): Promise<void> {
  SensitiveInfo.deleteItem(key, keyChainOptions);
}

export const getRefreshToken = () => getItem<string>(constants.RTOKEN_KEY);
export const getAccessToken = () => getItem<string>(constants.ATOKEN_KEY);
export const removeAccessToken = () => removeItem(constants.ATOKEN_KEY);
export const removeRefreshToken = () => removeItem(constants.RTOKEN_KEY);

export const setAccessToken = (value: string) =>
  setItem<string>(constants.ATOKEN_KEY, value);
export const setRefreshToken = (value: string) =>
  setItem<string>(constants.RTOKEN_KEY, value);

/*
export async function getItem<T>(key: string): Promise<T | null> {
  const value = await SensitiveInfo.getItem(key, keyChainOptions);
  return value ? JSON.parse(value)?.[key] || null : null;
}

export async function setItem<T>(key: string, value: T): Promise<void> {
  SensitiveInfo.setItem(key, JSON.stringify(value), keyChainOptions);

}



export async function removeItem(...keys: string[]): Promise<void> {
  for (const key of keys) {
    await SensitiveInfo.deleteItem(key, keyChainOptions);
  }
}


export const getAccessToken =  (): Promise<string | null> => {
  const atoken =  getItem<string>(ATOKEN_KEY);

  return atoken;
};



export const getRefreshToken = (): Promise<string | null> => {
  const rtoken =  getItem<string>(RTOKEN_KEY);

  return rtoken;
};

export const removeTokens = async (): Promise<void> => {
   removeItem(RTOKEN_KEY, ATOKEN_KEY);
};

export const setTokens = async (atoken?: string, rtoken?: string): Promise<void> => {

  if (atoken !== undefined) {
    await setItem<string>(ATOKEN_KEY, atoken);

  }
  if (rtoken !== undefined) {
    await setItem<string>(RTOKEN_KEY, rtoken);



  }
};

*/
