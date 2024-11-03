import React from 'react';
import OTPContainer from '../../Components/OTPInput/CodeInput';
import { Text, TouchableOpacity, View } from 'react-native';
import { tt } from '../../../../locales/translation.config';
import { Button } from '../../../../components/Button/Button';
import { stylesVerifyEmail } from './verifyEmailStyle';
import { stylesLogin } from '../Login/loginStyle';
import { otpLength } from '../../../../utils/consts/numericValues/numericValues';

interface VerifyEmailPresenterProps {
  otpValue: string[];
  onOtpChange(value: string[]): void;
  handleSubmit: () => void;
  resendCode: () => void;
}

const VerifyEmail: React.FC<VerifyEmailPresenterProps> = ({
  otpValue,
  onOtpChange,
  handleSubmit,
  resendCode
}) => {
  return (
    <View style={[stylesVerifyEmail.mainContent]}>
      <OTPContainer
        length={otpLength}
        value={otpValue}
        disabled={false}
        onChange={onOtpChange}
      />
      <TouchableOpacity onPress={resendCode}>
        <Text style={stylesLogin.link}>{tt('Resend verification code')}</Text>
      </TouchableOpacity>

      <Button
        title={tt('SubmitCode')}
        onTap={handleSubmit}
        enabledActiveOpacity={true}
        isloading={false}
      />
    </View>
  );
};

export default VerifyEmail;
