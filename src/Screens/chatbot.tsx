import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import React, { useCallback, useState } from 'react';
import { Bubble, GiftedChat, IMessage, Reply } from 'react-native-gifted-chat';
import { BottomTabNavigatorParamList } from '../navigation/routes/BottomTabNavigator';
import { ChatBot_Screen } from '../utils/consts/screensNames/ScreensNames';
import { chatRequest } from '../interfaces/chat/chatMessageRequest.interface';
import {
  useChatApiPostMutation,
  useLazyGenerateReportApiQuery
} from '../store/apis/chatapi/chatApi';
import { View, Text, Image, StyleSheet } from 'react-native';
import { Color } from '../utils/StylingConsts/Colors/Colors';
import { useAppDispatch, useAppSelector } from '../hooks/hooks';
import { setLoader, setLoaderFalse } from '../hooks/Slices/LoaderSlice';

interface ChatbotContainerProps
  extends BottomTabScreenProps<
    BottomTabNavigatorParamList,
    typeof ChatBot_Screen
  > {}

const Chatbot: React.FC<ChatbotContainerProps> = ({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [messages, setMessages] = useState<IMessage[]>([
    {
      _id: 1,
      text: 'Hello, how can I assist you?',
      quickReplies: {
        type: 'radio',
        values: [
          {
            title: 'Get report of your measures',
            value: 'get report'
          },
          {
            title: 'Ask question about your disease!',
            value: 'generic ques'
          }
        ]
      },
      createdAt: new Date(),
      user: {
        _id: 1,
        name: 'Assistant',
        avatar:
          'https://res.cloudinary.com/thelibrary/image/upload/v1717061146/IFApp/nnwanpskkxlvjdaouk9r.png'
      },
      sent: true,
      received: true,
      pending: true
    }
  ]);
  const userid = useAppSelector((state) => state.user.id as number);
  const [sendChatRequest] = useChatApiPostMutation();
  const [sendGetReportRequest] = useLazyGenerateReportApiQuery({});

  const onSend = useCallback(
    async (newMessages: IMessage[]) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );

      let chat: chatRequest = { question: newMessages[0].text };
      const response = await sendChatRequest(chat).unwrap();
      const responseMessage: IMessage = {
        _id: new Date().getTime(),
        text: response.answer,
        createdAt: new Date(),
        user: {
          _id: 1,
          name: 'Assistant',
          avatar:
            'https://res.cloudinary.com/thelibrary/image/upload/v1717061146/IFApp/nnwanpskkxlvjdaouk9r.png'
        }
      };

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [responseMessage])
      );
    },
    [sendChatRequest]
  );

  const handleQuickReply = useCallback(
    async (replies: Reply[]) => {
      console.log(replies);
      const clickedValue = replies[0]?.value;
      if (clickedValue) {
        let text = '';
        switch (clickedValue) {
          case 'get report':
            text = 'Generation report for you ...';
            break;
          case 'generic ques':
            text = 'Feel free to ask any question related to your disease(s)';
            break;
          default:
            text =
              'I am a medical assistant limited to generate responses related to the contexts provided above.';
            break;
        }

        const newMessage: IMessage = {
          _id: new Date().getTime(),
          text: text,
          createdAt: new Date(),
          user: {
            _id: 1,
            name: 'Assistant',
            avatar:
              'https://res.cloudinary.com/thelibrary/image/upload/v1717061146/IFApp/nnwanpskkxlvjdaouk9r.png'
          }
        };

        setMessages((previousMessages) => [newMessage, ...previousMessages]);

        if (text === 'Generation report for you ...') {

          const res = await sendGetReportRequest({ userid }).unwrap();
          if (res) {
            const formattedResponse = JSON.stringify(res, null, 2);
            const reportMessage: IMessage = {
              _id: new Date().getTime(),
              text: formattedResponse,
              createdAt: new Date(),
              user: {
                _id: 1,
                name: 'Assistant',
                avatar:
                  'https://res.cloudinary.com/thelibrary/image/upload/v1717061146/IFApp/nnwanpskkxlvjdaouk9r.png'
              }
            };

            setMessages((previousMessages) => [
              reportMessage,
              ...previousMessages
            ]);
          }
        }
      }
    },
    [sendGetReportRequest, userid]
  );

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

  return (
    <>
      <View style={styles.header}>
        <Image
          source={{
            uri: 'https://res.cloudinary.com/thelibrary/image/upload/v1717061146/IFApp/nnwanpskkxlvjdaouk9r.png'
          }}
          style={styles.avatar}
        />
        <Text style={styles.title}>Chat with Our Assistant</Text>
      </View>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        showAvatarForEveryMessage={true}
        onSend={(messages) => {
          onSend(messages);
        }}
        onQuickReply={(replies) => {
          handleQuickReply(replies);
        }}
        user={{
          _id: 2,
          name: 'You'
        }}
      />
    </>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: Color.colorWhite,
    borderBottomWidth: 1,
    borderBottomColor: Color.colorWhite
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  }
});

export default Chatbot;
