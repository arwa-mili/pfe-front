import React from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { isAndroidDevice } from '../../../../utils/helpers/IsAndroidDevice';
import { stylesNumericPopUp } from '../../../../components/NumericInputModalPopUp/numericInputModalPopUpStyles';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { stylesCustomMealAddition } from '../../../../components/CustomMealAdditionPopUp/customMealAdditionPopUpStyles';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit
} from 'react-hook-form';
import { TextInputSimple } from '../../../UserInfos/Components/TextInputSimple/TextInputSimple';
import { stylesGlobal } from '../../Utils/styling/globalStyles';
import { tt } from '../../../../locales/translation.config';
import { Button } from '../../../../components/Button/Button';
import { z } from 'zod';

export type ChatMessageType = z.infer<typeof CreateChat>;
export interface CreateChatRequest {
  text: string;
  doctorid?: number;
  userid?: number;
}
export const CreateChat = z.object({
  text: z.string({ required_error: 'isrequired' })
});
interface SendMessageForChatPopUpProps {
  onClose: () => void;
  isVisible: boolean;
  control: Control<CreateChatRequest> | undefined;
  handleSubmit: UseFormHandleSubmit<CreateChatRequest, CreateChatRequest>;
  onSubmit: (requestData: CreateChatRequest) => Promise<void>;
  errors: FieldErrors<CreateChatRequest>;
}

const SendMessageForChatPopUp: React.FC<SendMessageForChatPopUpProps> = ({
  onClose,
  isVisible,
  control,
  errors,
  handleSubmit,
  onSubmit
}) => {
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={stylesNumericPopUp.modalBackground}>
        {isAndroidDevice() && (
          <View
            style={[
              StyleSheet.absoluteFill,
              { backgroundColor: Color.colorTransparent }
            ]}
          />
        )}
        <View style={stylesCustomMealAddition.container}>
          <View style={stylesCustomMealAddition.infocontainer}>
            <View style={{ flexDirection: 'row' }}>
              <Text>Please provide the message to send to the doctor</Text>
            </View>
          </View>

          <View style={stylesNumericPopUp.container}>
            <Text> Message</Text>
            <Controller
              control={control}
              name={'text'}
              render={({ field: { onChange, value } }) => (
                <TextInputSimple
                  placeholder={'message to send'}
                  onChange={onChange}
                  val={value}
                  error={!!errors.text}
                  withIcon={false}
                  style={stylesGlobal.textinput}
                />
              )}
            />
            {errors.text && <Text>{errors.text.message}</Text>}
          </View>
          <View style={stylesNumericPopUp.buttonContainer}>
            <Button
              textStyles={stylesGlobal.buttonTextBigger}
              style={stylesGlobal.buttonBigger}
              title={tt('Cancel')}
              onTap={onClose}
              enabledActiveOpacity={true}
              isloading={false}
            />
            <Button
              textStyles={stylesGlobal.buttonTextBigger}
              style={stylesGlobal.buttonBigger}
              title={tt('Submit')}
              onTap={handleSubmit(onSubmit)}
              enabledActiveOpacity={true}
              isloading={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default SendMessageForChatPopUp;
