import React, { useState } from 'react';
import SignUp from './SignUp';
import { ISignUpRequest } from '../../../../interfaces/auth/signup.interface';
import { useAppDispatch } from '../../../../hooks/hooks';

import {
  Login_SCREEN,
  Register_SCREEN,
  Verif_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../../navigation/routes/AuthStack';
import {
  validateEmailHF,
  validatePasswordHF,
  validatePhoneNumberHF
} from '../../Utils/HelperFunctions/helper';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { handleRegisterError } from './helper/RegisterErrorHandling';
import { useSignupMutation } from '../../../../store/apis/authApis/authApis';

type SignUpProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof Register_SCREEN
>;

const SignUpContainer = ({ navigation, route }: SignUpProps) => {
  const dispatch = useAppDispatch();

  const role = route.params.role;
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [isPasswordValid, setIsPasswordValid] = useState(true);
  const [isEmailValid, setIsEmailValid] = useState(true);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(true);
  const [passwordMatches, setPasswordMatches] = useState(true);

  const [signUpMutation] = useSignupMutation();

  const navigateToLogin = () => {
    navigation.navigate(Login_SCREEN);
  };

  const validatePassword = (text: string) => {
    setIsPasswordValid(validatePasswordHF(text));
    setPassword(text);
  };

  const validatePhoneNumber = (number: string) => {
    setIsPhoneNumberValid(validatePhoneNumberHF(number));
    setPhoneNumber(number);
  };

  const validateEmail = (text: string) => {
    setIsEmailValid(validateEmailHF(text));
    setEmail(text);
  };

  const passwordsMatch = (text1: string, text2: string) => {
    setPasswordMatches(text1 === text2);
    setConfirmPassword(text2);
  };

  const handleSubmit = async () => {
    try {
      const signUpData: ISignUpRequest = {
        email,
        phoneNumber: parseInt(phoneNumber, 8),
        password,
        role
      };

      await signUpMutation(signUpData).unwrap();

      navigation.navigate(Verif_SCREEN, { email, reset: false });
    } catch (error) {
      if (isErrorInterface(error) && error.status < ErrorCode.INTERNAL_SERVER) {
        const mappederror = mapErrorResponse(error);
        await handleRegisterError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    }
  };

  return (
    <>
      <SignUp
        email={email}
        password={password}
        phoneNumber={phoneNumber}
        setPhoneNumber={setPhoneNumber}
        confirmPassword={confirmPassword}
        isPasswordValid={isPasswordValid}
        isPhoneNumberValid={isPhoneNumberValid}
        passwordMatches={passwordMatches}
        passwordsMatch={passwordsMatch}
        isEmailValid={isEmailValid}
        validateEmail={validateEmail}
        validatePhoneNumber={validatePhoneNumber}
        validatePassword={validatePassword}
        setConfirmPassword={setConfirmPassword}
        setEmail={setEmail}
        setPassword={setPassword}
        handleSubmit={handleSubmit}
        navigateToLogin={navigateToLogin}
      />
    </>
  );
};

export default SignUpContainer;
