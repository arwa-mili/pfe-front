import React, { useEffect, useMemo, useState, useCallback } from 'react';
import { Linking } from 'react-native';
import { BottomTabScreenProps } from '@react-navigation/bottom-tabs';
import SearchDoctors from './SearchDoctors';
import { SEARCHDOCTORS_SCREEN } from '../../../../utils/consts/screensNames/ScreensNames';
import { TopTabNavigatorParamList } from '../../../../navigation/routes/DoctorsStack';
import {
  useCreateNewChatConversationMutation,
  useLazyGetAllDoctorsQuery
} from '../../../../store/apis/chatUserDoctorApis/chatuserDoctorApis';
import { DoctorsClient } from '../../../../models/Doctor';
import { setLoading } from '../../../../utils/helpers/LoaderDisplay';
import useDebounce, {
  useAppDispatch,
  useAppSelector
} from '../../../../hooks/hooks';
import { setLoaderFalse } from '../../../../hooks/Slices/LoaderSlice';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { debouncing_intervall } from '../../../../utils/consts/numericValues/numericValues';
import {
  ChatMessageType,
  CreateChat,
  CreateChatRequest
} from '../../Components/SendMessageForChatPopUp/SendMessageForChatPopUp';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
interface SearchDoctorsContainerProps
  extends BottomTabScreenProps<
    TopTabNavigatorParamList,
    typeof SEARCHDOCTORS_SCREEN
  > {}

const SearchDoctorsContainer: React.FC<
  SearchDoctorsContainerProps
> = ({}): JSX.Element => {
  const {
    control,
    handleSubmit,
    formState: { errors }
  } = useForm<ChatMessageType>({
    resolver: zodResolver(CreateChat)
  });
  const [page, setPage] = useState(0);
  const [loadMoreVisible, setLoadMoreVisible] = useState(true);
  const [dataTosend, setDataTosend] = useState<DoctorsClient[]>([]);
  const [searchWord, setSearchWord] = useState<string>('');
  const [popUpVisible, setPopUpVisible] = useState<boolean>(false);
  const [doctorid, setDoctorid] = useState<number | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const dispatch = useAppDispatch();
  const [requestChat] = useCreateNewChatConversationMutation();
  const userid = useAppSelector((state) => state.user.id);
  const debouncedSearchValue = useDebounce(searchWord, debouncing_intervall);

  const [searchDoctors, { data, isLoading, isFetching, isError, error }] =
    useLazyGetAllDoctorsQuery();

  const params = useMemo(
    () => ({
      page,
      searchWord: debouncedSearchValue,
      selectedSpec: selectedCategory === 'All' ? '' : selectedCategory
    }),
    [page, debouncedSearchValue, selectedCategory]
  );

  useEffect(() => {
    searchDoctors(params);
  }, [params, searchDoctors]);

  useEffect(() => {
    if (data) {
      if (data.totalPages === page + 1) {
        setLoadMoreVisible(false);
      } else {
        setLoadMoreVisible(true);
      }
      setDataTosend(data.doctors);
    }
  }, [data, page]);

  useEffect(() => {
    setLoading(isLoading, data, dispatch, isFetching);
    if (isError) {
      dispatch(setLoaderFalse());
      handleGenericError(error, dispatch);
    }
  }, [isLoading, isFetching, isError, data, error, dispatch]);

  const handleCategorySelect = useCallback((categoryName: string) => {
    setPage(0);
    setSelectedCategory(categoryName);
  }, []);

  const handleLoadMore = useCallback(() => {
    setPage((prevPage) => prevPage + 1);
  }, []);

  const handleSearch = useCallback((text: string) => {
    setPage(0);
    setSearchWord(text !== 'All' ? text : '');
  }, []);

  const handleAvailability = useCallback(
    async (url: string) => {
      Linking.openURL(url).catch((err) => handleGenericError(err, dispatch));
    },
    [dispatch]
  );
  const handleClosePopUp = useCallback(async () => {
    setPopUpVisible(false);
  }, []);
  const onSubmitRequestForChat = async (requestData: CreateChatRequest) => {
    console.log('vgvggv');
    try {
      requestData.doctorid = doctorid as number;
      requestData.userid = userid as number;
      console.log(requestData);
      await requestChat(requestData).unwrap();
    } catch (error) {
      console.log(error);
    }
  };
  const handleShowPopUp = useCallback(async (id: number) => {
    setDoctorid(id);
    setPopUpVisible(true);
  }, []);

  return (
    <SearchDoctors
      dataTosend={dataTosend}
      handleAvailability={handleAvailability}
      handleLoadMore={handleLoadMore}
      isVisible={popUpVisible}
      loadMoreVisible={loadMoreVisible}
      handleSearch={handleSearch}
      handleCategorySelect={handleCategorySelect}
      handleRequestChat={handleShowPopUp}
      handleClosePopUp={handleClosePopUp}
      handleSubmit={handleSubmit}
      errors={errors}
      onSubmitRequestForChat={onSubmitRequestForChat}
      control={control}
    />
  );
};

export default SearchDoctorsContainer;
