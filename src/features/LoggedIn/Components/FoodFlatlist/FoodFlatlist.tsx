import React from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TouchableOpacity
} from 'react-native';
import { stylesFoodFlatlist } from './foodFlatlistStyles';
import { MealsClient } from '../../../../interfaces/meals/mealsClient.interface';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

interface FoodFlatlistProps {
  data: MealsClient[];
  handlePress: (id: number) => void;
  handleLoadMore: () => void;
  loadMoreVisible: boolean;
}

interface RenderItemProps {
  item: MealsClient;
}

const FoodFlatlist: React.FC<FoodFlatlistProps> = ({
  data,
  handlePress,
  handleLoadMore,
  loadMoreVisible
}) => {
  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <View key={item.id} style={stylesFoodFlatlist.item}>
        <Text>{item.name}</Text>
        <TouchableOpacity onPress={() => handlePress(item.id)}>
          <FontAwesome name="plus" size={20} color="black" />
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <ScrollView>
      <FlatList
        data={data}
        renderItem={(item) => renderItem(item)}
        onEndReached={loadMoreVisible ? handleLoadMore : null}
        onEndReachedThreshold={1}
        keyExtractor={(item) => item.name}
      />
    </ScrollView>
  );
};

export default FoodFlatlist;
