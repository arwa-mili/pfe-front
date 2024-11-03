import React, { useState } from 'react';
import { useAppDispatch } from '../../../../hooks/hooks';
import { setUser } from '../../../../hooks/Slices/AuthSlice';
import VerifyEmail from './VerifyEmail';
import {
  setAccessToken,
  setRefreshToken
} from '../../../../utils/helpers/SensitiveStorageHF';
import {
  onLoginFalse,
  setCurrentUserInfos
} from '../../../../hooks/Slices/UserSlice';
import {
  Login_SCREEN,
  Verif_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../../navigation/routes/AuthStack';
import {
  useForgetPasswordResetMutation,
  useVerifEmailMutation
} from '../../../../store/apis/authApis/authApis';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { handleCodeVerifError } from './hepler/SendCodeErrorHandling';

type VerifProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof Verif_SCREEN
>;

const VerifyEmailContainer = ({ navigation, route }: VerifProps) => {
  const [otpValue, setOtpValue] = useState<string[]>([]);
  const { email, reset } = route.params;

  const [verifMutation] = useVerifEmailMutation();
  const [resetPassword] = useForgetPasswordResetMutation();

  const dispatch = useAppDispatch();

  const handleOtpChange = (value: string[]) => {
    setOtpValue(value);
  };

  const resendCode = async () => {};

  const handleSubmit = async () => {
    console.log(email);
    console.log(otpValue);
    try {
      if (reset === false) {
        const result = await verifMutation({
          email,
          code: otpValue.join('')
        }).unwrap();

        if (result) {
          const token = result.accesstoken;
          const rtoken = result.refreshtoken;
          //const gender = result.user.gender === 0 ? 'Female' : 'Male';

          dispatch(
            setUser({
              isFirstSignedUp: true,
              token: token,
              rtoken: rtoken,
              isauthenticated: true
            })
          );
          dispatch(
            setCurrentUserInfos({
              email: result.user.email,
              id: result.user.id,
              phoneNumber: result.user.phoneNumber
            }),
            dispatch(onLoginFalse())
          );
          await setAccessToken(token);
          await setRefreshToken(rtoken);
          //navigation.navigate(CompleteProfileStackS);
        }
      } else {
        await resetPassword({
          email,
          otp: otpValue.join('')
        }).unwrap();
        navigation.navigate(Login_SCREEN);
      }
    } catch (error) {
      if (isErrorInterface(error) && error.status === ErrorCode.UNAUTHORIZED) {
        const mappederror = mapErrorResponse(error);
        await handleCodeVerifError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    }
  };
  return (
    <>
      <VerifyEmail
        otpValue={otpValue}
        onOtpChange={handleOtpChange}
        handleSubmit={handleSubmit}
        resendCode={resendCode}
      />
    </>
  );
};

export default VerifyEmailContainer;
