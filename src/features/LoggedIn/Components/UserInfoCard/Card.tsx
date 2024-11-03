import React from 'react';
import { View, ScrollView, Image, TouchableOpacity } from 'react-native';
import { stylesUserCard } from './userCardStyles';
import { Text, Card, Icon } from '@rneui/themed';
import { useAppSelector } from '../../../../hooks/hooks';
import { tt } from '../../../../locales/translation.config';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { Images } from '../../../../utils/StylingConsts/images/Images';
interface CardsComponentsProps {
  onClickEditProfile: () => void;
  onPressMedicalReports: () => void;
  onPressHealthTracks: () => void;
}

const CardPresenter: React.FC<CardsComponentsProps> = ({
  onClickEditProfile,
  onPressMedicalReports,
  onPressHealthTracks
}) => {
  const user = useAppSelector((state) => state.user);

  return (
    <>
      <ScrollView>
        <View style={stylesUserCard.container}>
          <Card containerStyle={stylesUserCard.cardBorder}>
            <TouchableOpacity
              style={stylesUserCard.touch}
              onPress={onClickEditProfile}>
              <Card.Title style={stylesUserCard.cardTitle}>...</Card.Title>
            </TouchableOpacity>
            <View style={stylesUserCard.cardContent}>
              <View style={stylesUserCard.topContent}>
                <Image style={stylesUserCard.avatar} source={Images.avatar} />

                <View style={stylesUserCard.TextInfos}>
                  <Text style={stylesUserCard.Name}>
                    {user.name} {user.surname}
                  </Text>
                  <View style={stylesUserCard.additionalInfos}>
                    <Text style={stylesUserCard.infos}>
                      {user.age} {tt('years')},
                    </Text>
                    <Text style={stylesUserCard.infos}>{user.gender},</Text>
                    <Text style={stylesUserCard.infos}>
                      BMI : {user.BMI && user.BMI.toFixed(2)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={stylesUserCard.bottomContent}>
                <TouchableOpacity
                  style={stylesUserCard.touchable}
                  onPress={onPressMedicalReports}>
                  <Icon
                    name="text-snippet"
                    color={Color.colorBlack}
                    size={40}
                    iconStyle={stylesUserCard.icons}
                  />
                  <Text style={stylesUserCard.touchableText}>
                    {' '}
                    {tt('Medical Reports')}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={stylesUserCard.touchable}
                  onPress={onPressHealthTracks}>
                  <Icon
                    name="assessment"
                    color={Color.colorBlack}
                    size={40}
                    iconStyle={stylesUserCard.icons}
                  />
                  <Text style={stylesUserCard.touchableText}>
                    {tt('Health Trackers')}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Card>
        </View>
      </ScrollView>
    </>
  );
};

export default CardPresenter;
