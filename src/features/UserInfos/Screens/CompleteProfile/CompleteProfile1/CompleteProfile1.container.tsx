import React, { useState, useCallback } from 'react';
import * as ImagePicker from 'react-native-image-picker';
import { MediaType } from '../../../../../enums/MediaType';
import { CompleteProfile1 } from './CompleteProfile1';
import { ImagePickerResponse } from 'react-native-image-picker';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { isAndroidDevice } from '../../../../../utils/helpers/IsAndroidDevice';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompleteProfileParamList } from '../../../../../navigation/routes/CompleteProfileStack';
import {
  COMPLETE1_SCREEN,
  Complete2_SCREEN
} from '../../../../../utils/consts/screensNames/ScreensNames';
import { z } from 'zod';
import { handleGenericError } from '../../../../../utils/helpers/Errors';
import { useUpdateImageMutation } from '../../../../../store/apis/userProfileApis/userProfileApis';

type Complete1Props = NativeStackScreenProps<
  CompleteProfileParamList,
  typeof COMPLETE1_SCREEN
>;
const CompleteProfile1Container: React.FC<Complete1Props> = ({
  navigation
}): JSX.Element => {
  const [pickerResponse, setPickerResponse] = useState<
    ImagePickerResponse | undefined
  >(undefined);
  const [visible, setVisible] = useState(false);
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [gender, setGender] = useState<boolean | null>(null);
  const [isMaleActive, setIsMaleActive] = useState(false);
  const [isFemaleActive, setIsFemaleActive] = useState(false);
  const [isLoadiing, setIsLoadiing] = useState(false);
  const [setImage] = useUpdateImageMutation();
  const userId = useAppSelector((state) => state.user.id);
  const dispatch = useAppDispatch();
  const ImageSchema = z.object({
    uri: z.string(),
    type: z.enum(['image/jpeg', 'image/png']),
    name: z.string()
  });

  const validateSurname = () => {
    return surname !== '' && surname != null;
  };

  const validateName = () => {
    return name !== '' && name != null;
  };

  const setGenderMale = () => {
    setGender(false);
    setIsMaleActive(true);
    setIsFemaleActive(false);
  };
  const setGenderFemale = () => {
    setGender(true);
    setIsMaleActive(false);
    setIsFemaleActive(true);
  };

  const onPress = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  const onImageLibraryPress = useCallback(() => {
    const handleImageUpdate = async (
      urii: string,
      type: string,
      name: string
    ) => {
      try {
        const formData = new FormData();
        setIsLoadiing(true);
        formData.append('file', {
          uri: isAndroidDevice() ? urii : urii.replace('file://', ''),
          type: type,
          name: name
        });

        if (userId != null) {
          await setImage({ file: formData, id: userId });
        }
      } catch (error) {
        handleGenericError(error, dispatch);
      } finally {
        setIsLoadiing(false);
      }
    };
    const options = {
      selectLimit: 1,
      mediaType: MediaType.photo,
      includeBase64: false
    };

    ImagePicker.launchImageLibrary(options, async (response) => {
      setPickerResponse(response);

      if (response?.assets && response.assets.length > 0) {
        const selectedImage = response.assets[0];
        try {
          const { uri, type, name } = ImageSchema.parse(selectedImage);

          if (uri != null && type != null && name != null) {
            await handleImageUpdate(uri, type, name);
          }
        } catch (error) {}
      }
    });
  }, [ImageSchema, dispatch, setImage, userId]);

  const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;
  //console.log(uri);
  const goToNext = () => {
    navigation.navigate(Complete2_SCREEN, { name, surname, gender });
  };

  return (
    <>
      <CompleteProfile1
        uri={uri}
        onPress1={onPress}
        visible={visible}
        onImageLibraryPress={onImageLibraryPress}
        name={name}
        surname={surname}
        setName={setName}
        setSurname={setSurname}
        onClose={onClose}
        goToNext={goToNext}
        isValidSurname={validateSurname() || true}
        isValidName={validateName() || true}
        setGenderMale={setGenderMale}
        setGenderFemale={setGenderFemale}
        validateName={validateName}
        validateSurname={validateSurname}
        isMaleActive={isMaleActive}
        isFemaleActive={isFemaleActive}
        isLoading={isLoadiing}
      />
    </>
  );
};

export default CompleteProfile1Container;
