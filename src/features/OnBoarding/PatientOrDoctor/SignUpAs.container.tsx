import React from 'react';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import SignUpAs from './SignUpAs';
import { AuthStackParamList } from '../../../navigation/routes/AuthStack';
import {
  Register_SCREEN,
  SignUpAs_SCREEN
} from '../../../utils/consts/screensNames/ScreensNames';
import { Role } from '../../../enums/UserRole.enum';

/**
 * Container used to separate PatientOrDoctor logic as a wrapper to PatientOrDoctor screen
 * @returns JSX.Element
 */

type SignUpAsContainerProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof SignUpAs_SCREEN
>;

const SignUpAsContainer: React.FC<SignUpAsContainerProps> = ({
  navigation
}): JSX.Element => {
  const HandleonTapPatient = async () => {
    navigation.navigate(Register_SCREEN, { role: Role.Patient });
  };

  const HandleonTapDoctor = async () => {
    navigation.navigate(Register_SCREEN, { role: Role.Doctor });
  };
  return (
    <SignUpAs
      onTapDoctor={HandleonTapDoctor}
      onTapPatient={HandleonTapPatient}
    />
  );
};

export default SignUpAsContainer;
