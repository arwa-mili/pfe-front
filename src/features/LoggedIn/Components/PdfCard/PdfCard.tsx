import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Linking
} from 'react-native';
import { Card } from '@rneui/themed';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { pdfStyles } from './pdfCardStyles';
import { Images } from '../../../../utils/StylingConsts/images/Images';
import { handleGenericError } from '../../../../utils/helpers/Errors';
import { useAppDispatch } from '../../../../hooks/hooks';

interface PdfCardProps {
  uri: string;
  title: string;
  handleLinkPress: (uriii: string) => void;
}

const PdfCard: React.FC<PdfCardProps> = ({ uri, title, handleLinkPress }) => {
  const linkPhrase = 'View PDF file';
  const dispatch = useAppDispatch();

  return (
    <View>
      <Card.Divider />
      <ScrollView style={pdfStyles.card}>
        <TouchableOpacity>
          <View>
            <Image
              style={pdfStyles.Image}
              resizeMode="contain"
              source={Images.pdf}
            />
            <View style={pdfStyles.overlay}>
              <Text>{title}</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={pdfStyles.bottom}>
          <TouchableOpacity
            style={pdfStyles.text4}
            onPress={() => handleLinkPress(uri)}>
            <Text style={pdfStyles.link}>{linkPhrase}</Text>
          </TouchableOpacity>
          <View style={pdfStyles.iconsContainer}>
            <TouchableOpacity
              onPress={() => {
                Linking.openURL(uri).catch((err) =>
                  handleGenericError(err, dispatch)
                );
              }}>
              <View style={pdfStyles.ViewL}>
                <View style={pdfStyles.iconContainer}>
                  <MaterialIcons name="download" size={18} color="black" />
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => console.log('Share')}>
              <View style={pdfStyles.ViewL}>
                <View style={pdfStyles.iconContainer}>
                  <MaterialIcons name="share" size={18} color="black" />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default PdfCard;
