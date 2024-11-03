import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { stylesUserCard } from '../UserInfoCard/userCardStyles';
import { Card } from '@rneui/themed';
import { tt } from '../../../../locales/translation.config';
import { stylesPlansCard } from './nutritionPlanCardStyles';
import NutrimentsEatenWeekly from '../../../UserInfos/Components/NutrimentsEatenWeekly/NutrimentsEatenWeekly';
import { useAppSelector } from '../../../../hooks/hooks';

interface CardsComponentsProps {
  data: IMealsOfPlanResponseDoctor;
  navigateToYourPlan: () => void;
  nutrients: any;
}

export const NutritionPlanCardPresenter: React.FC<CardsComponentsProps> = ({
  data,
  nutrients,
  navigateToYourPlan
}) => {
  const user = useAppSelector((state) => state.user);
  console.log(user);
  return (
    <>
      <ScrollView showsVerticalScrollIndicator>
        <View style={stylesPlansCard.container}>
          <Card containerStyle={stylesPlansCard.cardBorder}>
            <Card.Title style={stylesPlansCard.cardTitle}>
              {data.planName}
            </Card.Title>
            <View style={stylesPlansCard.cardContent}>
              <NutrimentsEatenWeekly
                title={tt('Weekly Carbohydrates')}
                eaten={nutrients.carbs}
                goal={parseFloat(user.weekly_carbohydrates.toFixed(2))}
              />
              <NutrimentsEatenWeekly
                title={tt('Weekly Fats')}
                eaten={nutrients.fats}
                goal={parseFloat(user.weekly_fats.toFixed(2))}
              />
              <NutrimentsEatenWeekly
                title={tt('Weekly Calories')}
                eaten={nutrients.protein}
                goal={parseFloat(user.weekly_calories.toFixed(2))}
              />
              <NutrimentsEatenWeekly
                title={tt('Weekly Lipids')}
                eaten={nutrients.lipids}
                goal={parseFloat(user.weekly_protein.toFixed(2))}
              />

              <View style={stylesUserCard.bottomContent}>
                <TouchableOpacity
                  style={stylesUserCard.touchable}
                  onPress={navigateToYourPlan}>
                  <Text style={stylesUserCard.touchableText}>
                    {' '}
                    {tt('View Plan')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

export default NutritionPlanCardPresenter;
