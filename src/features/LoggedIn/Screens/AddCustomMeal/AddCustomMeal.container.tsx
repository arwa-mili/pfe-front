import React, { useCallback, useState } from 'react';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import AddCustomMeal, {
  AddMealImageRequest,
  AddMealImageSchemaType,
  AddMealNameRequest,
  AddMealNameSchema,
  AddMealNameSchemaType
} from './AddCustomMeal';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import {
  ADDCUSTOMMEAL_SCREEN,
  Meals_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { isErrorInterface } from '../../../../store/GenericErrorHandling/ErrorsTypeChecking';
import { ErrorCode } from '../../../../utils/consts/errorCodes/errorCodes';
import { mapErrorResponse } from '../../../../models/ErrorInterfaces/ErrorInterfaces.interface';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import {
  useAddMealImageMutation,
  useAddMealMutation,
  useAddMealNameMutation
} from '../../../../store/apis/customMealApis/customMealApis';
import { handleAddMealError } from './helper/AddCustomMealErrorHandling';
import { ImagePickerResponse } from 'react-native-image-picker';
import { MediaType } from '../../../../enums/MediaType';
import * as ImagePicker from 'react-native-image-picker';
import { isAndroidDevice } from '../../../../utils/helpers/IsAndroidDevice';
import { AddMealImageSchema } from './interfaces/AddMealName.interface';
import { tt } from '../../../../locales/translation.config';
import { showMessageModal } from '../../../../hooks/Slices/MessageModalSlice';
import { MessageTypes } from '../../../../enums/MessageTypes';
import { MODAL_BUTTONS_TEXTS } from '../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';
import {
  AddMealToPlan,
  AddMealToPlanRequest,
  AddMealToPlanType
} from '../../../../components/CustomMealAdditionPopUp/CustomMealAdditionPopUp';
import { PeopleCategory } from '../../../../enums/PeopleCategoris.enum';
/**
 * Container used to separate AddCustomMeal logic as a wrapper to AddCustomMeal screen
 * @returns JSX.Element
 */
interface AddCustomMealContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof ADDCUSTOMMEAL_SCREEN
  > {}

const AddCustomMealContainer: React.FC<AddCustomMealContainerProps> = ({
  navigation,
  route
}): JSX.Element => {
  const [addRecipe] = useAddMealMutation();

  const [mealNameRequest] = useAddMealNameMutation();
  const [setImage] = useAddMealImageMutation();
  const [isVisible, setIsVisible] = useState(false);
  const [meal, setMeal] = useState(true);
  const [res, setRes] = useState<R | null>(null);
  const [pickerResponse, setPickerResponse] =
    useState<ImagePickerResponse | null>(null);
  const [visible, setVisible] = useState(false);
  const [, setIsLoading] = useState(false);
  const user = useAppSelector((state) => state.user);
  interface R {
    carbohydrates: number;
    cals: number;
    protein: number;
    fats: number;
  }
  const {
    control: controlImage,
    formState: {}
  } = useForm<AddMealImageSchemaType>({
    //resolver: zodResolver(AddMealImageSchema)
  });
  const {
    control: controlForm,
    handleSubmit: handleSubmitForm,
    formState: { errors: errorsForm }
  } = useForm<AddMealToPlanType>({
    resolver: zodResolver(AddMealToPlan)
  });

  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<AddMealNameSchemaType>({
    resolver: zodResolver(AddMealNameSchema)
  });
  const dispatch = useAppDispatch();

  const onSubmitImage = async (requestData: AddMealImageRequest) => {
    try {
      const formData = new FormData();
      setIsLoading(false);
      formData.append('file', {
        uri: isAndroidDevice()
          ? requestData.uri
          : requestData.uri.replace('file://', ''),
        type: requestData.type,
        name: requestData.fileName
      });

      const result = await setImage({ images: formData }).unwrap();
      if (result.sugarIndex > 60) {
        dispatch(
          showMessageModal({
            headerText: tt('Cannot add'),
            messageText: tt(
              `This dish contains a high sugar Index value = ${result.sugarIndex} , so it cannot be added to your plan`
            ),
            buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
            messageType: MessageTypes.FAIL
          })
        );
      } else if (
        result.calories >= user.weekly_calories ||
        result.carbohydrates >= user.weekly_carbohydrates ||
        result.fats >= user.weekly_fats ||
        result.protein >= user.weekly_protein
      ) {
        dispatch(
          showMessageModal({
            headerText: tt('Cannot add'),
            messageText: tt(
              "This meal's nutriments surpass your weekly needs ! So cannot be added"
            ),
            buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
            messageType: MessageTypes.FAIL
          })
        );
      } else {
        setRes({
          carbohydrates: result.carbohydrates,
          cals: result.calories,
          fats: result.fats,
          protein: result.protein
        });
        setIsVisible(true);
      }
    } catch (error) {
      console.log(error);
      handleGenericError(error, dispatch);
    } finally {
      setIsLoading(false);
    }
  };

  const onImageLibraryPress = useCallback(() => {
    const options = {
      selectLimit: 1,
      mediaType: MediaType.photo,
      includeBase64: false
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      setPickerResponse(response);

      if (response?.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        console.log(selectedImage);
        setMeal(true);
        try {
          const { uri, type, fileName } =
            AddMealImageSchema.parse(selectedImage);
          if (uri != null && type != null && fileName != null) {
            const requestdata: AddMealImageRequest = { uri, type, fileName };
            await onSubmitImage(requestdata);
          }
        } catch (error) {
          console.log(error);
          if (
            isErrorInterface(error) &&
            error.status < ErrorCode.INTERNAL_SERVER
          ) {
            const mappederror = mapErrorResponse(error);
            await handleAddMealError(mappederror, dispatch);
          } else {
            await handleGenericError(error, dispatch);
          }
        }
      }
    });
  }, []);

  const onNewRecipeSubmit = async (requestData: AddMealToPlanRequest) => {
    try {
      if (res != null) {
        requestData.RecipeCategory = route.params.mealType;
        requestData.Calories = res?.cals;
        requestData.CarbohydratesContent = res?.carbohydrates;
        requestData.ProteinContent = res?.protein;
        requestData.FatContent = res?.fats;
        requestData.disease = 1;
        requestData.tags = PeopleCategory.LowCarbs;
      }
      const data = await addRecipe(requestData).unwrap();
      navigation.navigate(Meals_SCREEN, { id: data.id, add: true });
    } catch (error) {
      console.log(error);
      await handleGenericError(error, dispatch);
    }
  };

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

  const onSubmit = async (request: AddMealNameRequest) => {
    try {
      const res = await mealNameRequest({
        prompt: request.name
      }).unwrap();
      if (res.sugarIndex > 60) {
        dispatch(
          showMessageModal({
            headerText: tt('Cannot add'),
            messageText: tt(
              `This dish contains a high sugar Index value = ${res.sugarIndex} , so it cannot be added to your plan`
            ),
            buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
            messageType: MessageTypes.FAIL
          })
        );
      } else if (
        res.calories >= user.weekly_calories ||
        res.carbohydrates >= user.weekly_carbohydrates ||
        res.fats >= user.weekly_fats ||
        res.protein >= user.weekly_protein
      ) {
        dispatch(
          showMessageModal({
            headerText: tt('Cannot add'),
            messageText: tt(
              "This meal's nutriments surpass your weekly needs ! So cannot be added"
            ),
            buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
            messageType: MessageTypes.FAIL
          })
        );
      } else {
        setRes({
          carbohydrates: res.carbohydrates,
          cals: res.calories,
          fats: res.fats,
          protein: res.protein
        });
        setIsVisible(true);
      }
    } catch (error) {
      if (isErrorInterface(error) && error.status < ErrorCode.INTERNAL_SERVER) {
        const mappederror = mapErrorResponse(error);
        await handleAddMealError(mappederror, dispatch);
      } else {
        await handleGenericError(error, dispatch);
      }
    }
  };

  const onPress = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <AddCustomMeal
      control={control}
      onClose={onClose}
      visible={visible}
      onPress={onPress}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmit={onSubmit}
      onImageLibraryPress={onImageLibraryPress}
      controlImage={controlImage}
      urii={uri}
      meal={meal}
      isVisible={isVisible}
      controlForm={controlForm}
      handleSubmitForm={handleSubmitForm}
      onNewRecipeSubmit={onNewRecipeSubmit}
      errorsForm={errorsForm}
      fats={res != null ? res?.fats : 0}
      protein={res != null ? res?.protein : 0}
      carbohydrates={res?.carbohydrates != null ? res?.carbohydrates : 0}
      cals={res != null ? res?.cals : 0}
      onCancel={() => setIsVisible(false)}
    />
  );
};

export default AddCustomMealContainer;
