import { Image, ScrollView } from 'react-native';
import { TextInput, TouchableOpacity, View, Text } from 'react-native';
import { Button } from '../../../../components/Button/Button';

import React from 'react';
import Line from '../../Components/HorizontalLine/Line';
import { tt } from '../../../../locales/translation.config';
import { stylesSignUp } from './signUpStyle';
import { stylesLogin } from '../Login/loginStyle';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

interface SignUpPresenterProps {
  email: string;
  phoneNumber: string;
  password: string;
  setPhoneNumber: Function;
  confirmPassword: string;
  setConfirmPassword: Function;
  setEmail: Function;
  setPassword: Function;
  isEmailValid: boolean;
  passwordMatches: boolean;

  isPasswordValid: boolean;
  isPhoneNumberValid: boolean;
  passwordsMatch: (password: string, confirmPassword: string) => void;
  validatePhoneNumber: (phoneNumber: string) => void;
  validateEmail: (email: string) => void;
  validatePassword: (password: string) => void;
  handleSubmit: () => void;
  navigateToLogin: () => void;
}

const SignUp: React.FC<SignUpPresenterProps> = ({
  email,
  phoneNumber,
  setPhoneNumber,
  password,
  confirmPassword,
  setConfirmPassword,
  setEmail,
  setPassword,
  isEmailValid,
  passwordMatches,
  isPasswordValid,
  isPhoneNumberValid,
  passwordsMatch,
  validateEmail,
  validatePassword,
  validatePhoneNumber,
  handleSubmit,
  navigateToLogin
}: SignUpPresenterProps) => {
  return (
    <ScrollView bounces={false}>
      <View style={[stylesSignUp.loginScreen]}>
        <View>
          <Image
            style={[stylesLogin.vectorIconPosition]}
            resizeMode="cover"
            source={Images.logo}
          />
        </View>

        <View
          style={[
            stylesSignUp.rectangleView,
            stylesSignUp.rectangleViewBorder
          ]}>
          <Text style={stylesSignUp.login}>{tt('SignUp')}</Text>

          <View>
            <Text style={stylesSignUp.crossedText}>{tt('Email')}</Text>
            <TextInput
              style={stylesSignUp.input2}
              placeholder={tt('Tap your email...')}
              value={email}
              placeholderTextColor={Color.colorDimgray}
              onChangeText={(email) => {
                setEmail(email), validateEmail(email);
              }}
            />
            {!isEmailValid && (
              <Text style={stylesSignUp.error}>Invalid email format</Text>
            )}
          </View>
          <View>
            <Text style={stylesSignUp.crossedText}>{tt('PhoneNumber')}</Text>
            <TextInput
              style={stylesSignUp.input2}
              placeholder={tt('Tap your phone number...')}
              value={phoneNumber}
              keyboardType="decimal-pad"
              placeholderTextColor={Color.colorDimgray}
              onChangeText={(phoneNumber) => {
                setPhoneNumber(phoneNumber), validatePhoneNumber(phoneNumber);
              }}
            />
            {!isPhoneNumberValid && (
              <Text style={stylesSignUp.error}>
                {tt('Invalid phone number format')}
              </Text>
            )}
          </View>

          <View>
            <Text style={stylesSignUp.crossedText}>{tt('Password')}</Text>
            <TextInput
              style={stylesSignUp.input2}
              placeholder={tt('Password')}
              value={password}
              placeholderTextColor={Color.colorDimgray}
              onChangeText={(password) => {
                setPassword(password), validatePassword(password);
              }}
              secureTextEntry
            />
            {!isPasswordValid && (
              <Text style={stylesSignUp.error}>
                {tt('PasswordPatternMsg')}{' '}
              </Text>
            )}
          </View>
          <View>
            <Text style={stylesSignUp.crossedText}>
              {tt('ConfirmPassword')}
            </Text>
            <TextInput
              style={stylesSignUp.input2}
              placeholder={tt('Confirm your Password...')}
              value={confirmPassword}
              placeholderTextColor={Color.colorDimgray}
              onChangeText={(confirmPassword) => {
                setConfirmPassword(confirmPassword),
                  passwordsMatch(password, confirmPassword);
              }}
              secureTextEntry
            />
            {!passwordMatches && (
              <Text style={stylesSignUp.error}>
                {tt('Passwords do not match !')}{' '}
              </Text>
            )}
          </View>
          <Button
            title={tt('SignUp')}
            onTap={handleSubmit}
            disabled={
              !isEmailValid ||
              !isPasswordValid ||
              !passwordMatches ||
              !isPhoneNumberValid
            }
            enabledActiveOpacity={true}
            isloading={false}
          />

          <View style={stylesSignUp.container}>
            <Line color="black" thickness={2} />
          </View>
          <Text>
            {tt('Already have an account?')}
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={stylesLogin.link}>{tt('Login')}</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={[stylesSignUp.loginLayout]}>
          <Image resizeMode="cover" source={Images.authScreensImg} />
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
