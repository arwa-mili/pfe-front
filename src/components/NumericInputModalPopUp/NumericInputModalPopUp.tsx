import React, { useState } from 'react';
import { View, Modal, StyleSheet } from 'react-native';
import { stylesNumericPopUp } from './numericInputModalPopUpStyles';
import { Button } from '../Button/Button';
import NumericInput from 'react-native-numeric-input';
import { isAndroidDevice } from '../../utils/helpers/IsAndroidDevice';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { stylesGlobal } from '../../features/LoggedIn/Utils/styling/globalStyles';
import { tt } from '../../locales/translation.config';
interface NumericInputModalPopUpProps {
  isVisible: boolean;
  onCancel: () => void;
  onSave: () => void;
  max: number;
  min: number;
  handleSubmit: (newMeasure: number) => void;
}

const NumericInputModalPopUp: React.FC<NumericInputModalPopUpProps> = ({
  isVisible,
  onCancel,
  min,
  max,
  handleSubmit
}) => {
  const [newMeasure, setNewMeasure] = useState(min);

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
        <View style={stylesNumericPopUp.container}>
          <NumericInput
            inputStyle={stylesNumericPopUp.textInput}
            value={newMeasure}
            onChange={setNewMeasure}
            minValue={min}
            maxValue={max}
            type="up-down"
            rounded
            valueType="real"
            step={0.01}
          />
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
              onTap={() => handleSubmit(newMeasure)}
              enabledActiveOpacity={true}
              isloading={false}
            />
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default NumericInputModalPopUp;
