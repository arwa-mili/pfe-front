import { ScrollView } from 'react-native';
import { View, Text } from 'react-native';
import React from 'react';
import { stylesProfile } from './userProfileStyles';
import CardPresenter from '../../../LoggedIn/Components/UserInfoCard/Card';
import NutritionPlanCardPresenter from '../../../LoggedIn/Components/NutritionPlanCard/NutritionPlanCard';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { Header } from '../../Components/Header/Header';
import { tt } from '../../../../locales/translation.config';
interface UserProfilePresenterProps {
  onClickEditProfile: () => void;
  onPressHealthTracks: () => void;
  onPressMedicalReports: () => void;
  navigateToYourPlan: () => void;
  data: IMealsOfPlanResponseDoctor;
  nutriments: any;
}

const UserProfile: React.FC<UserProfilePresenterProps> = ({
  onClickEditProfile,
  onPressHealthTracks,
  onPressMedicalReports,
  navigateToYourPlan,
  nutriments,
  data
}) => {
  return (
    <View style={stylesProfile.mainView}>
      <ScrollView>
        <View style={stylesProfile.elementsView}>
          <Header medium={true} title={tt('Profile')} />
          <View>
            <CardPresenter
              onClickEditProfile={onClickEditProfile}
              onPressMedicalReports={onPressMedicalReports}
              onPressHealthTracks={onPressHealthTracks}
            />
          </View>
          <View style={stylesProfile.nutritionPlan}>
            <Text style={stylesProfile.textStyling}>
              {' '}
              {tt('My Nutrition Plan :')}
            </Text>
            <View>
              <NutritionPlanCardPresenter
                data={data}
                nutrients={nutriments}
                navigateToYourPlan={navigateToYourPlan}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default UserProfile;
