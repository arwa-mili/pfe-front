import React from 'react';
import { View } from 'react-native';
import ChatConversationsFlatlist from '../../Components/ChatConversationsFlatlist/ChatConversationsFlatlist';
import { UserDoctorChatEntityClient } from '../../../../interfaces/chatsUserDoctor/UserDoctorChats';

/**
 * Represents ChatConversations screen ui
 * @returns JSX.Element
 */

interface ChatConversationsProps {
  handlePressChatScreen: (id: number) => void;
  data: UserDoctorChatEntityClient[];
  setPage: (page: Number) => void;
}

const ChatConversations: React.FC<ChatConversationsProps> = ({
  handlePressChatScreen,
  data,
  setPage
}): JSX.Element => {
  return (
    <View>
      <ChatConversationsFlatlist
        data={data}
        setPage={setPage}
        handlePress={handlePressChatScreen}
      />
    </View>
  );
};

export default ChatConversations;
