import { BaseQueryFn } from '@reduxjs/toolkit/query';
import { IRefreshResponse } from '../../interfaces/refresh/refresh.interface';
import {
  Backend_URL,
  excluded_endpoints,
  Users_URL,
  REFRESH_PATH
} from '../../utils/consts/apiConsts/apiConsts';
import {
  getRefreshToken,
  removeAccessToken,
  setAccessToken,
  setRefreshToken
} from '../../utils/helpers/SensitiveStorageHF';
import { baseQuery } from './apiSlice';
import { ErrorCode } from '../../utils/consts/errorCodes/errorCodes';

export const fetchRefreshToken = async (): Promise<string | null> => {
  const rtoken = await getRefreshToken();
  if (rtoken != null) {
    return rtoken;
  }
  return null;
};

export const baseQueryWithReauth: BaseQueryFn = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result?.error?.status === ErrorCode.UNAUTHORIZED) {
    const url =
      Backend_URL + '/auth/' + api.endpoint ||
      Backend_URL + '/nutrition-plans' + api.endpoint ||
      Backend_URL + '/users' + api.endpoint;
    const excludedEndpoints = [
      excluded_endpoints.LOGIN_PATH,
      Users_URL,
      excluded_endpoints.SIGNUPUSER_PATH,
      excluded_endpoints.VERIFYCODE_PATH,
      excluded_endpoints.VERIFEMAIL
    ];

    if (!excludedEndpoints.includes(url)) {
      await removeAccessToken();
      const rtoken = await fetchRefreshToken();
      if (rtoken) {
        const headers = {
          Authorization: `Bearer ${rtoken}`
        };
        const refreshResult = await baseQuery(
          {
            url: REFRESH_PATH,
            method: 'GET',
            headers: headers
          },
          { ...api },
          extraOptions
        );

        if (refreshResult?.data) {
          const token = (refreshResult.data as IRefreshResponse).accessToken;
          const reftoken = (refreshResult.data as IRefreshResponse)
            .refreshToken;
          await setAccessToken(token);
          await setRefreshToken(reftoken);

          result = await baseQuery(args, api, extraOptions);
        }
      }
    }
  }

  return result;
};
