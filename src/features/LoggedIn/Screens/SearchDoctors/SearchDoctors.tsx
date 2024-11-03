import React from 'react';
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import SearchComponent from '../../Components/searchBar/searchBar';
import { tt } from '../../../../locales/translation.config';
import CategoriesOfSearch from '../../Components/CategoriesOfSearch/CategoriesOfSearch';
import { DoctorsClient } from '../../../../models/Doctor';
import DoctorsCard from '../../Components/DoctorsCard/DoctorsCard';
import { stylesSearchDoctors } from './searchDoctorsStyles';
import { stylesUserPlanFlatlist } from '../../Components/UserPlansFlatlist/userPlansFlatlistStyles';
import SendMessageForChatPopUp, {
  CreateChatRequest
} from '../../Components/SendMessageForChatPopUp/SendMessageForChatPopUp';
import { Control, FieldErrors, UseFormHandleSubmit } from 'react-hook-form';

/**
 * Represents SearchDoctors screen ui
 * @returns JSX.Element
 */
interface SearchDoctorsProps {
  handleAvailability: (url: string) => void;
  handleRequestChat: (id: number) => void;
  dataTosend: DoctorsClient[];
  handleLoadMore: () => void;
  loadMoreVisible: boolean;
  handleSearch: (searchText: string) => void;
  handleCategorySelect: (catName: string) => void;
  isVisible: boolean;
  handleClosePopUp: () => void;
  control: Control<CreateChatRequest> | undefined;
  onSubmitRequestForChat: (requestData: CreateChatRequest) => Promise<void>;
  errors: FieldErrors<CreateChatRequest>;
  handleSubmit: UseFormHandleSubmit<CreateChatRequest, CreateChatRequest>;
}

const SearchDoctors: React.FC<SearchDoctorsProps> = ({
  dataTosend,
  loadMoreVisible,
  handleAvailability,
  handleLoadMore,
  handleSearch,
  handleRequestChat,
  handleCategorySelect,
  handleSubmit,
  onSubmitRequestForChat,
  handleClosePopUp,
  isVisible,
  control,
  errors
}): JSX.Element => {
  const doctorsSpec = [
    {
      id: 'All',
      name: tt('All')
    },
    {
      id: 'Dietist',
      name: tt('Dietist')
    },
    {
      id: 'Endocrinologist',
      name: tt('Endocrinologist')
    },
    {
      id: 'Ophtalmologist',
      name: tt('Ophtalmologist')
    },
    {
      id: 'Generalist',
      name: tt('Generalist')
    }
  ];

  return (
    <KeyboardAvoidingView
      style={stylesSearchDoctors.maincontainer}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <View style={stylesSearchDoctors.searchBarContainer}>
        <SearchComponent
          placeholderText={tt('Tap a name,email or surname')}
          sorting={false}
          handleAction={handleSearch}
        />
      </View>
      <View style={stylesSearchDoctors.searchBarContainer}>
        <CategoriesOfSearch
          data={doctorsSpec}
          icon={false}
          handleSelection={(catName) => {
            handleCategorySelect(catName);
          }}
        />
      </View>
      <View style={stylesSearchDoctors.flatlistContainer}>
        <FlatList
          data={dataTosend}
          renderItem={({ item }) => (
            <DoctorsCard
              data={item}
              handleViewAvailability={handleAvailability}
              handleRequestChat={handleRequestChat}
            />
          )}
          keyExtractor={(item, index) => index.toString()}
          contentContainerStyle={stylesSearchDoctors.flatlistContent}
        />
        {loadMoreVisible && dataTosend.length !== 0 && (
          <TouchableOpacity onPress={handleLoadMore}>
            <Text style={stylesUserPlanFlatlist.link}>{tt('Load More')}</Text>
          </TouchableOpacity>
        )}
      </View>
      <SendMessageForChatPopUp
        onClose={handleClosePopUp}
        handleSubmit={handleSubmit}
        isVisible={isVisible}
        errors={errors}
        onSubmit={onSubmitRequestForChat}
        control={control}
      />
    </KeyboardAvoidingView>
  );
};

export default SearchDoctors;
