import React from 'react';
import { Text, View } from 'react-native';
import { TextInputSimple } from '../../../UserInfos/Components/TextInputSimple/TextInputSimple';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit
} from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../components/Button/Button';

/**
 * Represents ChangeName screen ui
 * @returns JSX.Element
 */

export const ChangeNameSchema = z.object({
  firstname: z
    .string({ required_error: 'isrequired' })
    .email({ message: 'is required' }),
  lastname: z.string({ required_error: 'isrequired' })
});
export type ChangeNameSchemaType = z.infer<typeof ChangeNameSchema>;
export interface ChangeNameRequest {
  firstname: string;
  lastname: string;
}
interface ChangeNameProps {
  control: Control<ChangeNameRequest> | undefined;
  errors: FieldErrors<ChangeNameRequest>;
  handleSubmit: UseFormHandleSubmit<ChangeNameRequest, ChangeNameRequest>;
  onSubmit: (requestData: ChangeNameRequest) => Promise<void>;
}

const ChangeName: React.FC<ChangeNameProps> = ({
  control,
  errors,
  handleSubmit,
  onSubmit
}): JSX.Element => {
  return (
    <View>
      <Controller
        control={control}
        name={'firstname'}
        render={({ field: { onChange, value } }) => (
          <TextInputSimple
            placeholder={'familyname'}
            onChange={onChange}
            val={value}
            error={!!errors.firstname}
            withIcon={false}
          />
        )}
      />
      {errors.firstname && <Text>{errors.firstname.message}</Text>}
      <Controller
        control={control}
        name={'lastname'}
        render={({ field: { onChange, value } }) => (
          <TextInputSimple
            placeholder={'familyname'}
            onChange={onChange}
            val={value}
            error={!!errors.lastname}
            withIcon={false}
          />
        )}
      />
      {errors.lastname && <Text>{errors.lastname.message}</Text>}
      <Button
        title={'Submit'}
        //ButtonProps={styles.signInButton}
        //textStyles={styles.signInButtonText}
        onTap={handleSubmit(onSubmit)}
        isloading={false}
        enabledActiveOpacity={true}
      />
    </View>
  );
};

export default ChangeName;
