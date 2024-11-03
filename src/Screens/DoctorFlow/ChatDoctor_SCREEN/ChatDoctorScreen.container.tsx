import React, { useCallback, useEffect, useRef, useState } from 'react';
import { CHATDOCTOR_SCREEN } from '../../../utils/consts/screensNames/ScreensNames';
import { DoctorsFlowParamList } from '../../../navigation/routes/DoctorFlowStack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import { GiftedChat, IMessage, User } from 'react-native-gifted-chat';
import { MessageClient } from '../../../interfaces/chatsUserDoctor/Message';
import { handleGenericError } from '../../../utils/helpers/Errors';
import { setLoading } from '../../../utils/helpers/LoaderDisplay';
import { Images } from '../../../utils/StylingConsts/images/Images';
import { useAppDispatch } from '../../../hooks/hooks';
import { Linking } from 'react-native';
import DocumentPicker, {
  DocumentPickerResponse
} from 'react-native-document-picker';
import { Socket, io } from 'socket.io-client';
import {
  useSendMessageMutation,
  useLazyGetSpecificChatQuery,
  useLazyGetPreviousConversationQuery
} from '../../../store/apis/chatUserDoctorApis/chatuserDoctorApis';
import { Backend_URL } from '../../../utils/consts/apiConsts/apiConsts';
import ChatScreen from '../../ChatScreen/ChatScreen';
import { setLoaderFalse } from '../../../hooks/Slices/LoaderSlice';

/**
 * Container used to separate ChatDoctorScreen logic as a wrapper to ChatDoctorScreen screen
 * @returns JSX.Element
 */
interface ChatDoctorScreenContainerProps
  extends BottomTabScreenProps<
    DoctorsFlowParamList,
    typeof CHATDOCTOR_SCREEN
  > {}

interface RequestParams {
  id?: number;
  token?: string;
}

const ChatDoctorScreenContainer: React.FC<
  ChatDoctorScreenContainerProps
> = ({}): JSX.Element => {
  const dispatch = useAppDispatch();
  const [, setReceivedMessage] = useState<IMessage[]>([]);
  const [isAttachImage, setIsAttachImage] = useState(false);
  const [isAttachFile, setIsAttachFile] = useState(false);
  const [imagePath, setImagePath] = useState('');
  const [filePath, setFilePath] = useState('');
  const [doctorid, setDoctorid] = useState<number>(0);
  const [messages, setMessages] = useState<IMessage[]>([]);
  const [chatId, setChatId] = useState<number | null>(null);
  const [sendMsg] = useSendMessageMutation();
  const [getChat] = useLazyGetSpecificChatQuery();
  const [chatFetch] = useLazyGetPreviousConversationQuery();
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef<Socket | null>(null);
  const isFirstRender = useRef(true);

  useEffect(() => {
    dispatch(setLoaderFalse());
    if (doctorid !== null) {
      socket.current = io(Backend_URL);
      socket.current.emit('new-user-add', doctorid);
      socket.current.on('get-users', (users) => {
        setOnlineUsers(users);
      });

      return () => {
        socket.current?.disconnect();
      };
    }
  }, [dispatch, doctorid]);

  useEffect(() => {
    if (messages !== null) {
      socket.current?.emit('send-message', messages);
    }
  }, [messages]);

  const user: User = {
    _id: doctorid,
    name: 'User'
  };

  useEffect(() => {
    socket.current?.on('recieve-message', (data) => {
      setReceivedMessage(data);
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
          user_id: doctorid as number,
          chat_id: chatId as number
        }).unwrap();
      } catch (error) {
        console.log('Error sending message', error);
      }
    },
    [
      chatId,
      doctorid,
      filePath,
      imagePath,
      isAttachFile,
      isAttachImage,
      sendMsg
    ]
  );

  const fetchChatHistory = useCallback(async () => {
    try {
      let token = null;

      const url = await Linking.getInitialURL();
      if (url) {
        const route = url.replace(/.*?:\/\//g, '');
        const match = route.match(/reset-password\/reset\/(.*)/);
        if (match) {
          token = match[1];
        }
      }

      const requestParams: Partial<RequestParams> = {};
      if (chatId) {
        requestParams.id = chatId;
      }
      if (token) {
        requestParams.token = token;
      }

      const res = await getChat({
        id: requestParams?.id as number,
        token: requestParams?.token as string
      }).unwrap();

      setChatId(res.chatid);
      setDoctorid(res.doctorid);
      dispatch(setLoaderFalse());

      const { data, isLoading } = await chatFetch({ chatid: res.chatid });
      //setLoading(isLoading, data, dispatch);
      dispatch(setLoaderFalse());

      const fetchedMessages = data?.map((message: MessageClient) => ({
        _id: message.id,
        text:
          message.file && message.file?.endsWith('.pdf')
            ? `${message.file}\n${message.text}`
            : message.text,
        image: message.file?.endsWith('.pdf') ? '' : message.file,
        createdAt: new Date(message.createdAt),
        user: {
          _id: message.senderid === res.doctorid ? 2 : 1,
          name: message.senderid === res.doctorid ? 'You' : 'Doc.',
          avatar:
            message.senderid === res.doctorid ? Images.hide : Images.avatar
        }
      }));

      fetchedMessages?.sort(
        (a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, fetchedMessages as IMessage[])
      );
    } catch (error) {
      handleGenericError(error, dispatch);
    }
  }, [chatFetch, chatId, dispatch, getChat]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      fetchChatHistory();
    }
    dispatch(setLoaderFalse());
  }, [dispatch, fetchChatHistory]);

  return (
    <ChatScreen
      user={user._id !== 0 ? user : null}
      onSend={onSend}
      messages={messages}
      filePath={filePath}
      imagePath={imagePath}
      pickDocument={pickDocument}
      setFilePath={() => setFilePath('')}
    />
  );
};

export default ChatDoctorScreenContainer;
