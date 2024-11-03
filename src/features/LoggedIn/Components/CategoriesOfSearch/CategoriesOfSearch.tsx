import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { stylesCatoegoriesForSearch } from './categoriesOfSearchStyles';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';

export type Doctorcategories = {
  id: string;
  name: string;
};
interface CategoriesOfSearchProps {
  data: Doctorcategories[];
  icon: boolean;
  handleSelection: (selectedCategoryName: string) => void;
}

const CategoriesOfSearch: React.FC<CategoriesOfSearchProps> = ({
  data,
  icon,
  handleSelection
}) => {
  const [selectedCategoryIndex, setSelectedCategoryIndex] =
    useState<string>('All');

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={
        stylesCatoegoriesForSearch.categoriesListContainer
      }>
      {data.map((category) => (
        <TouchableOpacity
          key={category.id}
          activeOpacity={0.8}
          onPress={() => {
            setSelectedCategoryIndex(category.id);
            handleSelection(category.id);
          }}>
          <View
            style={{
              backgroundColor:
                selectedCategoryIndex === category.id
                  ? Color.colorLighterOrange
                  : Color.colorGray,
              ...stylesCatoegoriesForSearch.categoryBtn
            }}>
            {icon && (
              <View style={stylesCatoegoriesForSearch.categoryBtnImgCon} />
            )}
            <Text
              style={[
                {
                  color:
                    selectedCategoryIndex === category.id
                      ? Color.secondary
                      : Color.primary
                },
                stylesCatoegoriesForSearch.textStyle
              ]}>
              {category.name}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

export default CategoriesOfSearch;
