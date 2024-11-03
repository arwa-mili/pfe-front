import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import UserCreatedPlans from './UserCreatedPlans';
import { AddNutritionPlanParamList } from '../../../../navigation/routes/AddNutritionplanStack';
import {
  ADDNUTRITIONPLAN_SCREEN,
  NUTRITIONPLAN_SCREEN,
  SelectedPlanById_SCREEN,
  USERCREATEDPLANS_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';

import { useAppSelector } from '../../../../hooks/hooks';
import { Plan } from '../../../../models/Plan';
import { useGetUserPlansQuery } from '../../../../store/apis/customMealApis/customMealApis';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { handleGenericError } from '../../../../utils/helpers/Errors';

interface UserCreatedPlansContainerProps
  extends NativeStackScreenProps<
    AddNutritionPlanParamList,
    typeof USERCREATEDPLANS_SCREEN
  > {}

const UserCreatedPlansContainer: React.FC<UserCreatedPlansContainerProps> = ({
  navigation
}): JSX.Element => {
  const dispatch = useDispatch();
  const id = useAppSelector((state) => state.user.id) as number;
  const [page, setPage] = useState(0);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [dataToSend, setDataToSend] = useState<Plan[]>([]);
  const userplan = useAppSelector((state) => state.user.current_plan);

  const { isFetching, isLoading, data, isError, error } = useGetUserPlansQuery({
    userid: id,
    page: page
  });

  useEffect(() => {
    if (data) {
      setDataToSend((prevData) => {
        const newData = data.userPlans.filter(
          (plan) =>
            !prevData.some((existingPlan) => existingPlan.id === plan.id)
        );
        return [...prevData, ...newData];
      });
      setLoadMoreVisible(page < data.totalPages - 1);
    }
  }, [data, page]);

  useEffect(() => {
    setLoading(isLoading, data, dispatch, isFetching);
  }, [isLoading, isFetching, dispatch, data]);

  useEffect(() => {
    if (isError) {
      dispatch(setLoaderFalse());
      handleGenericError(error, dispatch);
    }
  }, [isError, error, dispatch]);

  const handlePress = (id: number) => {
    userplan && id === userplan
      ? navigation.navigate(NUTRITIONPLAN_SCREEN)
      : navigation.navigate(SelectedPlanById_SCREEN, { id });
  };

  const handleLoadMore = () => {
    setPage(page + 1);
  };

  return (
    <UserCreatedPlans
      data={dataToSend}
      handlePress={handlePress}
      handleLoadMore={handleLoadMore}
      loadMoreVisible={loadMoreVisible}
      handleAddPlan={() => navigation.navigate(ADDNUTRITIONPLAN_SCREEN)}
    />
  );
};

export default UserCreatedPlansContainer;
