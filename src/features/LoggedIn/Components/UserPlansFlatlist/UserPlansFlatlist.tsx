import React from 'react';
import { View, Text, TouchableOpacity, FlatList, Image } from 'react-native';
import { stylesUserPlanFlatlist } from './userPlansFlatlistStyles';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { stylesDoctorsCard } from '../DoctorsCard/doctorsCardStyles';
import { Plan } from '../../../../models/Plan';
import { tt } from '../../../../locales/translation.config';
import { useAppSelector } from '../../../../hooks/hooks';

interface UserPlansFlatlistProps {
  data: Plan[];
  handlePress: (id: number) => void;
  handleLoadMore: () => void;
  loadMoreVisible: boolean;
}

interface RenderItemProps {
  item: Plan;
}

const UserPlansFlatlist: React.FC<UserPlansFlatlistProps> = ({
  data,
  handlePress,
  handleLoadMore,
  loadMoreVisible
}) => {
  const userplan = useAppSelector((state) => state.user.current_plan);
  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <View
          key={item.id}
          style={
            userplan && item.id === userplan
              ? stylesUserPlanFlatlist.itemcurrentplan
              : stylesUserPlanFlatlist.item
          }>
          <Image source={Images.mealAvatar} style={stylesDoctorsCard.image} />
          <Text>{item.name}</Text>
          <Text>{item.tags}</Text>
          {userplan && item.id === userplan && <Text> Your current plan</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View style={stylesUserPlanFlatlist.mainContainer}>
      <FlatList
        data={data}
        renderItem={(item) => renderItem(item)}
        //onEndReached={loadMoreVisible ? handleLoadMore : null}
        //onEndReachedThreshold={2}
        keyExtractor={(item) => item.name}
      />
      {loadMoreVisible && (
        <TouchableOpacity onPress={handleLoadMore}>
          <Text style={stylesUserPlanFlatlist.link}>{tt('Load More')}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default UserPlansFlatlist;
