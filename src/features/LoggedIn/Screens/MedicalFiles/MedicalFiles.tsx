import React from 'react';
import { RefreshControl, ScrollView, View } from 'react-native';
import PdfCard from '../../Components/PdfCard/PdfCard';
import Header from '../../../UserInfos/Components/Header/Header';
import { stylesMedicalFiles } from './medicalFilesStyles';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import Loader from '../../../../components/Loader/Loader';
import { MedicalFile } from '../../../../models/MedicalFile';

/**
 * Represents MedicalFiles screen ui
 * @returns JSX.Element
 */
interface MedicalFilesProps {
  refreshing: boolean;
  handlePress: () => void;
  data: MedicalFile[];
  onRefresh: () => void;
  handleLinkPress: (uri: string) => void;
}

const MedicalFiles: React.FC<MedicalFilesProps> = ({
  data,
  handlePress,
  refreshing,
  onRefresh,
  handleLinkPress
}): JSX.Element => {
  return (
    <>
      <View style={stylesMedicalFiles.scrollView}>
        <Header
          handlePress={handlePress}
          textStyle={stylesMedicalFiles.title}
          medium={true}
          title={'Medical Files'}
        />
        {refreshing ? <Loader /> : null}
        <ScrollView
          style={stylesMedicalFiles.scrollView}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          <View style={stylesMedicalFiles.fileContainer}>
            {data.map((item, index) => (
              <PdfCard
                key={index}
                title={item.title}
                uri={item.url}
                handleLinkPress={handleLinkPress}
              />
            ))}
          </View>
        </ScrollView>
        <View style={stylesMedicalFiles.addIcon}>
          <Icons.Material name="add-box" color={Color.colorBlack} size={50} />
        </View>
      </View>
    </>
  );
};

export default MedicalFiles;
