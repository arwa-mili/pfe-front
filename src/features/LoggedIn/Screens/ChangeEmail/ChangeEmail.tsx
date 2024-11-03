import React from 'react';
import { Text, View } from 'react-native';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit
} from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../components/Button/Button';
import { stylesReset } from '../../../OnBoarding/Screens/ResetPassword/resetPasswordStyle';
import TextInputChangeProfile from '../../Components/TextInputChangeProfile/TextInputChangeProfile';
import { tt } from '../../../../locales/translation.config';

/**
 * Represents ChangeName screen ui
 * @returns JSX.Element
 */

export const ChangeEmailSchema = z.object({
  email: z
    .string({ required_error: 'isrequired' })
    .email({ message: 'is required' })
});
export type ChangeEmailSchemaType = z.infer<typeof ChangeEmailSchema>;
export interface ChangeEmailRequest {
  email: string;
}
interface ChangeEmailProps {
  control: Control<ChangeEmailRequest> | undefined;
  errors: FieldErrors<ChangeEmailRequest>;
  handleSubmit: UseFormHandleSubmit<ChangeEmailRequest, ChangeEmailRequest>;
  onSubmit: (requestData: ChangeEmailRequest) => Promise<void>;
}

const ChangeEmail: React.FC<ChangeEmailProps> = ({
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

export default ChangeEmail;
