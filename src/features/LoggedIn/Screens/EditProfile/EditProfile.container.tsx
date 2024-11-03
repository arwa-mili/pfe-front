import * as React from 'react';
import EditProfile from './EditProfile';
import { DrawerScreenProps } from '@react-navigation/drawer';
import { DrawerNavigatorParamList } from '../../../../navigation/routes/Drawer';
import {
  ChangeEmail_SCREEN,
  CHANGEHEIGHTWEIGHT_SCREEN,
  EDITPROFILE_SCREEN
} from '../../../../utils/consts/screensNames/ScreensNames';
import { useAppSelector } from '../../../../hooks/hooks';

interface EditProfileProps
  extends DrawerScreenProps<
    DrawerNavigatorParamList,
    typeof EDITPROFILE_SCREEN
  > {}
const EditProfileContainer: React.FC<EditProfileProps> = ({ navigation }) => {
  const user = useAppSelector((state) => state.user);
  const [selectedOption, setSelectedOption] = React.useState<string | null>(
    user.sportActivity as unknown as string
  );
  const initialValues = {
    firstName: '',
    lastName: '',
    phoneNumber: '',
    email: '',
    height: '',
    weight: ''
  };

  const handleChange = async () => {};

  return (
    <>
      <EditProfile
        handleOptionSelect={(value) => {
          console.log(value);
          setSelectedOption(value as string);
        }}
        handlePress={function (): void {
          throw new Error('Function not implemented.');
        }}
        uri={undefined}
        onPress1={function (): void {
          throw new Error('Function not implemented.');
        }}
        visible={false}
        onClose={function (): void {
          throw new Error('Function not implemented.');
        }}
        onImageLibraryPress={function (): void {
          throw new Error('Function not implemented.');
        }}
        handleSubmit={handleChange}
        initialValues={initialValues}
        value={selectedOption}
        onPressChangeHeightWeight={() =>
          navigation.navigate(CHANGEHEIGHTWEIGHT_SCREEN)
        }
        navigateTChangeName={function (): void {
          throw new Error('Function not implemented.');
        }}
        navigateTChangeEmail={() => navigation.navigate(ChangeEmail_SCREEN)}
      />
    </>
  );
};

export default EditProfileContainer;
