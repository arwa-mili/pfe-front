import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../../../components/Button/Button';
import { tt } from '../../../../locales/translation.config';
import { z } from 'zod';
import { zoderrors } from '../../../../utils/consts/zodErrors/zoderrors';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit
} from 'react-hook-form';
import TextInputChangeProfile from '../../../LoggedIn/Components/TextInputChangeProfile/TextInputChangeProfile';
import { stylesReset } from './resetPasswordStyle';

export const ResetPasswordSchema = z.object({
  email: z
    .string({ required_error: zoderrors.isrequirederror })
    .email({ message: tt('email is required') }),
  password: z
    .string({ required_error: zoderrors.isrequirederror })
    .refine(
      (value) => /^(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(value ?? ''),
      tt(
        'Email should be alphanumeric with one capital letter and at least 8 long'
      )
    )
});
export type ResetPasswordSchemaType = z.infer<typeof ResetPasswordSchema>;
export interface ResetPasswordRequest {
  email: string;
  password: string;
}
interface ResetPasswordPresenterProps {
  control: Control<ResetPasswordRequest> | undefined;
  errors: FieldErrors<ResetPasswordRequest>;
  handleSubmit: UseFormHandleSubmit<ResetPasswordRequest, ResetPasswordRequest>;
  onSubmit: (requestData: ResetPasswordRequest) => Promise<void>;
}

const ResetPassword: React.FC<ResetPasswordPresenterProps> = ({
  control,
  errors,
  handleSubmit,
  onSubmit
}): JSX.Element => {
  return (
    <View style={stylesReset.container}>
      <Controller
        control={control}
        name={'email'}
        render={({ field: { onChange, value } }) => (
          <TextInputChangeProfile
            placeholder={'email'}
            onChangeText={onChange}
            value={value}
            autoCapitalize="none"
            returnKeyType="next"
            error={!!errors.email}
            isFocused={true}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}
      <Controller
        control={control}
        name={'password'}
        render={({ field: { onChange, value } }) => (
          <TextInputChangeProfile
            placeholder={tt('new password')}
            onChangeText={onChange}
            value={value}
            isFocused={true}
            autoCapitalize="none"
            secureTextEntry={true}
            returnKeyType="next"
            error={!!errors.password}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      <View style={{ margin: 10 }}>
        <Button
          title={tt('Submit')}
          onTap={handleSubmit(onSubmit)}
          isloading={false}
          enabledActiveOpacity={true}
        />
      </View>
    </View>
  );
};

export default ResetPassword;
