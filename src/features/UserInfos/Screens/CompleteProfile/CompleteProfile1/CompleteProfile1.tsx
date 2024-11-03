import { ImageSourcePropType, Text, View } from 'react-native';
import { stylesCompleteProfile1 } from './completeProfile1Styles';
import { ImagePickerAvatar } from '../../../Components/ImagePickerAvatar/ImagePickerAvatar';
import { ImagePickerModal } from '../../../Components/ImagePickerModal/ImagePickerModal';
import { Button } from '../../../../../components/Button/Button';
import { InputFieldWithText } from '../../../../../components/InputFieldWithText/InputFieldWithText';
import { tt } from '../../../../../locales/translation.config';
import React from 'react';
import Header from '../../../Components/Header/Header';
import { Color } from '../../../../../utils/StylingConsts/Colors/Colors';
interface CompletePr1PresenterProps {
  uri: ImageSourcePropType | undefined | any;
  onPress1: () => void;
  visible: boolean;
  onClose: () => void;
  onImageLibraryPress: () => void;
  goToNext: () => void;
  isValidSurname: boolean;
  isValidName: boolean;
  isLoading: boolean;
  validateName: (name: string) => void;
  validateSurname: (surname: string) => void;
  name: string;
  surname: string;
  isFemaleActive: boolean;
  isMaleActive: boolean;
  setName: (name: string) => void;
  setSurname: (surname: string) => void;
  setGenderFemale: () => void;
  setGenderMale: () => void;
}

export const CompleteProfile1: React.FC<CompletePr1PresenterProps> = ({
  uri,
  onPress1,
  visible,
  onClose,
  onImageLibraryPress,
  goToNext,
  validateName,
  validateSurname,
  isLoading,
  name,
  surname,
  setGenderFemale,
  setName,
  setSurname,
  setGenderMale,
  isValidName,
  isValidSurname,
  isFemaleActive,
  isMaleActive
}) => {
  function handlePress(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <>
      <View style={stylesCompleteProfile1.screen}>
        <Header
          title={tt('Step 1/4')}
          handlePress={handlePress}
          medium={true}
        />
        <Text style={stylesCompleteProfile1.StyleText2}>
          {' '}
          {tt('Hi , what is your name ?')}
        </Text>
        <ImagePickerAvatar uri={uri} onPress={onPress1} changeable={true} />
        <ImagePickerModal
          isVisible={visible}
          onClose={onClose}
          onImageLibraryPress={onImageLibraryPress}
        />

        <View style={stylesCompleteProfile1.inputsContainer}>
          <InputFieldWithText
            title={tt('Name')}
            placeholder={tt('Tap your name. Ex:Sami')}
            value={name}
            placeholderTextColor={Color.colorTransparent}
            onChange={(name) => {
              validateName(name);
              setName(name);
            }}
            condition={isValidName}
            errorText={tt('Name is required')}
          />
        </View>

        <View style={stylesCompleteProfile1.inputsContainer}>
          <InputFieldWithText
            title={tt('Surname')}
            placeholder={tt('Tap your family name. Ex:Ben Amor')}
            value={surname}
            placeholderTextColor={Color.colorTransparent}
            onChange={(surname) => {
              validateSurname(surname);
              setSurname(surname);
            }}
            condition={isValidSurname}
            errorText={tt('Family Name is required')}
          />
        </View>

        <View style={stylesCompleteProfile1.buttonsContainer}>
          <Button
            style={[
              stylesCompleteProfile1.buttonMan,
              isMaleActive && stylesCompleteProfile1.buttonActive
            ]}
            title={tt('Man')}
            onTap={setGenderMale}
            enabledActiveOpacity={false}
            isloading={false}
          />
          <Button
            style={[
              stylesCompleteProfile1.buttonWoman,
              isFemaleActive && stylesCompleteProfile1.buttonActive
            ]}
            title={tt('Woman')}
            onTap={setGenderFemale}
            enabledActiveOpacity={false}
            isloading={false}
          />
        </View>

        <View style={stylesCompleteProfile1.buttonNextContainer}>
          <Button
            style={[stylesCompleteProfile1.buttonNext]}
            textStyles={[stylesCompleteProfile1.buttonNext]}
            title={tt('Next')}
            disabled={!isValidSurname || !isValidName}
            onTap={goToNext}
            enabledActiveOpacity={true}
            isloading={isLoading}
          />
        </View>
      </View>
    </>
  );
};
