import React, { useCallback, useEffect, useRef, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { type NativeStackScreenProps } from '@react-navigation/native-stack';
import { Chat_SCREEN } from '../../utils/consts/screensNames/ScreensNames';
import ChatScreen from './ChatScreen';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { Linking } from 'react-native';
import { Images } from '../../utils/StylingConsts/images/Images';
import { TopTabNavigatorParamList } from '../../navigation/routes/DoctorsStack';
import { useAppDispatch, useAppSelector } from '../../hooks/hooks';
import DocumentPicker, {
  DocumentPickerResponse
} from 'react-native-document-picker';
import { Backend_URL } from '../../utils/consts/apiConsts/apiConsts';
import {
  useLazyGetSpecificChatQuery,
  useLazyGetPreviousConversationQuery,
  useSendMessageMutation
} from '../../store/apis/chatUserDoctorApis/chatuserDoctorApis';
import { handleGenericError } from '../../utils/helpers/Errors';
import { MessageClient } from '../../interfaces/chatsUserDoctor/Message';
import { setLoading } from '../../utils/helpers/LoaderDisplay';

type ChatScreenContainerProps = NativeStackScreenProps<
  TopTabNavigatorParamList,
  typeof Chat_SCREEN
>;
interface RequestParams {
  id?: number;
  token?: string;
}
const ChatScreenContainer: React.FC<ChatScreenContainerProps> = ({
  route
}: ChatScreenContainerProps): JSX.Element => {
  const chatid = route.params.chatid;
  const dispatch = useAppDispatch();
  const userr = useAppSelector((state) => state.user.id as number);
  const [, setReceivedMessage] = useState<IMessage[]>([]);
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [isAttachFile, setIsAttachFile] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [filePath, setFilePath] = useState('');
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [sendMsg] = useSendMessageMutation();
  const [getChat] = useLazyGetSpecificChatQuery();
  const [chatFetch] = useLazyGetPreviousConversationQuery();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef<Socket | null>(null);
  useEffect(() => {
    socket.current = io(Backend_URL);
    socket.current.emit('new-user-add', userr);
    socket.current.on('get-users', (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.current?.disconnect();
    };
  }, [userr]);

  useEffect(() => {
    if (messages !== null) {
      socket.current?.emit('send-message', messages);
    }
  }, [messages]);

  Linking.getInitialURL().then((url) => {
    if (url) {
      console.log('Initial URL:', url);
    }
  });

  useEffect(() => {
    socket.current?.on('recieve-message', (data) => {
      setReceivedMessage(data);
      /* setNotifications((prevNotifications) => ({
        ...prevNotifications,
        [data.senderId]: (prevNotifications[data.senderId] || 0) + 1
      }));
      */
    });
  }, []);

  const pickDocument = async () => {
    try {
      const result: DocumentPickerResponse[] = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
        copyTo: 'documentDirectory',
        mode: 'import',
        allowMultiSelection: true
      });
      const fileUri = result[0].fileCopyUri;
      console.log(fileUri);
      if (!fileUri) {
        console.log('File URI is undefined or null');
        return;
      }
      if (fileUri.indexOf('.png') !== -1 || fileUri.indexOf('.jpg') !== -1) {
        setImagePath(fileUri);
        setIsAttachImage(true);
      } else {
        setFilePath(fileUri);
        setIsAttachFile(true);
      }
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled file picker');
      } else {
        console.log('DocumentPicker err => ', err);
        throw err;
      }
    }
  };

  const user: User = {
    _id: userr,
    name: 'User'
  };
  const onSend = useCallback(
    async (messages: IMessage[] = []) => {
      const [messageToSend] = messages;
      if (isAttachImage) {
        const newMessage: IMessage = {
          _id: messages[0]._id + 1,
          text: messageToSend.text,
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar: ''
          },
          image: imagePath
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
        setImagePath('');
        setIsAttachImage(false);
      } else if (isAttachFile) {
        const newMessage: IMessage = {
          _id: messages[0]._id + 1,
          text: messageToSend.text,
          createdAt: new Date(),
          user: {
            _id: 2,
            avatar: ''
          },
          image:
            'https://res.cloudinary.com/thelibrary/image/upload/v1716031095/pdf_le3xpr.png'
        };
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, newMessage)
        );
        setFilePath('');
        setIsAttachFile(false);
      } else {
        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, messages)
        );
      }
      const formData = new FormData();
      if (isAttachFile || isAttachImage) {
        formData.append('file', {
          uri: imagePath ? imagePath : filePath,
          type: imagePath ? 'image/jpeg' : 'application/pdf',
          name: 'name'
        });
      }
      formData.append('text', messageToSend.text);
      try {
        await sendMsg({
          formdata: formData,
          user_id: userr,
          chat_id: chatid
        }).unwrap();
      } catch (error) {
        console.log('rrr', error);
      }
    },
    [chatid, filePath, imagePath, isAttachFile, isAttachImage, sendMsg, userr]
  );
  const fetchChatHistory = useCallback(async () => {
    try {
      const requestParams: Partial<RequestParams> = {};
      if (chatid) {
        requestParams.id = chatid;
      }

      await getChat({
        id: requestParams?.id as number
      });

      try {
        const { data, isLoading } = await chatFetch({ chatid });
        setLoading(isLoading, data, dispatch);

        const fetchedMessages = data?.map((message: MessageClient) => ({
          _id: message.id,

          text:
            message.file && message.file?.endsWith('.pdf')
              ? `${message.file}\n${message.text}`
              : message.text,
          image: message.file?.endsWith('.pdf') ? '' : message.file,
          createdAt: new Date(message.createdAt),
          user: {
            _id: message.senderid === userr ? 2 : 1,
            name: message.id === userr ? 'You' : 'Doc.',
            avatar: message.senderid === userr ? Images.hide : Images.avatar
          }
        }));
        fetchedMessages?.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMessages((previousMessages) => {
          return (
            previousMessages &&
            GiftedChat.append(previousMessages, fetchedMessages as IMessage[])
          );
        });
      } catch (error) {
        handleGenericError(error, dispatch);
      }
    } catch (error) {
      handleGenericError(error, dispatch);
    }
  }, [chatFetch, chatid, dispatch, getChat, userr]);

  useEffect(() => {
    fetchChatHistory();
  }, [fetchChatHistory]);
  return (
    <ChatScreen
      user={user}
      onSend={onSend}
      messages={messages}
      filePath={filePath}
      imagePath={imagePath}
      pickDocument={pickDocument}
      setFilePath={() => setFilePath('')}
    />
  );
};

export default ChatScreenContainer;
