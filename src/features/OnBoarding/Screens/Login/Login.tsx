import { Image } from 'react-native';
import { TouchableOpacity, View, Text } from 'react-native';
import { Button } from '../../../../components/Button/Button';
import React from 'react';
import Line from '../../Components/HorizontalLine/Line';
import { tt } from '../../../../locales/translation.config';
import { stylesLogin } from './loginStyle';
import { InputFieldWithText } from '../../../../components/InputFieldWithText/InputFieldWithText';
import { ScrollView } from 'react-native';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

interface LoginPresenterProps {
  email: string;
  password: string;
  setEmail: (email: string) => void;
  setPassword: (password: string) => void;
  handleSubmit: () => void;
  onSecurePassword: () => void;
  navigateToSignUp: () => void;
  isEmailValid: boolean;
  isPassword: boolean;
  isPasswordValid: boolean;
  validateEmail: (email: string) => void;
  validatePassword: (password: string) => void;
  resetPasswordLink: () => void;
}

const LoginPresenter: React.FC<LoginPresenterProps> = ({
  email,
  password,
  setEmail,
  setPassword,
  handleSubmit,
  navigateToSignUp,
  isEmailValid,
  isPasswordValid,
  isPassword,
  validateEmail,
  validatePassword,
  resetPasswordLink,
  onSecurePassword
}) => {
  return (
    <ScrollView bounces={false}>
      <View style={[stylesLogin.loginScreen]}>
        <View>
          <Image
            style={[stylesLogin.imageTop]}
            resizeMode="cover"
            source={Images.logo}
          />
        </View>

        <View
          style={[stylesLogin.rectangleView, stylesLogin.rectangleViewBorder]}>
          <Text style={stylesLogin.login}>{tt('Login')}</Text>

          <InputFieldWithText
            title={tt('Email/PhoneNumber')}
            placeholder={tt('Tap your email or phone number...')}
            value={email}
            placeholderTextColor={Color.colorDimgray}
            onChange={(email) => {
              setEmail(email), validateEmail(email);
            }}
            isSecure={false}
            condition={isEmailValid}
            errorText={tt('Invalid email or num format')}
          />

          <InputFieldWithText
            title={tt('Password')}
            placeholder={tt('Password')}
            value={password}
            placeholderTextColor={Color.colorDimgray}
            onChange={(password) => {
              setPassword(password), validatePassword(password);
            }}
            isSecure={true}
            onPress={onSecurePassword}
            condition={isPasswordValid}
            conditionSecure={isPassword}
            errorText={tt('Invalid password format')}
          />

          <Button
            title={tt('Login')}
            onTap={handleSubmit}
            disabled={!isEmailValid || !isPasswordValid}
            style={[stylesLogin.button]}
            enabledActiveOpacity={true}
            isloading={false}
          />

          <Text style={stylesLogin.text}>
            {tt('Forget your password?')}
            <TouchableOpacity onPress={resetPasswordLink}>
              <Text style={stylesLogin.link}>{tt('Reset from here')}</Text>
            </TouchableOpacity>
          </Text>
          <Line color={Color.colorBlack} thickness={2} />

          <Text style={stylesLogin.text}>
            {tt("Don't have an account?")}
            <TouchableOpacity onPress={navigateToSignUp}>
              <Text style={stylesLogin.link}>{tt('SignUp')}</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={stylesLogin.imagesBottom}>
          <Image resizeMode="cover" source={Images.authScreensImg} />
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginPresenter;
