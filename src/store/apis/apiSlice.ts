import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Backend_URL } from '../../utils/consts/apiConsts/apiConsts';
import { getAccessToken } from '../../utils/helpers/SensitiveStorageHF';

import { baseQueryWithReauth, fetchRefreshToken } from './baseQueryWithReauth';

const fetchAccessToken = async (): Promise<string | null> => {
  const token = await getAccessToken();
  if (token != null) {
    return token;
  }

  return null;
};

export const baseQuery = fetchBaseQuery({
  baseUrl: Backend_URL,

  prepareHeaders: async (headers) => {
    const token = (await fetchAccessToken()) || (await fetchRefreshToken());
    if (token != null) {
      headers.set('authorization', `Bearer ${token}`);
    }
    headers.set('if-none-match', '');
    return headers;
  }
});

export const apiSlice = createApi({
  reducerPath: 'apiSlice',
  baseQuery: baseQueryWithReauth,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  endpoints: (builder) => ({}),
  tagTypes: [
    'UsersDiseases',
    'MeasureHistory',
    'Meals',
    'MealsOfPlan',
    'MeasuresBilan',
    'RecipeMeals',
    'userCurrentPlan',
    'userDoctorChats',
    'chatConversations'
  ]
});
