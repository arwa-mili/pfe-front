import React, { useState } from 'react';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import CompleteProfile4 from './CompleteProfile4';
import { CompleteProfileParamList } from '../../../../../navigation/routes/CompleteProfileStack';
import { Complete4_SCREEN } from '../../../../../utils/consts/screensNames/ScreensNames';
import { EditProfileRequest } from '../../../../../models/User';
import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import { useEditProfileMutation } from '../../../../../store/apis/userProfileApis/userProfileApis';
import { handleGenericError } from '../../../../../utils/helpers/Errors';
import { loadSplash, setUser } from '../../../../../hooks/Slices/AuthSlice';
import { setCurrentUserInfos } from '../../../../../hooks/Slices/UserSlice';

/**
 * Container used to separate CompleteProfile4 logic as a wrapper to CompleteProfile4 screen
 * @returns JSX.Element
 */

type Complete4Props = NativeStackScreenProps<
  CompleteProfileParamList,
  typeof Complete4_SCREEN
>;

const CompleteProfile4Container: React.FC<Complete4Props> = ({
  navigation
}): JSX.Element => {
  const [isDiabetiesHistoryActive, setIsDiabetiesHistoryActive] =
    useState(false);
  const [isCardioHistoryActive, setIsCardioHistoryActive] = useState(false);
  const [isLoadiing, setIsLoadiing] = useState(false);
  const [updateProfile] = useEditProfileMutation();
  const dispatch = useAppDispatch();
  const userId = useAppSelector((state) => state.user.id);
  const auth = useAppSelector((state) => state.user);

  const goToNext = async () => {
    try {
      setIsLoadiing(true);
      const updateUserDto: EditProfileRequest = {
        historyDiabeties: isDiabetiesHistoryActive ? 1 : 0,
        historyHeartDisease: isCardioHistoryActive ? 1 : 0
      };

      if (userId !== null) {
        setIsLoadiing(true);
        await updateProfile({
          updateUserDto,
          id: userId as number
        }).unwrap();
        dispatch(setUser({ isFirstSignedUp: false }));
        dispatch(
          setCurrentUserInfos({
            cardiohist: isCardioHistoryActive ? true : false,
            diabhist: isDiabetiesHistoryActive ? true : false
          })
        );
        dispatch(loadSplash({ loadSplash: true }));
      }
    } catch (error) {
      handleGenericError(error, dispatch);
    } finally {
      setIsLoadiing(false);
      console.log(auth);
    }
  };
  return (
    <CompleteProfile4
      handlePress={() => navigation.goBack()}
      isDiabetiesHistoryActive={isDiabetiesHistoryActive}
      setDiabetiesHistoryActive={() => setIsDiabetiesHistoryActive(true)}
      setDiabetiesHistoryFalse={() => setIsDiabetiesHistoryActive(false)}
      goToNext={goToNext}
      isLoading={isLoadiing}
      setCardioHistoryActive={() => setIsCardioHistoryActive(true)}
      setCardioHistoryFalse={() => setIsCardioHistoryActive(false)}
      isCardioHistoryActive={isCardioHistoryActive}
    />
  );
};

export default CompleteProfile4Container;
