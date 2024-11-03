import React, { useState } from 'react';

import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import { VERIFEMAILCHNAGEEMAIL_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { useAppDispatch } from '../../../../hooks/hooks';
import { setCurrentUserInfos } from '../../../../hooks/Slices/UserSlice';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleCodeVerifError } from '../../../OnBoarding/Screens/VerifyEmail/hepler/SendCodeErrorHandling';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { useVerifEmailMutation } from '../../../../store/apis/authApis/authApis';
import VerifyEmail from '../../../OnBoarding/Screens/VerifyEmail/VerifyEmail';

/**
 * Container used to separate VerifEmailChnageEmail logic as a wrapper to VerifEmailChnageEmail screen
 * @returns JSX.Element
 */
interface VerifEmailChnageEmailContainerProps
  extends DrawerScreenProps<
    DrawerNavigatorParamList,
    typeof VERIFEMAILCHNAGEEMAIL_SCREEN
  > {}

const VerifEmailChnageEmailContainer: React.FC<
  VerifEmailChnageEmailContainerProps
> = ({ route }): JSX.Element => {
  const [otpValue, setOtpValue] = useState<string[]>([]);
  const email = route?.params?.email;

  const [verifMutation] = useVerifEmailMutation();

  const dispatch = useAppDispatch();

  const handleOtpChange = (value: string[]) => {
    setOtpValue(value);
  };

  const resendCode = async () => {};

  const handleSubmit = async () => {
    try {
      const result = await verifMutation({
        email,
        code: otpValue.join('')
      }).unwrap();

      if (result) {
        dispatch(
          setCurrentUserInfos({
            email: result.user.email
          })
        );
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

export default VerifEmailChnageEmailContainer;
