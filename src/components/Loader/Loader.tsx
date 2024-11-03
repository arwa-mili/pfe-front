import React from 'react';
import { View, Modal, ActivityIndicator } from 'react-native';
import { stylesLoader } from './loaderStyles';
import LottieView from 'lottie-react-native';
import { Jsons } from '../../utils/StylingConsts/Json/Json';

const Loader = (props: any) => {
  const { loading } = props;

  return (
    <Modal
      transparent={true}
      animationType={'none'}
      visible={loading === true}
      onRequestClose={() => {
        console.log('close modal');
      }}>
      <View style={stylesLoader.modalBackground}>
        <View style={stylesLoader.activityIndicatorWrapper}>
          <LottieView
            source={Jsons.loader}
            style={stylesLoader.lottieAnimation}
            autoPlay
            loop
          />
          <ActivityIndicator animating={loading} />
        </View>
      </View>
    </Modal>
  );
};

export default Loader;
