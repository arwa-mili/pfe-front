import React, { useState, useMemo } from 'react';
import { CompleteProfile3 } from './CompleteProfile3';

import { useAppDispatch, useAppSelector } from '../../../../../hooks/hooks';
import Loader from '../../../../../components/Loader/Loader';
import { showMessageModal } from '../../../../../hooks/Slices/MessageModalSlice';
import { MessageTypes } from '../../../../../enums/MessageTypes';
import { tt } from '../../../../../locales/translation.config';
import { CompleteProfileParamList } from '../../../../../navigation/routes/CompleteProfileStack';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import {
  Complete3_SCREEN,
  Complete4_SCREEN
} from '../../../../../utils/consts/screensNames/ScreensNames';
import { handleGenericError } from '../../../../../utils/helpers/Errors';
import {
  setCurrentUserInfos,
  setDiseasesOfUser
} from '../../../../../hooks/Slices/UserSlice';
import { MODAL_BUTTONS_TEXTS } from '../../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';
import {
  useAddDiseaseOfUserMutation,
  useEditProfileMutation,
  useGetAlldiseasesQuery
} from '../../../../../store/apis/userProfileApis/userProfileApis';
import { HasSportActivity } from '../../../../../enums/SportActivity.enum';
import { EditProfileRequest } from '../../../../../models/User';

type Complete3Props = NativeStackScreenProps<
  CompleteProfileParamList,
  typeof Complete3_SCREEN
>;

const CompleteProfile3Container: React.FC<Complete3Props> = ({
  navigation
}): JSX.Element => {
  const [addDisease] = useAddDiseaseOfUserMutation();
  const [updateProfile] = useEditProfileMutation();
  const [, setMessageText] = useState('');
  const [loadButton, setLoadButton] = useState<boolean>(false);

  const dispatch = useAppDispatch();

  const user = useAppSelector((state) => state.user);
  const userId = user.id;

  const { data, isLoading, isFetching } = useGetAlldiseasesQuery();

  const diseasedata = data?.map((disease) => disease.id) ?? [];
  const initialDiseasesChecked = Object.fromEntries(
    diseasedata.map((d: number) => [d, false])
  );
  const [diseasesChecked, setDiseasesChecked] = useState<{
    [key: number]: boolean;
  }>(initialDiseasesChecked);

  const [activityChecked, setActivityChecked] = useState<HasSportActivity>(2);

  const handleCheckBoxChange = (
    isChecked: boolean,
    itemName: string | number
  ) => {
    setDiseasesChecked({ ...diseasesChecked, [itemName]: isChecked });
  };

  const handleActivityChange = (id: HasSportActivity) => {
    setActivityChecked(id);
  };

  const handlePress = async () => {};

  const selectedDiseaseNames = useMemo(() => {
    return Object.keys(diseasesChecked)
      .filter((name) => diseasesChecked[parseInt(name, 10)])
      .map((id) => parseInt(id, 36))

      .map((id) => {
        const disease = data?.find((d) => d.id === id);
        return disease ? disease.name : '';
      });
  }, [diseasesChecked, data]);

  const diseaseSubmit = async () => {
    const checkedDiseaseIDs = Object.keys(diseasesChecked)
      .filter((name) => diseasesChecked[parseInt(name, 10)])
      .map((id) => parseInt(id, 36));

    dispatch(setDiseasesOfUser(checkedDiseaseIDs));
    try {
      const updateUserDto: EditProfileRequest = {
        sport_Activity: activityChecked
      };
      setLoadButton(true);

      await addDisease({
        diseases: { diseases: checkedDiseaseIDs },
        id: userId as number
      });
      const res = await updateProfile({
        updateUserDto,
        id: userId as number
      }).unwrap();
      navigation.navigate(Complete4_SCREEN);

      dispatch(
        setCurrentUserInfos({
          sportActivity: res.sport_Activity,
          weekly_calories: res.weekly_calories,
          weekly_carbohydrates: res.weekly_carbohydrates,
          weekly_fats: res.weekly_fats,
          weekly_protein: res.weekly_protein,
          diseases_of_user: checkedDiseaseIDs
        })
      );
    } catch (error) {
      handleGenericError(error, dispatch);
    } finally {
      setLoadButton(false);
    }
  };
  const showModal = async () => {
    dispatch(
      showMessageModal({
        headerText: tt('Are you sure to submit those info ?'),
        messageText:
          selectedDiseaseNames.join(' ') +
          '\n' +
          'Activity: ' +
          HasSportActivity[activityChecked],
        altbuttonText: MODAL_BUTTONS_TEXTS.REFUSE,
        buttonText: MODAL_BUTTONS_TEXTS.YES,
        messageType: MessageTypes.DECISION,
        onReject: () => {
          setMessageText('');
        },
        onProceed: () => {
          diseaseSubmit();
        }
      })
    );
  };

  return isLoading || isFetching ? (
    <Loader loading />
  ) : (
    <>
      <CompleteProfile3
        handlePress={handlePress}
        colorsChecked={diseasesChecked}
        onChange={handleCheckBoxChange}
        goToNext2={showModal}
        data={data}
        isLoading={loadButton}
        dataSport={[
          { id: HasSportActivity.Sedentary, value: 'Sedentary' },

          {
            id: HasSportActivity.Lightly_Active,
            value: 'Lightly_Active'
          },
          {
            id: HasSportActivity.Moderately_Active,
            value: 'Moderately_Active'
          },
          { id: HasSportActivity.Very_Active, value: 'Very_Active' },
          { id: HasSportActivity.Extra_Active, value: 'Extra_Active' }
        ]}
        activityChecked={activityChecked}
        onActivityChange={handleActivityChange}
      />
    </>
  );
};
export default CompleteProfile3Container;
