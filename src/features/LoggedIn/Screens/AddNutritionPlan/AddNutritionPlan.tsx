import React, { useState } from 'react';
import {
  ImageBackground,
  RefreshControl,
  ScrollView,
  Text,
  View
} from 'react-native';
import CheckBoxGroup from '../../Components/CheckBoxGroup/CheckBoxGroup';
import { TextInputSimple } from '../../../UserInfos/Components/TextInputSimple/TextInputSimple';
import { addNutritionPlanStyle } from './addNutritionPlanStyles';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { mealStyles } from '../../Components/Meal/mealStyles';
import { tt } from '../../../../locales/translation.config';
import { Button } from '../../../../components/Button/Button';
import Header from '../../../UserInfos/Components/Header/Header';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';
import { PeopleCategory } from '../../../../enums/PeopleCategoris.enum';
import { DISEASES_NAMES } from '../../../../utils/consts/diseasesNames/diseasesNames';

/**
 * Represents AddNutritionPlan screen ui
 * @returns JSX.Element
 */
interface AddNutritionPlanProps {
  handleNext: () => void;
  title: string;
  setTitle: (title: string) => void;
  selectRelatedPeople: (values: (string | number)[]) => void;
  selectRelatedDiseases: (values: (string | number)[]) => void;
  titleError: string | null;
  isLoading: boolean;
  selectedDiseaseIds: number[];
}

const AddNutritionPlan: React.FC<AddNutritionPlanProps> = ({
  handleNext,
  title,
  titleError,
  setTitle,
  isLoading,
  selectRelatedPeople,
  selectRelatedDiseases,
  selectedDiseaseIds
}): JSX.Element => {
  const [refreshing, setRefreshing] = useState(false);

  const refreshPage = () => {
    setTitle('');
    setRefreshing(false);
  };

  return (
    <ScrollView
      contentContainerStyle={{ flexGrow: 1 }}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={() => {
            setRefreshing(true);
            refreshPage();
          }}
        />
      }>
      <ImageBackground
        source={Images.nutritionPlanBackground}
        resizeMode="cover"
        style={mealStyles.image}>
        <Header
          medium={true}
          style={{ backgroundColor: Color.colorWhitesmoke }}
        />

        <View style={addNutritionPlanStyle.mainview}>
          <View>
            <Text style={addNutritionPlanStyle.text}> {tt('Title')}</Text>
            <TextInputSimple
              withIcon={false}
              placeholder={tt('Set a Title')}
              name={'message'}
              error={titleError}
              style={addNutritionPlanStyle.textinputStyle}
              textStyle={addNutritionPlanStyle.textInput}
              val={title}
              onChange={(title) => setTitle(title)}
            />

            <Text style={addNutritionPlanStyle.text}>
              {tt('Diet Category')}
            </Text>
            <CheckBoxGroup
              options={[
                {
                  value: PeopleCategory.Vegetarian,
                  label: tt(PeopleCategory.Vegetarian)
                },
                {
                  value: PeopleCategory.GlutenFree,
                  label: tt(PeopleCategory.GlutenFree)
                },
                {
                  value: PeopleCategory.LowFat,
                  label: tt(PeopleCategory.LowFat)
                },
                {
                  value: PeopleCategory.LowSodium,
                  label: tt(PeopleCategory.LowSodium)
                },
                {
                  value: PeopleCategory.LowCarbs,
                  label: tt(PeopleCategory.LowCarbs)
                }
              ]}
              onSelectionChange={selectRelatedPeople}
            />
            <Text style={addNutritionPlanStyle.text}> Diseases Related</Text>
            <CheckBoxGroup
              stylebutton={addNutritionPlanStyle.buttons}
              options={[
                { value: 2, label: tt(DISEASES_NAMES.DIABETIES_TYPE_1) },
                { value: 3, label: tt(DISEASES_NAMES.DIABETIES_TYPE_2) },
                { value: 1, label: tt(DISEASES_NAMES.HYPERTENSION) }
              ]}
              onSelectionChange={selectRelatedDiseases}
              selected={selectedDiseaseIds}
            />
          </View>
          <Button
            textStyles={{ fontSize: FontSize.size_4xl, color: Color.colorGray }}
            title={tt('Next')}
            onTap={handleNext}
            enabledActiveOpacity={true}
            isloading={isLoading}
          />
        </View>
      </ImageBackground>
    </ScrollView>
  );
};

export default AddNutritionPlan;
