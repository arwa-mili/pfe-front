import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { TextInputSimple } from '../../../UserInfos/Components/TextInputSimple/TextInputSimple';
import {
  Control,
  Controller,
  FieldErrors,
  UseFormHandleSubmit
} from 'react-hook-form';
import { z } from 'zod';
import { Button } from '../../../../components/Button/Button';
import { stylesGlobal } from '../../Utils/styling/globalStyles';
import { stylesAddCustomMeal } from './addCustomMealStyles';
import { ImagePickerAvatar } from '../../../UserInfos/Components/ImagePickerAvatar/ImagePickerAvatar';
import { ImagePickerModal } from '../../../UserInfos/Components/ImagePickerModal/ImagePickerModal';
import { ImagesType } from '../../../../utils/StylingConsts/images/Images';
import { AddMealImageSchema } from './interfaces/AddMealName.interface';
import { tt } from '../../../../locales/translation.config';
import CustomMealAdditionPopUp, {
  AddMealToPlanRequest
} from '../../../../components/CustomMealAdditionPopUp/CustomMealAdditionPopUp';

/**
 * Represents ChangeName screen ui
 * @returns JSX.Element
 */

export const AddMealNameSchema = z.object({
  name: z.string({ required_error: 'isrequired' })
});

export type AddMealImageSchemaType = z.infer<typeof AddMealImageSchema>;
export interface AddMealImageRequest {
  uri: string;
  type: string | keyof ImagesType | undefined;
  fileName: string;
}

export type AddMealNameSchemaType = z.infer<typeof AddMealNameSchema>;
export interface AddMealNameRequest {
  name: string;
}
/**
 * Represents AddCustomMeal screen ui
 * @returns JSX.Element
 */
interface AddCustomMealProps {
  onClose: () => void;
  onPress: () => void;
  urii: string | keyof ImagesType | undefined;
  onImageLibraryPress: () => void;
  visible: boolean;
  control: Control<AddMealNameRequest> | undefined;
  errors: FieldErrors<AddMealNameRequest>;
  errorsForm: FieldErrors<AddMealToPlanRequest>;
  fats: number;
  protein: number;
  carbohydrates: number;
  cals: number;
  onCancel: () => void;
  handleSubmit: UseFormHandleSubmit<AddMealNameRequest, AddMealNameRequest>;
  onSubmit: (requestData: AddMealNameRequest) => Promise<void>;
  onNewRecipeSubmit: (requestData: AddMealToPlanRequest) => Promise<void>;
  controlImage: Control<AddMealImageRequest> | any | undefined;
  isVisible: boolean;
  controlForm: Control<AddMealToPlanRequest> | undefined;
  handleSubmitForm: UseFormHandleSubmit<
    AddMealToPlanRequest,
    AddMealToPlanRequest
  >;

  meal: boolean;
}

const AddCustomMeal: React.FC<AddCustomMealProps> = ({
  control,
  errors,
  onClose,
  onPress,
  visible,
  controlImage,
  onImageLibraryPress,
  urii,
  fats,
  protein,
  carbohydrates,
  cals,
  handleSubmit,
  onSubmit,
  onNewRecipeSubmit,
  meal,
  onCancel,
  isVisible,
  controlForm,
  handleSubmitForm,
  errorsForm
}): JSX.Element => {
  return (
    <ScrollView>
      {isVisible && (
        <CustomMealAdditionPopUp
          control={controlForm}
          handleSubmit={handleSubmitForm}
          isVisible={isVisible}
          weekly_fats={fats}
          weekly_protein={protein}
          weekly_calories={cals}
          weekly_carbohydrates={carbohydrates}
          errors={errorsForm}
          onCancel={onCancel}
          onSubmit={onNewRecipeSubmit}
        />
      )}
      <View style={stylesAddCustomMeal.textview}>
        <Text style={stylesAddCustomMeal.Title1}>
          {tt('Add Your Custom Meal And Get its Glycemic Index !')}
        </Text>
        <Text style={stylesAddCustomMeal.Title2}>
          {' '}
          {tt('You can either submit dish name or image')}
        </Text>
      </View>
      <View style={stylesAddCustomMeal.topcontent}>
        <View style={stylesAddCustomMeal.textview}>
          <Text style={stylesGlobal.text}> {tt('Submit Name of Dish')}</Text>
        </View>
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

        <Button
          title={'Submit'}
          onTap={handleSubmit(onSubmit)}
          isloading={false}
          enabledActiveOpacity={true}
        />
      </View>
      <View style={stylesAddCustomMeal.bottomcontent}>
        <View style={stylesAddCustomMeal.textview}>
          <Text style={stylesGlobal.text}> {tt('Submit Image of Dish')}</Text>
        </View>
        <Controller
          control={controlImage}
          name={'uri'}
          render={({}) => (
            <>
              <ImagePickerAvatar
                meal={meal}
                uri={urii}
                onPress={onPress}
                changeable={true}
              />
              <ImagePickerModal
                isVisible={visible}
                onClose={onClose}
                onImageLibraryPress={onImageLibraryPress}
              />
            </>
          )}
        />
      </View>
    </ScrollView>
  );
};

export default AddCustomMeal;
