import { Role } from '../../enums/UserRole.enum';
import { User } from '../../models/User';

export interface ISignUpResponseApi {
  user: User;

  backendTokens: {
    accessToken: string;
    refreshToken: string;
  };
}

export interface ISignUpResponseClient {
  user: User;
  accesstoken: string;
  refreshtoken: string;
}

export function mapLoginResponse(
  response: ISignUpResponseApi
): ISignUpResponseClient {
  return {
    user: response.user,
    accesstoken: response.backendTokens.accessToken,
    refreshtoken: response.backendTokens.refreshToken
  };
}

export interface ISignUpRequest {
  email: string;
  phoneNumber: number;
  role: Role;
  password: string;
}

export interface IEmailVerifResponse {
  status: string;
  message: string;
  data?: {
    email: string;
  };
}
