import { ILoginRequest } from '../../../interfaces/auth/login.interface';
import {
  ISignUpResponseClient,
  ISignUpResponseApi,
  mapLoginResponse,
  IEmailVerifResponse,
  ISignUpRequest
} from '../../../interfaces/auth/signup.interface';
import { excluded_endpoints } from '../../../utils/consts/apiConsts/apiConsts';
import { apiSlice } from '../apiSlice';

export const authApiSlice = apiSlice.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    login: builder.mutation<ISignUpResponseClient, ILoginRequest>({
      query: (credentials) => ({
        url: excluded_endpoints.LOGIN_PATH,
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: ISignUpResponseApi) =>
        mapLoginResponse(response)
    }),
    signup: builder.mutation<IEmailVerifResponse, ISignUpRequest>({
      query: (credentials) => ({
        url: excluded_endpoints.SIGNUPUSER_PATH,
        method: 'POST',
        body: credentials
      })
    }),
    verifEmail: builder.mutation<
      ISignUpResponseClient,
      { email: string; code: string }
    >({
      query: (credentials) => ({
        url: excluded_endpoints.VERIFYCODE_PATH,
        method: 'POST',
        body: credentials
      }),
      transformResponse: (response: ISignUpResponseApi) =>
        mapLoginResponse(response)
    }),
    resetPassword: builder.mutation<void, { email: string; password: string }>({
      query: (credentials) => ({
        url: excluded_endpoints.RESET_PASSWORD,
        method: 'POST',
        body: credentials
      })
    }),
    forgetPasswordReset: builder.mutation<void, { email: string; otp: string }>(
      {
        query: ({ email, otp }) => ({
          url: excluded_endpoints.FORGET_PASSWORD_RESET.replace(
            ':email',
            email.toString()
          ).replace(':otp', otp.toString()),
          method: 'POST'
        })
      }
    )
  })
});

export const {
  useVerifEmailMutation,
  useResetPasswordMutation,
  useForgetPasswordResetMutation,
  useLoginMutation,
  useSignupMutation
} = authApiSlice;
