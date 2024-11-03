import React from 'react';

import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { DrawerScreenProps } from '@react-navigation/drawer/lib/typescript/src/types';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  ChangeEmail_SCREEN,
  VERIFEMAILCHNAGEEMAIL_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import ChangeEmail, {
  ChangeEmailSchema,
  ChangeEmailSchemaType
} from './ChangeEmail';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleResetPasswordError } from '../../../OnBoarding/Screens/ResetPassword/helper/ResetPasswordErrorHandling';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { useAppDispatch } from '../../../../hooks/hooks';
import { useChangeEmailMutation } from '../../../../store/apis/userProfileApis/userProfileApis';

/**
 * Container used to separate ChangeName logic as a wrapper to ChangeName screen
 * @returns JSX.Element
 */

interface ChangeEmailContainerProps
  extends DrawerScreenProps<
    DrawerNavigatorParamList,
    typeof ChangeEmail_SCREEN
  > {}

export interface ChnageEmailDto {
  email: string;
  phoneNumber: number;
  password: string;
  role: number;
  avatar: string;
}

const ChangeEmailContainer: React.FC<ChangeEmailContainerProps> = ({
  navigation
}): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangeEmailSchemaType>({
    resolver: zodResolver(ChangeEmailSchema)
  });
  const dispatch = useAppDispatch();
  const [changeEmailRequest] = useChangeEmailMutation();

  const onSubmit = async (requestData: Partial<ChnageEmailDto>) => {
    try {
      let user: ChnageEmailDto = {
        phoneNumber: 54555555,
        password: 'ghbhbhb',
        role: 0,
        avatar: 'gguugu',
        email: requestData.email as string
      };
      await changeEmailRequest({
        user
      }).unwrap();

      navigation.navigate(VERIFEMAILCHNAGEEMAIL_SCREEN, {
        email: requestData.email as string
      });
    } catch (error) {
      console.log(error);
      if (isErrorInterface(error) && error.status < ErrorCode.INTERNAL_SERVER) {
        const mappederror = mapErrorResponse(error);
        await handleResetPasswordError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    }
  };
  return (
    <ChangeEmail
      control={control}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
    />
  );
};

export default ChangeEmailContainer;
