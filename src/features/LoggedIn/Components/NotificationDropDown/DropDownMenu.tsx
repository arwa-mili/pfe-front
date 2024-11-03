import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity
} from 'react-native';
import { stylesDropDownMenu } from './dropDownMenuStyles';
import { useAppSelector } from '../../../../hooks/hooks';
import { NotificationClient } from '../../../../interfaces/notifications/notificationResponse.interface';
import { useLazyShowNotificationsQuery } from '../../../../store/apis/notificationsApi/notificationsApi';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import { useDispatch } from 'react-redux';
import { tt } from '../../../../locales/translation.config';
import { stylesUserPlanFlatlist } from '../UserPlansFlatlist/userPlansFlatlistStyles';
import { Image } from 'react-native';

interface DropDownMenuProps {}

interface RenderItemProps {
  item: any;
}

const DropDownMenu: React.FC<DropDownMenuProps> = ({}) => {
  const userid = useAppSelector((state) => state.user.id as number);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [previousPageVisible, setPreviousPageVisible] = useState(false);
  const [nextPageVisible, setNextPageVisible] = useState(true);
  const [dataToSend, setDataToSend] = useState<NotificationClient[]>([]);

  const [showNotifs] = useLazyShowNotificationsQuery();

  useEffect(() => {
    const fetchNotifications = async () => {
      const { data, isLoading } = await showNotifs({
        userid,
        page
      });

      try {
        setLoading(isLoading, data, dispatch);
        if (data) {
          setDataToSend((prevData) => {
            const newData = data.notifications.filter(
              (notif) =>
                !prevData.some((notification) => notification.id === notif.id)
            );
            return [...newData];
          });
          setNextPageVisible(page < data.total_pages - 2);
          setPreviousPageVisible(page > 0 && page < data.total_pages);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };

    fetchNotifications();
  }, [dispatch, page, showNotifs, userid]);

  const handleLoadMore = () => {
    setPage(page + 1);
  };
  const handleReturnToPreviousPage = () => {
    setPage(page + -1);
  };
  const renderItem = ({ item }: RenderItemProps) => {
    return (
      <View key={item.id} style={stylesDropDownMenu.item}>
        <Image style={stylesDropDownMenu.avatar} source={item.avatar} />
        <View style={stylesDropDownMenu.textcontainer}>
          <Text>{item.title}</Text>
          <Text>{item.content}</Text>
        </View>
      </View>
    );
  };
  return (
    <View style={[stylesDropDownMenu.container, { top: screenHeight * 0.1 }]}>
      <View>
        {dataToSend.length > 0 && (
          <>
            <FlatList
              style={stylesDropDownMenu.flatListContentContainer}
              data={dataToSend}
              renderItem={renderItem}
              keyExtractor={(item) => item.id.toString()}
            />
          </>
        )}
        <View style={stylesDropDownMenu.pagination}>
          {nextPageVisible && dataToSend.length !== 0 && (
            <TouchableOpacity onPress={handleLoadMore}>
              <Text style={stylesUserPlanFlatlist.link}>{tt('Next')}</Text>
            </TouchableOpacity>
          )}
          {previousPageVisible && (
            <TouchableOpacity onPress={handleReturnToPreviousPage}>
              <Text style={stylesUserPlanFlatlist.link2}>{tt('Previous')}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};

const screenHeight = Dimensions.get('window').height;

export default DropDownMenu;
