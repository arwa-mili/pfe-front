import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Plan } from '../../../../models/Plan';
import { stylesDoctorSearchMeals } from '../SearchMealsDoctor/searchMealsDoctorStyles';
import SearchComponent from '../../Components/searchBar/searchBar';
import UserPlansFlatlist from '../../Components/UserPlansFlatlist/UserPlansFlatlist';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { userCreatedPlans } from './userCreatedPlansStyles';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

/**
 * Represents UserCreatedPlans screen ui
 * @returns JSX.Element
 */
interface UserCreatedPlansProps {
  data: Plan[];
  handlePress: (id: number) => void;
  handleLoadMore: () => void;
  handleAddPlan: () => void;
  loadMoreVisible: boolean;
}

const UserCreatedPlans: React.FC<UserCreatedPlansProps> = ({
  data,
  handlePress,
  handleLoadMore,
  handleAddPlan,
  loadMoreVisible
}): JSX.Element => {
  return (
    <View style={stylesDoctorSearchMeals.maincontainer}>
      <View style={userCreatedPlans.topContent}>
        <View style={userCreatedPlans.searchBarContainer}>
          <SearchComponent
            placeholderText={'Search By Plan Name'}
            sorting={false}
          />
        </View>
        <TouchableOpacity
          onPress={handleAddPlan}
          style={userCreatedPlans.addIcon}>
          <Icons.Material name="add-box" color={Color.colorBlack} size={50} />
        </TouchableOpacity>
      </View>
      {data.length ? (
        <UserPlansFlatlist
          data={data}
          handlePress={handlePress}
          handleLoadMore={handleLoadMore}
          loadMoreVisible={loadMoreVisible}
        />
      ) : (
        <View>
          <Image
            style={stylesDoctorSearchMeals.image}
            source={Images.nomeals}
          />
        </View>
      )}
    </View>
  );
};

export default UserCreatedPlans;
