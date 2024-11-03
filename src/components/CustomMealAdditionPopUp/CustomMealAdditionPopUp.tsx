import React from 'react';
import { View, Modal, StyleSheet, Text } from 'react-native';
import { stylesNumericPopUp } from '../NumericInputModalPopUp/numericInputModalPopUpStyles';
import { isAndroidDevice } from '../../utils/helpers/IsAndroidDevice';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { stylesGlobal } from '../../features/LoggedIn/Utils/styling/globalStyles';
import { Button } from '../Button/Button';
import { tt } from '../../locales/translation.config';
import { TextInputSimple } from '../../features/UserInfos/Components/TextInputSimple/TextInputSimple';
import { z } from 'zod';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit
} from 'react-hook-form';
import { stylesCustomMealAddition } from './customMealAdditionPopUpStyles';
import { PeopleCategory } from '../../enums/PeopleCategoris.enum';

export type AddMealToPlanType = z.infer<typeof AddMealToPlan>;
export interface AddMealToPlanRequest {
  name: string;
  steps: string;
  FatContent?: number;
  CarbohydratesContent?: number;
  ProteinContent?: number;
  Calories?: number;
  ingredients: string;
  disease?: number;
  tags?: PeopleCategory;
  RecipeCategory?: string;
}
export const AddMealToPlan = z.object({
  name: z.string({ required_error: 'isrequired' }),
  ingredients: z.string({ required_error: 'isrequired' }),
  steps: z.string({ required_error: 'isrequired' })
});
interface CustomMealAdditionPopUpProps {
  isVisible: boolean;
  weekly_fats: number;
  weekly_protein: number;
  weekly_calories: number;
  weekly_carbohydrates: number;
  control: Control<AddMealToPlanRequest> | undefined;
  handleSubmit: UseFormHandleSubmit<AddMealToPlanRequest, AddMealToPlanRequest>;
  onSubmit: (requestData: AddMealToPlanRequest) => Promise<void>;
  errors: FieldErrors<AddMealToPlanRequest>;
  onCancel: () => void;
}

const CustomMealAdditionPopUp: React.FC<CustomMealAdditionPopUpProps> = ({
  isVisible,
  weekly_fats,
  weekly_protein,
  weekly_calories,
  weekly_carbohydrates,
  control,
  errors,
  onCancel,
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
              <Text> {tt('Fats :')} </Text>
              <Text>{weekly_fats} </Text>
              <Text> {tt('Protein : ')}</Text>
              <Text>{weekly_protein}</Text>
            </View>
            <View style={{ flexDirection: 'row' }}>
              <Text> {tt('Calories :')} </Text>
              <Text>{weekly_calories}</Text>
              <Text>{tt('  Carbohydrates :')}</Text>
              <Text>{weekly_carbohydrates}</Text>
            </View>
          </View>

          <View style={stylesNumericPopUp.container}>
            <Text> Name</Text>
            <Controller
              control={control}
              name={'name'}
              render={({ field: { onChange, value } }) => (
                <TextInputSimple
                  placeholder={'name'}
                  onChange={onChange}
                  val={value}
                  error={!!errors.name}
                  withIcon={false}
                  style={stylesGlobal.textinput}
                />
              )}
            />
            {errors.name && <Text>{errors.name.message}</Text>}
            <Text> {tt('Ingredients')}</Text>
            <Controller
              control={control}
              name={'ingredients'}
              render={({ field: { onChange, value } }) => (
                <TextInputSimple
                  placeholder={'ingredients'}
                  onChange={onChange}
                  val={value}
                  error={!!errors.ingredients}
                  withIcon={false}
                  style={stylesGlobal.textinput}
                />
              )}
            />
            {errors.ingredients && <Text>{errors.ingredients.message}</Text>}
            <Text> {tt('Steps')}</Text>
            <Controller
              control={control}
              name={'steps'}
              render={({ field: { onChange, value: steps } }) => (
                <TextInputSimple
                  placeholder={'steps'}
                  onChange={onChange}
                  val={steps}
                  error={!!errors.steps}
                  withIcon={false}
                  style={stylesGlobal.textinput}
                />
              )}
            />
            {errors.steps && <Text>{errors.steps.message}</Text>}
          </View>
          <View style={stylesNumericPopUp.buttonContainer}>
            <Button
              textStyles={stylesGlobal.buttonTextBigger}
              style={stylesGlobal.buttonBigger}
              title={tt('Cancel')}
              onTap={onCancel}
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

export default CustomMealAdditionPopUp;
