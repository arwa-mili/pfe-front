import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  Dimensions,
  ScrollView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { weekdayMealsStyles } from './weekdayMealsStyles';
import { IMealsOfPlanResponseDoctor } from '../../../../interfaces/meals/mealsInPlanResponseDoctor.interface';
import { Days } from '../../../../utils/consts/days/days';

const { width } = Dimensions.get('window');

interface WeekdayMealsProps {
  mealsTypes: MealType[];
  handleAddMealPress: (mealType: MealType, dayIndex: number) => void;
  data: IMealsOfPlanResponseDoctor | never[];
}

export interface MealType {
  title: string;
}

const SubItemList: React.FC<{
  items: { title: string }[];
  expanded: boolean;
}> = ({ items, expanded }) => {
  const containerHeight = useRef(
    new Animated.Value(expanded ? items.length * 70 : 0)
  ).current;

  Animated.timing(containerHeight, {
    toValue: expanded ? items.length * 70 : 0,
    duration: 300,
    useNativeDriver: false
  }).start();

  return (
    <Animated.View style={{ height: containerHeight, overflow: 'hidden' }}>
      {items.map((item, index) => (
        <View key={index} style={weekdayMealsStyles.subItem}>
          <Text>{item.title}</Text>
        </View>
      ))}
    </Animated.View>
  );
};

const WeekdayMeals: React.FC<WeekdayMealsProps> = ({
  mealsTypes,
  handleAddMealPress,
  data
}) => {
  const [expandedItems, setExpandedItems] = useState<{
    [key: number]: boolean;
  }>({});
  const scrollX = useRef(new Animated.Value(0)).current;
  const [selectedDay, setSelectedDay] = useState<number>(0);

  const toggleExpand = (index: number) => {
    setExpandedItems((prevItems) => ({
      ...prevItems,
      [index]: !prevItems[index]
    }));
  };

  const renderDaySlider = () => {
    const days = [
      Days.Sunday,
      Days.Monday,
      Days.Tuesday,
      Days.Wednesday,
      Days.Thursday,
      Days.Friday,
      Days.Saturday
    ];

    return (
      <View style={weekdayMealsStyles.daySlider}>
        {days.map((day, index) => (
          <TouchableOpacity
            key={index}
            style={[
              weekdayMealsStyles.dayItem,
              selectedDay === index && weekdayMealsStyles.selectedDayItem
            ]}
            onPress={() => {
              setSelectedDay(index);
              scrollFlatList(index);
            }}>
            <Text
              style={[
                weekdayMealsStyles.dayText,
                selectedDay === index && weekdayMealsStyles.selectedDayText
              ]}>
              {day}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const scrollFlatList = (index: number) => {
    const yOffset = index * width;
    flatListRef.current?.scrollToOffset({ offset: yOffset });
  };

  const renderItem = ({ item, index }: { item: MealType; index: number }) => (
    <TouchableOpacity onPress={() => toggleExpand(index)}>
      <View style={weekdayMealsStyles.item}>
        <Text style={weekdayMealsStyles.title}>{item.title}</Text>
        <TouchableOpacity onPress={() => handleAddMealPress(item, selectedDay)}>
          <FontAwesome name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
      {expandedItems[index] && !Array.isArray(data) && (
        <View style={weekdayMealsStyles.meal}>
          <SubItemList
            items={data.weekdaysMeals
              .filter((meal) => meal.day === selectedDay)
              .flatMap((meal) =>
                meal.meals_pertype.flatMap((meal_pertype) =>
                  meal_pertype.meals.map((meall) => ({ title: meall.name }))
                )
              )}
            expanded={true}
          />
        </View>
      )}
    </TouchableOpacity>
  );

  const flatListRef = useRef<FlatList | null>(null);

  return (
    <View style={weekdayMealsStyles.container}>
      {renderDaySlider()}
      <View style={weekdayMealsStyles.flatlistContainer}>
        <FlatList
          style={weekdayMealsStyles.flatlist}
          ref={flatListRef}
          data={mealsTypes}
          keyExtractor={(meal, index) => `meal_${index}`}
          renderItem={renderItem}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollX } } }],
            { useNativeDriver: false }
          )}
        />
      </View>
    </View>
  );
};

export default WeekdayMeals;
