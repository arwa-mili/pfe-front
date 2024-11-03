import React from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { LastdataOfUserResponse } from '../../../interfaces/chatsUserDoctor/DataOfUser';
import Loader from '../../../components/Loader/Loader';
import { stylesuserDataForDoctors } from './userDataForDoctorStyles';
import CurvedLineChart from '../../../features/LoggedIn/Components/CurvedLineChart/CurvedLineChart';
import { stylesHealthTrackers } from '../../../features/LoggedIn/Screens/HealthTrackers/healthTrackersStyles';
import { stylesMedicalFiles } from '../../../features/LoggedIn/Screens/MedicalFiles/medicalFilesStyles';
import PdfCard from '../../../features/LoggedIn/Components/PdfCard/PdfCard';

interface UserDataForDoctorProps {
  dataTosend: LastdataOfUserResponse | null;
}
const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const UserDataForDoctor: React.FC<UserDataForDoctorProps> = ({
  dataTosend
}): JSX.Element => {
  const handleLinkPress = () => {
    console.log('pressed');
  };
  return dataTosend ? (
    <>
      <View style={stylesuserDataForDoctors.main}>
        <Text style={stylesuserDataForDoctors.sectionTitle}>
          Patient Information
        </Text>
        <View style={stylesuserDataForDoctors.element}>
          <Text style={stylesuserDataForDoctors.labelText}>Name:</Text>
          <Text style={stylesuserDataForDoctors.valueText}>
            {dataTosend.username}
          </Text>
        </View>
        <View style={stylesuserDataForDoctors.element}>
          <Text style={stylesuserDataForDoctors.labelText}>Age:</Text>
          <Text style={stylesuserDataForDoctors.valueText}>
            {dataTosend.age}
          </Text>
        </View>
        <View style={stylesuserDataForDoctors.element}>
          <Text style={stylesuserDataForDoctors.labelText}>
            Has family antecedents with heart disease:
          </Text>
          <Text style={stylesuserDataForDoctors.valueText}>
            {dataTosend.heartDiseaseFamilyHisto === true ? 'yes' : 'no'}
          </Text>
        </View>
        <View style={stylesuserDataForDoctors.element}>
          <Text style={stylesuserDataForDoctors.labelText}>
            Has family antecedents with diabetes disease:
          </Text>
          <Text style={stylesuserDataForDoctors.valueText}>
            {dataTosend.diabetiesFamilyHistory === true ? 'yes' : 'no'}
          </Text>
        </View>
        <View style={stylesuserDataForDoctors.element}>
          <Text style={stylesuserDataForDoctors.labelText}>Diseases</Text>
          <Text style={stylesuserDataForDoctors.valueText}>
            Diabeties type I , Hypertension
          </Text>
        </View>
      </View>
      <ScrollView style={stylesHealthTrackers.chart}>
        {dataTosend.measures.map(
          (item, index) =>
            item.measures_hist.length > 0 && (
              <CurvedLineChart
                key={index}
                data={item.measures_hist}
                name={item.measures_hist[0].measure_name}
                Width={screenWidth * 0.28}
                Height={screenHeight * 5}
              />
            )
        )}
      </ScrollView>
      <ScrollView>
        <View style={stylesMedicalFiles.fileContainer}>
          {dataTosend.medicalfiles.map((item, index) => (
            <PdfCard
              key={index}
              title={item.title}
              uri={item.url}
              handleLinkPress={handleLinkPress}
            />
          ))}
        </View>
      </ScrollView>
    </>
  ) : (
    <Loader />
  );
};

export default UserDataForDoctor;
