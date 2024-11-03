import React, { useCallback } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

import {
  Bubble,
  GiftedChat,
  Send,
  IMessage,
  User
} from 'react-native-gifted-chat';
import { Images } from '../../utils/StylingConsts/images/Images';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import InChatFileTransfer from '../../features/LoggedIn/Components/InChatFileTransfer/InChatFileTransfer';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { stylesChatScreen } from './chatScreenStyles';

interface ChatScreenProps {
  onSend: (messages: IMessage[]) => void;
  messages: IMessage[];
  user: User | null;
  filePath: string | undefined;
  imagePath: string | undefined;
  pickDocument: () => void;
  setFilePath: () => void;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  messages,
  onSend,
  setFilePath,
  filePath,
  imagePath,
  pickDocument
}): JSX.Element => {
  const renderSend = (props: any) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
        <TouchableOpacity onPress={pickDocument}>
          <Image
            source={Images.attachement}
            style={stylesChatScreen.documentIcon}
          />
        </TouchableOpacity>
        <Send {...props}>
          <View style={stylesChatScreen.sendContainer}>
            <Image
              source={Images.sendMessage}
              style={stylesChatScreen.sendIcon}
            />
          </View>
        </Send>
      </View>
    );
  };

  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Color.colorGray
          },
          left: {
            backgroundColor: Color.colorLighterOrange
          }
        }}
        textStyle={{
          right: {
            color: Color.colorWhite2
          }
        }}
      />
    );
  };

  const renderChatFooter = useCallback(() => {
    if (imagePath) {
      return (
        <View style={stylesChatScreen.chatFooter}>
          <Image
            source={{ uri: imagePath }}
            style={{ height: 75, width: 75 }}
          />
        </View>
      );
    }
    if (filePath) {
      return (
        <View style={stylesChatScreen.chatFooter}>
          <InChatFileTransfer filePath={filePath} />
          <TouchableOpacity
            onPress={() => setFilePath()}
            style={stylesChatScreen.buttonFooterChat}>
            <Text style={stylesChatScreen.textFooterChat}>X</Text>
          </TouchableOpacity>
        </View>
      );
    }
    return null;
  }, [filePath, imagePath, setFilePath]);

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <GiftedChat
      messages={messages}
      onSend={(messages) => onSend(messages)}
      user={{
        _id: 2
      }}
      renderBubble={renderBubble}
      alwaysShowSend
      renderSend={renderSend}
      scrollToBottom
      scrollToBottomComponent={scrollToBottomComponent}
      renderChatFooter={renderChatFooter}
    />
  );
};
export default ChatScreen;
