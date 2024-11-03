import React from 'react';
import { Text, View } from 'react-native';
import { tt } from '../../../../../locales/translation.config';
import { Header } from '../../../Components/Header/Header';
import CheckBox from '../../../../../components/checkbox/Checkbox';
import { stylesCompleteProfile3 } from './completeProfileStyles';
import { Button } from '../../../../../components/Button/Button';
import { stylesCompleteProfile1 } from '../CompleteProfile1/completeProfile1Styles';
import { DiseasesClient } from '../../../../../interfaces/diseases/diseasesResponse.interface';
import { HasSportActivity } from '../../../../../enums/SportActivity.enum';
interface SportActivity {
  id: HasSportActivity;
  value: string;
}
interface CompletePr3PresenterProps {
  handlePress: () => void;
  data: DiseasesClient[] | undefined;
  dataSport: SportActivity[];
  activityChecked: HasSportActivity;
  onActivityChange: (id: HasSportActivity) => void;
  colorsChecked: { [key: number]: boolean };
  onChange: (isChecked: boolean, itemName: string | number) => void;
  goToNext2: () => void;
  isLoading: boolean;
}

export const CompleteProfile3: React.FC<CompletePr3PresenterProps> = ({
  handlePress,
  isLoading,
  data,
  dataSport,
  activityChecked,
  onActivityChange,
  colorsChecked,
  onChange,
  goToNext2
}) => {
  return (
    <>
      <Header title={tt('Step 3/4')} handlePress={handlePress} medium={false} />

      <View style={stylesCompleteProfile3.container}>
        <Text style={stylesCompleteProfile3.heading}>
          Check disease to track:
        </Text>
        {data?.map(({ id, name }) => (
          <CheckBox
            key={id}
            label={name}
            isChecked={colorsChecked[id]}
            onChange={(isChecked) => {
              onChange(isChecked, id);
              isChecked;
            }}
          />
        ))}
      </View>

      <View style={stylesCompleteProfile3.container}>
        <Text style={stylesCompleteProfile3.heading}>
          Select your activity level:
        </Text>
        {dataSport.map(({ id, value }) => (
          <CheckBox
            key={id}
            label={value}
            isChecked={activityChecked === id}
            onChange={() => onActivityChange(id)}
          />
        ))}
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
    </>
  );
};
