import React from 'react';

import { type NativeStackScreenProps } from '@react-navigation/native-stack';

import SelectedPlanByIdContainer from './SelectedPlanByIdContainer';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import { SelectedPlanById_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { useGetPlanByIdQuery } from '../../../../store/apis/nutritionPlansApis/nutritionPlansApis';
import Header from '../../../UserInfos/Components/Header/Header';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { showMessageModal } from '../../../../hooks/Slices/MessageModalSlice';
import { tt } from '../../../../locales/translation.config';
import { MessageTypes } from '../../../../enums/MessageTypes';
import { MODAL_BUTTONS_TEXTS } from '../../../../utils/consts/modalMessagesConsts/modalMessagesConsts';
import { setCurrentPlan } from '../../../../hooks/Slices/UserSlice';
import { setPlanId } from '../../../../hooks/Slices/mealOfPlanSlice';
import { useAddPlanToUserMutation } from '../../../../store/apis/userPlansApis/userPlansApis';
import { handleGenericError } from '../../../../utils/helpers/Errors';

/**
 * Container used to separate SelectedPlanByIdContainer logic as a wrapper to SelectedPlanByIdContainer screen
 * @returns JSX.Element
 */
interface SelectedPlanByIdContainerContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof SelectedPlanById_SCREEN
  > {}

const SelectedPlanByIdContainerContainer: React.FC<
  SelectedPlanByIdContainerContainerProps
> = ({ navigation, route }): JSX.Element => {
  const id = route.params.id;
  const user = useAppSelector((state) => state.user);
  const dispatch = useAppDispatch();
  const [addPlanToUser] = useAddPlanToUserMutation();

  const { data } = useGetPlanByIdQuery({ id });

  const handleDelete = async (id: number) => {
    console.log(id);
  };
  const handleProceed = async () => {
    navigation.goBack();
  };

  const handleSubscribe = async (
    carbohydrates: number,
    fats: number,
    lipids: number,
    protein: number
  ) => {
    if (
      carbohydrates > user.weekly_carbohydrates ||
      fats > user.weekly_fats ||
      protein > user.weekly_protein ||
      lipids > user.weekly_calories
    ) {
      dispatch(
        showMessageModal({
          headerText: tt('Unable to add plan'),
          messageText: tt(
            'This plan nutriments are above your weekly needs ! choose another plan or alter plan'
          ),
          buttonText: MODAL_BUTTONS_TEXTS.ACCEPT,
          messageType: MessageTypes.FAIL,
          onProceed: () => {}
        })
      );
    } else {
      dispatch(setCurrentPlan(id));
      //set to null to force refetch day meals on rendering of home screen
      dispatch(setPlanId({ nutrition_plan_id: null }));
      try {
        await addPlanToUser({ userid: user.id as number, planid: id });
        dispatch(
          showMessageModal({
            messageType: MessageTypes.SUCCESS,
            headerText: 'Subscribed to plan Successfully',
            messageText: tt('You have successfully subscribed to plan !'),
            onProceed: () => {
              handleProceed();
            }
          })
        );
      } catch (error) {
        handleGenericError(error, dispatch);
      }
    }
  };

  return (
    <>
      <Header medium={true} />
      {data !== undefined && (
        <SelectedPlanByIdContainer
          mealsTypes={[
            { title: 'Breakfast' },
            { title: 'Lunch' },
            { title: 'Dinner' },
            { title: 'Snack' }
          ]}
          handleAddMealPress={(item, index) => console.log(item.title, index)}
          handleSubscribe={handleSubscribe}
          data={data}
          isloading={false}
          handleDelete={() => handleDelete(id)}
        />
      )}
    </>
  );
};

export default SelectedPlanByIdContainerContainer;
