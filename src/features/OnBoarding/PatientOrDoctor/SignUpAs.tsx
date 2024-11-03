import React from 'react';
import { View } from 'react-native';
import { stylesCompleteProfile1 } from '../../UserInfos/Screens/CompleteProfile/CompleteProfile1/completeProfile1Styles';
import { Button } from '../../../components/Button/Button';
import { stylesGlobal } from '../../LoggedIn/Utils/styling/globalStyles';

/**
 * Represents PatientOrDoctor screen ui
 * @returns JSX.Element
 */
interface SignUpAsProps {
  onTapDoctor: () => void;
  onTapPatient: () => void;
}

const SignUpAs: React.FC<SignUpAsProps> = ({
  onTapDoctor,
  onTapPatient
}): JSX.Element => {
  return (
    <View style={stylesGlobal.container}>
      <View style={stylesCompleteProfile1.buttonsContainer}>
        <Button
          style={[
            stylesCompleteProfile1.buttonMan,
            stylesCompleteProfile1.buttonActive
          ]}
          title={'Doctor'}
          onTap={onTapDoctor}
          enabledActiveOpacity={true}
          isloading={false}
        />
        <Button
          style={[
            stylesCompleteProfile1.buttonWoman,
            stylesCompleteProfile1.buttonActive
          ]}
          title={'Patient'}
          onTap={onTapPatient}
          enabledActiveOpacity={true}
          isloading={false}
        />
      </View>
    </View>
  );
};

export default SignUpAs;
