import React, { useCallback, useEffect, useState } from 'react';
import ChatConversations from './ChatConversations';
import { TopTabNavigatorParamList } from '../../../../navigation/routes/DoctorsStack';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import {
  Chat_SCREEN,
  CHATCONVERSATIONS_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { useAppDispatch, useAppSelector } from '../../../../hooks/hooks';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { useLazyGetAllChatsQuery } from '../../../../store/apis/chatUserDoctorApis/chatuserDoctorApis';
import { UserDoctorChatEntityClient } from '../../../../interfaces/chatsUserDoctor/UserDoctorChats';

interface ChatConversationsContainerProps
  extends BottomTabScreenProps<
    TopTabNavigatorParamList,
    typeof CHATCONVERSATIONS_SCREEN
  > {}

const ChatConversationsContainer: React.FC<ChatConversationsContainerProps> = ({
  navigation
}): JSX.Element => {
  const userid = useAppSelector((state) => state.user.id as number);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState<Number>(0);
  const [data, setData] = useState<UserDoctorChatEntityClient[]>([]);
  const [, setTotalPages] = useState<Number>(0);

  const [getallChats] = useLazyGetAllChatsQuery();
  const [hasFetchedData, setHasFetchedData] = useState<boolean>(false);

  const onRender = useCallback(
    async (page: Number, userid: Number) => {
      try {
        const { data, isLoading } = await getallChats({
          userid,
          page
        });

        console.log(data);

        setLoading(isLoading, data, dispatch);
        setHasFetchedData(true);
        if (data !== undefined) {
          setData(data.user_doctor_chats);
          setTotalPages(data.totalpages);
        }
      } catch (error) {
        // Handle error
        dispatch(setLoaderFalse());
        handleGenericError(error, dispatch);
      }
    },
    [getallChats, dispatch]
  );

  useEffect(() => {
    if (!hasFetchedData) {
      onRender(page, userid);
    }
  }, [onRender, page, userid, hasFetchedData]);

  return (
    <ChatConversations
      handlePressChatScreen={(id) =>
        navigation.navigate(Chat_SCREEN, { chatid: id })
      }
      data={data}
      setPage={(page) => setPage(page)}
    />
  );
};

export default ChatConversationsContainer;
