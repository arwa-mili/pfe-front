import React, { useState, useMemo } from 'react';
import { CompleteProfile2 } from './CompleteProfile2';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { EditProfileRequest } from '../../../../../models/User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CompleteProfileParamList } from '../../../../../navigation/routes/CompleteProfileStack';
import {
  Complete2_SCREEN,
  Complete3_SCREEN
} from '../../../../../utils/consts/screensNames/ScreensNames';
import { isAndroidDevice } from '../../../../../utils/helpers/IsAndroidDevice';
import { handleGenericError } from '../../../../../utils/helpers/Errors';
import { setCurrentUserInfos } from '../../../../../hooks/Slices/UserSlice';
import { useEditProfileMutation } from '../../../../../store/apis/userProfileApis/userProfileApis';

type Complete2Props = NativeStackScreenProps<
  CompleteProfileParamList,
  typeof Complete2_SCREEN
>;

const CompleteProfile2Container: React.FC<Complete2Props> = ({
  navigation,
  route
}): JSX.Element => {
  const userId = useAppSelector((state) => state.user);
  const { name, surname, gender } = route.params;
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');
  const [updateProfile] = useEditProfileMutation();
  const [weightd, setWeightd] = useState('');
  const [heightd, setHeightd] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [date, setDate] = useState(new Date());
  const [isPickerVisible, setIsPickerVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const calculateWeightNumber = useMemo(
    () => parseFloat(weight + '.' + weightd),
    [weight, weightd]
  );
  const calculateHeightNumber = useMemo(
    () => parseFloat(height + '.' + heightd),
    [height, heightd]
  );

  const dispatch = useAppDispatch();

  const onChangeDate = ({ type }: any, selectedDate: Date) => {
    if (type === 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      let birthdateString = currentDate.toISOString().substring(0, 10);
      //birthdateString = birthdateString.replace(/-/g, '/');
      if (isAndroidDevice()) {
        setBirthdate(birthdateString);
      }
      setIsPickerVisible(!isPickerVisible);
    }
  };
  const auth = useAppSelector((state) => state.user);
  console.log(auth);

  const validateWeight = async () => {
    await calculateWeightNumber;
  };

  const validateHeight = async () => {
    await calculateHeightNumber;
  };

  const handlePress = async () => {};

  const goToNext2 = async () => {
    const updateUserDto: EditProfileRequest = {
      weight: calculateWeightNumber,
      height: calculateHeightNumber,
      birthdate: birthdate,
      name: name,
      surname: surname,
      gender: gender === true ? 1 : gender === false ? 0 : null
    };

    if (userId !== null) {
      try {
        setIsLoading(true);
        const result = await updateProfile({
          updateUserDto,
          id: userId.id as number
        }).unwrap();
        navigation.navigate(Complete3_SCREEN);
        dispatch(
          setCurrentUserInfos({
            weight: result.weight,
            height: result.height,
            gender: result.gender,
            name: result.firstName,
            surname: result.familyName,
            BMI: result.BMI,
            phoneNumber: result.phoneNumber,

            age: result.age,
            weekly_calories: result.weekly_calories,
            weekly_carbohydrates: result.weekly_carbohydrates,
            weekly_fats: result.weekly_fats,
            weekly_protein: result.weekly_protein
          })
        );
      } catch (error) {
        handleGenericError(error, dispatch);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const onPressDatePickerShow = async () => {
    await setIsPickerVisible(true);
  };

  return (
    <>
      <CompleteProfile2
        height={height}
        heightd={heightd}
        weight={weight}
        weightd={weightd}
        handlePress={handlePress}
        setHeightDecimal={setHeightd}
        setHeight={setHeight}
        setWeightDecimal={setWeightd}
        setWeight={setWeight}
        goToNext2={goToNext2}
        onChangeDate={onChangeDate}
        setDate={setBirthdate}
        date={date}
        birthdate={birthdate}
        onPressDatePickerShow={onPressDatePickerShow}
        isPickerVisible={isPickerVisible}
        validateWeight={validateWeight}
        validateHeight={validateHeight}
        isLoading={isLoading}
      />
    </>
  );
};
export default CompleteProfile2Container;
