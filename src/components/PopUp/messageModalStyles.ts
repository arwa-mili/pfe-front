import { StyleSheet } from 'react-native';
import { Color } from '../../utils/StylingConsts/Colors/Colors';
import { FontSize } from '../../utils/StylingConsts/fontSize/FontSizes';

export const stylesMessageModal = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Color.colorBlack
  },
  modalView: {
    backgroundColor: Color.secondary,
    width: '100%',
    alignItems: 'center',
    paddingTop: 45,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },
  modalIcon: {
    backgroundColor: Color.neutral,
    height: 100,
    width: 100,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: -50,
    elevation: 5,
    shadowColor: Color.colorBlack,
    shadowOpacity: 0.25,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 }
  },

  modalContent: {
    width: '100%',
    alignItems: 'center',
    padding: 20
  },
  headerText: {
    textAlign: 'center',
    marginBottom: 10
  },
  messageText: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: FontSize.size_mini
  },
  decisionRow: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-around'
  },
  decisionButton: {
    width: 'auto'
  }
});
