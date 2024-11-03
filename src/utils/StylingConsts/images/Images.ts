import { ImageSourcePropType } from 'react-native';

export type ImagesType = {
  authScreensImg: ImageSourcePropType | undefined;
  logo: ImageSourcePropType | undefined;
  pdf: ImageSourcePropType | undefined;
  show: ImageSourcePropType | undefined;
  hide: ImageSourcePropType | undefined;
  avatar: ImageSourcePropType | undefined;
  mealBackground: ImageSourcePropType | undefined;
  mealAvatar: ImageSourcePropType | undefined;
  nutritionPlanBackground: ImageSourcePropType | undefined;
  dashboard: ImageSourcePropType | undefined;
  nomeals: ImageSourcePropType | undefined;
  sendMessage: ImageSourcePropType | undefined;
  attachement: ImageSourcePropType | undefined;
  requestConsulted: ImageSourcePropType | undefined;
  requestAccepted: ImageSourcePropType | undefined;
};
export const Images: ImagesType = {
  nutritionPlanBackground: require('../../../assets/images/addNutritionplanBackground/addNutritionPlanBackground.jpg'),
  authScreensImg: require('../../../assets/vector-3.png'),
  logo: require('../../../assets/images/logo/logo.png'),
  pdf: require('../../../assets/images/pdf/pdf.png'),
  show: require('../../../assets/images/show/show.png'),
  hide: require('../../../assets/images/hide/hide.png'),
  avatar: require('../../../assets/images/avatar/avatar.jpeg'),
  mealBackground: require('../../../assets/images/mealBackground/mealBackground.png'),
  mealAvatar: require('../../../assets/images/mealAvatar/mealAvatar.jpg'),
  dashboard: require('../../../assets/images/charts/dashboard.png'),
  nomeals: require('../../../assets/images/NoMealsAvailable/NoMealsToShow.png'),
  sendMessage: require('../../../assets/images/sendMessage/sendMessage.png'),
  attachement: require('../../../assets/images/attachement/attached.png'),
  requestAccepted: require('../../../assets/images/requestAccepted/requestAccepted.png'),
  requestConsulted: require('../../../assets/images/requestConsulted/requestConsulted.png')
};
