import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FoodFlatlist from '../../Components/FoodFlatlist/FoodFlatlist';
import { MealsClient } from '../../../../interfaces/meals/mealsClient.interface';
import SearchComponent from '../../Components/searchBar/searchBar';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { stylesDoctorSearchMeals } from './searchMealsDoctorStyles';
import { stylesLogin } from '../../../OnBoarding/Screens/Login/loginStyle';
import { tt } from '../../../../locales/translation.config';

/**
 * Represents SearchMealsDoctor screen ui
 * @returns JSX.Element
 */
interface SearchMealsDoctorProps {
  data: MealsClient[];
  handlePress: (id: number) => void;
  navigateToAddCustomMeal: () => void;
  handleLoadMore: () => void;
  loadMoreVisible: boolean;
}

const SearchMealsDoctor: React.FC<SearchMealsDoctorProps> = ({
  data,
  handlePress,
  navigateToAddCustomMeal,
  handleLoadMore,
  loadMoreVisible
}): JSX.Element => {
  return (
    <View style={stylesDoctorSearchMeals.maincontainer}>
      <View style={stylesDoctorSearchMeals.searchBarContainer}>
        <SearchComponent
          placeholderText={'Search By Food Name'}
          sorting={false}
        />
      </View>
      <View style={stylesDoctorSearchMeals.flatListContainer}>
        {data.length ? (
          <FoodFlatlist
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
      <Text style={stylesLogin.text}>
        {tt("Can't find your meal ?")}
        <TouchableOpacity onPress={navigateToAddCustomMeal}>
          <Text style={stylesLogin.link}>{tt('Add Custom Meal')}</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

export default SearchMealsDoctor;
