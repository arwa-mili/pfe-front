const config = {
  screens: {
    DoctorFlowS: {
      path: 'reset/:params'
    }
  }
};

const linking = {
  prefixes: [
    'appchat://reset-password/',
    'https://api.medi-nexus.zvr1ev89.pfe.anypli.com/reset-password/'
  ],
  config
};

export default linking;
