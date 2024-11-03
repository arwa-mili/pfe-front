import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { stylesDoctorsCard } from './doctorsCardStyles';
import { DoctorsClient } from '../../../../models/Doctor';
import { stylesGlobal } from '../../Utils/styling/globalStyles';
import { tt } from '../../../../locales/translation.config';
import { Images } from '../../../../utils/StylingConsts/images/Images';

interface DoctorsCardProps {
  data: DoctorsClient;
  handleViewAvailability: (url: string) => void;
  handleRequestChat: (id: number) => void;
}

const DoctorsCard: React.FC<DoctorsCardProps> = ({
  data,
  handleViewAvailability,
  handleRequestChat
}) => {
  return (
    <View style={stylesDoctorsCard.card}>
      <Image source={Images.avatar} style={stylesDoctorsCard.image} />
      <View style={stylesDoctorsCard.cardDetails}>
        <View>
          <Text style={stylesDoctorsCard.name}>{data.fullname}</Text>
          <Text style={stylesDoctorsCard.email}>{data.speciality}</Text>
        </View>
        <Text style={stylesDoctorsCard.email}>{data.email}</Text>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end'
          }}>
          {data.calendar_link && (
            <TouchableOpacity
              onPress={() => handleViewAvailability(data.calendar_link)}>
              <Text style={stylesGlobal.link}>{tt('View Availability')}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => handleRequestChat(data.id)}>
            <Text style={stylesGlobal.link}>{tt('Request for Chat')}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default DoctorsCard;
