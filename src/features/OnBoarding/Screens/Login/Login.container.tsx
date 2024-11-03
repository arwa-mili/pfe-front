import React, { useState } from 'react';
import LoginPresenter from './Login';
import { loadSplash, setUser } from '../../../../hooks/Slices/AuthSlice';
import { useAppDispatch } from '../../../../hooks/hooks';
import { ILoginRequest } from '../../../../interfaces/auth/login.interface';
import {
  setAccessToken,
  setRefreshToken
} from '../../../../utils/helpers/SensitiveStorageHF';
import { setCurrentUserInfos } from '../../../../hooks/Slices/UserSlice';

import { handleGenericError } from '../../../../utils/helpers/Errors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Login_SCREEN,
  ResetPassword_SCREEN,
  SignUpAs_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { AuthStackParamList } from '../../../../navigation/routes/AuthStack';
import {
  validateLoginHF,
  validatePasswordHF
} from '../../Utils/HelperFunctions/helper';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';

import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleLoginError } from './hepler/LoginErrorHandling';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import {
  setLoader,
  setLoaderFalse
} from '../../../../hooks/Slices/LoaderSlice';
import { useLoginMutation } from '../../../../store/apis/authApis/authApis';

type LoginProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof Login_SCREEN
>;

const LoginContainer = ({ navigation }: LoginProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginMutation] = useLoginMutation();
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isPassword, setIsPassword] = useState(true);
  // const laboMes = useAppSelector((state) => state.mesureLabo.measuresLabo);
  // console.log(laboMes);
  // const user = useAppSelector((state) => state.user);
  // console.log(user);
  const dispatch = useAppDispatch();

  const setPasswordInvisible = () => {
    if (isPassword) {
      setIsPassword(!isPassword);
    } else {
      setIsPassword(true);
    }
  };

  const navigateToSignUp = () => {
    navigation.navigate(SignUpAs_SCREEN);
  };

  const validateEmail = (text: string) => {
    setIsEmailValid(validateLoginHF(text));
    setEmail(text);
  };

  const validatePassword = (text: string) => {
    setIsPasswordValid(validatePasswordHF(text));
    setPassword(text);
  };

  const resetPasswordLink = async () => {
    navigation.navigate(ResetPassword_SCREEN);
  };

  const handleSubmit = async () => {
    let logindto: ILoginRequest;

    if (email.includes('@')) {
      logindto = {
        login: email,
        password
      };
    } else {
      const phoneNumber = parseInt(email);
      logindto = { login: phoneNumber, password };
    }
    try {
      dispatch(setLoader());

      const loginData = await loginMutation(logindto).unwrap();

      const token = loginData.accesstoken;
      const rtoken = loginData.refreshtoken;
      const userId = loginData.user.id;
      const email = loginData.user.email;
      const gender = loginData.user.gender === false ? 'Female' : 'Male';
      dispatch(
        setUser({
          token: token,
          rtoken: rtoken,
          isauthenticated: true,
          isFirstSignedUp: false
        })
      );
      dispatch(
        setCurrentUserInfos({
          email: email,
          id: userId,
          weight: loginData.user.weight,
          height: loginData.user.height,
          gender: gender,
          sportActivity: loginData.user.sport_activity,
          name: loginData.user.name,
          surname: loginData.user.surname,
          BMI: loginData.user.BMI,
          phoneNumber: loginData.user.phoneNumber,
          age: loginData.user.age,
          current_plan: loginData.user.current_plan,
          diseases_of_user: loginData.user.diseases,
          weekly_calories: loginData.user.weekly_calories,
          weekly_carbohydrates: loginData.user.weekly_carbohydrates,
          weekly_fats: loginData.user.weekly_fats,
          weekly_protein: loginData.user.weekly_protein,
          cardiohist: loginData.user.historycardio,
          diabhist: loginData.user.historycardio
        })
      );
      dispatch(loadSplash({ loadSplash: true }));
      const setTokens = async (token: string, rtoken: string) => {
        await setAccessToken(token);
        await setRefreshToken(rtoken);
      };

      await setTokens(token, rtoken);
    } catch (error) {
      if (isErrorInterface(error) && error.status === ErrorCode.UNAUTHORIZED) {
        const mappederror = mapErrorResponse(error);
        await handleLoginError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    } finally {
      dispatch(setLoaderFalse());
    }
  };
  return (
    <LoginPresenter
      email={email}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
      navigateToSignUp={navigateToSignUp}
      isEmailValid={isEmailValid}
      isPasswordValid={isPasswordValid}
      validateEmail={validateEmail}
      validatePassword={validatePassword}
      resetPasswordLink={resetPasswordLink}
      onSecurePassword={setPasswordInvisible}
      isPassword={isPassword}
    />
  );
};
export default LoginContainer;
