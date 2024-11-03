import { StyleSheet } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../../../utils/StylingConsts/fontSize/FontSizes';

export const stylesBMIRepresentation = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 20,
    marginVertical: 350,
    alignSelf: 'center'
  },

  zoneLabel: {
    top: -50,
    fontSize: FontSize.size_mini,
    fontWeight: 'bold',
    color: Color.colorBlack
  },
  rangeLabel: {
    position: 'absolute',
    top: -20,
    alignSelf: 'center',
    fontSize: 12
  },
  range: {
    position: 'relative'
  },
  stepper: {
    position: 'absolute',
    top: -4,
    width: 2,
    height: 30,
    borderRadius: 10,
    backgroundColor: Color.colorBlack
  },
  bmiView: {
    alignContent: 'center',
    justifyContent: 'center'
  },
  bmiValue: {
    position: 'absolute',
    top: -45,
    fontSize: FontSize.size_mini,
    fontWeight: 'bold',
    color: Color.colorBlack
  },
  bmiLabel: {
    position: 'absolute',
    top: -25,
    alignSelf: 'center',
    fontSize: FontSize.size_mini,
    fontWeight: 'bold',
    color: Color.colorBlack
  },

  rangeLimit: {
    position: 'absolute',
    bottom: -15,
    left: -5,
    fontSize: FontSize.size_10
  }
});
