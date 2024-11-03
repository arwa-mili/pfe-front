import React from 'react';
import { Text, View } from 'react-native';
import { stylesCompleteProfile1 } from '../CompleteProfile1/completeProfile1Styles';
import { Button } from '../../../../../components/Button/Button';
import { tt } from '../../../../../locales/translation.config';
import Header from '../../../Components/Header/Header';

/**
 * Represents CompleteProfile4 screen ui
 * @returns JSX.Element
 */
interface CompleteProfile4Props {
  handlePress: () => void;
  setDiabetiesHistoryActive: () => void;
  setDiabetiesHistoryFalse: () => void;
  goToNext: () => void;
  isLoading: boolean;
  setCardioHistoryActive: () => void;
  setCardioHistoryFalse: () => void;
  isCardioHistoryActive: boolean;
  isDiabetiesHistoryActive: boolean;
}

const CompleteProfile4: React.FC<CompleteProfile4Props> = ({
  handlePress,
  isDiabetiesHistoryActive,
  setDiabetiesHistoryActive,
  setDiabetiesHistoryFalse,
  goToNext,
  isLoading,
  setCardioHistoryActive,
  setCardioHistoryFalse,
  isCardioHistoryActive
}): JSX.Element => {
  return (
    <>
      <View style={stylesCompleteProfile1.screen}>
        <Header
          title={tt('Step 4/4')}
          handlePress={handlePress}
          medium={true}
        />
        <Text> Do you have any family history of diabeties ?</Text>
        <View style={stylesCompleteProfile1.buttonsContainer}>
          <Button
            style={[
              stylesCompleteProfile1.buttonMan,
              isDiabetiesHistoryActive && stylesCompleteProfile1.buttonActive
            ]}
            title={tt('Yes')}
            onTap={setDiabetiesHistoryActive}
            enabledActiveOpacity={false}
            isloading={false}
          />
          <Button
            style={[
              stylesCompleteProfile1.buttonWoman,
              !isDiabetiesHistoryActive && stylesCompleteProfile1.buttonActive
            ]}
            title={tt('No')}
            onTap={setDiabetiesHistoryFalse}
            enabledActiveOpacity={false}
            isloading={false}
          />
        </View>
        <Text>
          {' '}
          Do you have any family history of cardiovascular diseases ?
        </Text>
        <View style={stylesCompleteProfile1.buttonsContainer}>
          <Button
            style={[
              stylesCompleteProfile1.buttonMan,
              isCardioHistoryActive && stylesCompleteProfile1.buttonActive
            ]}
            title={tt('Yes')}
            onTap={setCardioHistoryActive}
            enabledActiveOpacity={false}
            isloading={isLoading}
          />
          <Button
            style={[
              stylesCompleteProfile1.buttonWoman,
              !isCardioHistoryActive && stylesCompleteProfile1.buttonActive
            ]}
            title={tt('No')}
            onTap={setCardioHistoryFalse}
            enabledActiveOpacity={false}
            isloading={isLoading}
          />
        </View>
        <View style={stylesCompleteProfile1.buttonNextContainer}>
          <Button
            style={[stylesCompleteProfile1.buttonNext]}
            textStyles={[stylesCompleteProfile1.buttonNext]}
            title={tt('Next')}
            //disabled={!isValidSurname || !isValidName}
            onTap={goToNext}
            enabledActiveOpacity={true}
            isloading={isLoading}
          />
        </View>
      </View>
    </>
  );
};

export default CompleteProfile4;
