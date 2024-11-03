import { ImageSourcePropType, ScrollView, Text, View } from 'react-native';

import React from 'react';

import { Header } from '../../../UserInfos/Components/Header/Header';

import { stylesEditProfile } from './editProfileStyles';
import { ImagePickerAvatar } from '../../../UserInfos/Components/ImagePickerAvatar/ImagePickerAvatar';
import { ImagePickerModal } from '../../../UserInfos/Components/ImagePickerModal/ImagePickerModal';
import { tt } from '../../../../locales/translation.config';
import CustomTouchableOpacity from '../../Components/TouchableOpacity/CustomTouchableOpacity/CustomTouchableOpacity';
import { HasSportActivity } from '../../../../enums/SportActivity.enum';
import ButtonGroup from '../../Components/ButtonGroup/ButtonGroup';

interface EditProfilePresenterProps {
  handlePress: () => void;
  uri: ImageSourcePropType | undefined;
  onPress1: () => void;
  visible: boolean;
  onClose: () => void;
  onImageLibraryPress: () => void;
  handleSubmit: () => void;
  initialValues: any;
  value: number | string | null;
  handleOptionSelect: (value: number | string | null) => void;
  navigateTChangeName: () => void;
  navigateTChangeEmail: () => void;
  onPressChangeHeightWeight: () => void;
}

const EditProfile: React.FC<EditProfilePresenterProps> = ({
  handlePress,
  uri,
  onPress1,
  onClose,
  visible,
  handleOptionSelect,
  navigateTChangeEmail,
  onImageLibraryPress,
  navigateTChangeName,
  onPressChangeHeightWeight
}) => {
  return (
    <>
      <ScrollView style={stylesEditProfile.container}>
        <Header
          title={tt('Profile Details')}
          handlePress={handlePress}
          medium={false}
        />

        <ImagePickerAvatar uri={uri} onPress={onPress1} changeable={true} />
        <ImagePickerModal
          isVisible={visible}
          onClose={onClose}
          onImageLibraryPress={onImageLibraryPress}
        />
        <View>
          <Text style={stylesEditProfile.title}>{tt('General Info :')}</Text>
          <CustomTouchableOpacity
            title={tt('Change Name')}
            onPress={navigateTChangeName}
            iconname={'clipboard-outline'}
          />
          <CustomTouchableOpacity
            title={tt('Change Email')}
            onPress={navigateTChangeEmail}
            iconname={'clipboard-outline'}
          />
          <CustomTouchableOpacity
            title={tt('Change Phone Number')}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
            iconname={'call-outline'}
          />

          <CustomTouchableOpacity
            title={tt('Change Password')}
            onPress={function (): void {
              throw new Error('Function not implemented.');
            }}
            iconname={'key'}
          />

          <CustomTouchableOpacity
            title={tt('Change Height and Weight')}
            onPress={onPressChangeHeightWeight}
            iconname={'barbell-outline'}
          />
        </View>
        <View style={{ padding: 20 }}>
          <Text style={stylesEditProfile.sport}>
            {tt('Sport Activity Frequency')}
          </Text>

          <ButtonGroup
            options={[
              {
                value: HasSportActivity.Extra_Active,
                label: tt('Extra_Active')
              },
              {
                value: HasSportActivity.Very_Active,
                label: tt('Very_Active')
              },

              {
                value: HasSportActivity.Moderately_Active,
                label: tt('Moderately_Active')
              },
              {
                value: HasSportActivity.Lightly_Active,
                label: tt('Lightly_Active')
              },
              {
                value: HasSportActivity.Sedentary,
                label: tt('Sedentary')
              }
            ]}
            onSelectionChange={handleOptionSelect}
          />
        </View>
      </ScrollView>
    </>
  );
};

export default EditProfile;
