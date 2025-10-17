import React from 'react';
import { Text, View } from 'react-native';
import { Button } from '../../../../../components/Button/Button';
import { NumberInput } from '../../../../../components/NumberInput/NumberInput';
import { Header } from '../../../Components/Header/Header';
import { tt } from '../../../../../locales/translation.config';
import { stylesCompleteProfile2 } from './completeProfile2Styles';
import { stylesCompleteProfile1 } from '../CompleteProfile1/completeProfile1Styles';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Color } from '../../../../../utils/StylingConsts/Colors/Colors';

interface CompletePr2PresenterProps {
  height: string;
  heightd: string;
  weight: string;
  weightd: string;
  handlePress: () => void;
  setHeightDecimal: (heightd: string) => void;
  setHeight: (height: string) => void;
  setWeightDecimal: (weightd: string) => void;
  setWeight: (weight: string) => void;
  onChangeDate: ({ type }: { type: any }, selectedDate: any) => void;
  goToNext2: () => void;
  setDate: (birthdate: string) => void;
  date: Date;
  birthdate: string;
  onPressDatePickerShow: () => void;
  isPickerVisible: boolean;
  validateWeight: () => void;
  validateHeight: () => void;
  isLoading: boolean;
}

export const CompleteProfile2: React.FC<CompletePr2PresenterProps> = ({
  handlePress,
  height,
  heightd,
  birthdate,
  isPickerVisible,
  setHeightDecimal,
  setHeight,
  weight,
  weightd,
  isLoading,
  setDate,
  goToNext2,
  setWeightDecimal,
  setWeight,
  onChangeDate,
  date,
  onPressDatePickerShow,
  validateWeight,
  validateHeight
}) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Color.colorWhite }}>
      <Header title={tt('Step 2/4')} handlePress={handlePress} medium={true} />

      <View style={stylesCompleteProfile2.screen}>
        <Text style={stylesCompleteProfile1.StyleText2}>
          {' '}
          {tt('Complete your profile information')}
        </Text>

        <View style={stylesCompleteProfile2.inputsContainer}>
          <View style={stylesCompleteProfile2.inputcontainer}>
            <NumberInput
              title={tt('Height') + '      '}
              value={height}
              onChange={(value) => {
                setHeight(value);
              }}
              max={1}
            />
          </View>
          <View style={stylesCompleteProfile2.inputcontainer}>
            <NumberInput
              title={', '}
              value={heightd}
              onChange={(value) => {
                setHeightDecimal(value);
                validateHeight();
              }}
              max={2}
            />
          </View>
        </View>

        <View style={stylesCompleteProfile2.inputsContainer}>
          <View style={stylesCompleteProfile2.inputcontainer}>
            <NumberInput
              title={tt('Weight') + '      '}
              value={weight}
              onChange={(value) => {
                setWeight(value);
              }}
              max={2}
            />
          </View>
          <View style={stylesCompleteProfile2.inputcontainer}>
            <NumberInput
              title={', '}
              value={weightd}
              onChange={(value) => {
                setWeightDecimal(value);
                validateWeight();
              }}
              max={2}
            />
          </View>
        </View>

        <View style={stylesCompleteProfile2.inputsContainer}>
          <View style={stylesCompleteProfile2.inputcontainer}>
            <NumberInput
              isPickerVisible={isPickerVisible}
              onPress={onPressDatePickerShow}
              showDatePicker
              date={date}
              style={stylesCompleteProfile2.width}
              title={tt('Birthdate') + '      '}
              value={birthdate}
              onChange={(value) => {
                setDate(value);
              }}
              onChangeDate={onChangeDate}
              max={10}
            />
          </View>
        </View>

        <View style={stylesCompleteProfile1.buttonNextContainer}>
          <Button
            style={[stylesCompleteProfile1.buttonNext]}
            textStyles={[stylesCompleteProfile1.buttonNext]}
            title={tt('Next')}
            disabled={false}
            onTap={goToNext2}
            enabledActiveOpacity={true}
            isloading={isLoading}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};
