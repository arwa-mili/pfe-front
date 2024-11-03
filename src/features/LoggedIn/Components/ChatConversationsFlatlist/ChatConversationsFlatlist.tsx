import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';
import { stylesDoctorsCard } from '../DoctorsCard/doctorsCardStyles';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { stylesChatConversations } from './chatConversationsFlatlistStyles';
import { UserDoctorChatEntityClient } from '../../../../interfaces/chatsUserDoctor/UserDoctorChats';
import { useAppSelector } from '../../../../hooks/hooks';

interface ChatConversationsFlatlistProps {
  data: UserDoctorChatEntityClient[];
  handlePress: (id: number) => void;
  setPage: (page: Number) => void;
}

interface RenderItemProps {
  item: UserDoctorChatEntityClient;
}

const ChatConversationsFlatlist: React.FC<ChatConversationsFlatlistProps> = ({
  data,
  handlePress
}) => {
  const user = useAppSelector((state) => state.user.id as number);
  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <TouchableOpacity onPress={() => handlePress(item.id)}>
        <View key={item.id} style={stylesChatConversations.item}>
          <Image source={Images.avatar} style={stylesDoctorsCard.image} />
          <View>
            <Text>{item.doctorname}</Text>
            <View style={stylesChatConversations.textlastmessages}>
              <View style={stylesChatConversations.textlastmessage}>
                <Text>
                  {item.lastMessage.senderid === user ? 'You' : 'Doctor'}:{' '}
                </Text>
                <Text>{item.lastMessage.text} </Text>
              </View>
              <Text style={stylesChatConversations.datetext}>
                {item.lastMessage.created_at.toString()}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <FlatList
      data={data ? data : []}
      renderItem={(item) => renderItem(item)}
      //onEndReached={loadMoreVisible ? handleLoadMore : null}
      onEndReachedThreshold={1}
      keyExtractor={(item) => item.doctorname}
    />
  );
};

export default ChatConversationsFlatlist;
