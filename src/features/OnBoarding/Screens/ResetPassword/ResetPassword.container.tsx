import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../../../navigation/routes/AuthStack';
import {
  ResetPassword_SCREEN,
  Verif_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { useForm } from 'react-hook-form';
import React from 'react';
import ResetPassword, {
  ResetPasswordSchema,
  ResetPasswordSchemaType
} from './ResetPassword';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAppDispatch } from '../../../../hooks/hooks';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { useResetPasswordMutation } from '../../../../store/apis/authApis/authApis';
import { handleResetPasswordError } from './helper/ResetPasswordErrorHandling';

type ResetPasswordProps = NativeStackScreenProps<
  AuthStackParamList,
  typeof ResetPassword_SCREEN
>;

export interface ResetPasswordDto {
  email: string;
  password: string;
}

const ResetPasswordContainer: React.FC<ResetPasswordProps> = ({
  navigation
}): JSX.Element => {
  const [resetRequest] = useResetPasswordMutation();

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ResetPasswordSchemaType>({
    resolver: zodResolver(ResetPasswordSchema)
  });
  const dispatch = useAppDispatch();

  const onSubmit = async (requestData: ResetPasswordDto) => {
    try {
      await resetRequest({
        email: requestData.email,
        password: requestData.password
      }).unwrap();

      navigation.navigate(Verif_SCREEN, {
        email: requestData.email,
        reset: true
      });
    } catch (error) {
      if (isErrorInterface(error) && error.status < ErrorCode.INTERNAL_SERVER) {
        const mappederror = mapErrorResponse(error);
        await handleResetPasswordError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    }
  };

  return (
    <ResetPassword
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default ResetPasswordContainer;
