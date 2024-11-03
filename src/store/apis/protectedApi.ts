import { apiSlice } from './apiSlice';

import { IRefreshResponse } from '../../interfaces/refresh/refresh.interface';
import {
  GetPdfFile,
  REFRESH_PATH
} from '../../utils/consts/apiConsts/apiConsts';

export const protectedApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    GetPdfFile: builder.query<any, { filename: string }>({
      query: ({ filename }) => ({
        url: GetPdfFile.replace(':filename', filename.toString()),
        method: 'GET'
      })
    }),

    refreshToken: builder.mutation<IRefreshResponse, void>({
      query: () => ({
        //headers: 'inject_token',
        url: REFRESH_PATH,
        method: 'GET'
      })
    })
  })
});

export const { useGetPdfFileQuery } = protectedApiSlice;
