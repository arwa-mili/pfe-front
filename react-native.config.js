module.exports = {
  assets: ['./src/assets/fonts/'],
  dependencies: {
    'react-native-vector-icons': {
      platforms: {
        ios: null
      }
    }
  },
  dependency: {
    platforms: {
      android: {
        packageImportPath: 'import io.invertase.notifee.NotifeePackage;',
        packageInstance: 'new NotifeePackage()'
      },
      ios: {}
    }
  }
};
