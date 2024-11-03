import { StyleSheet } from 'react-native';

export const stylesuserDataForDoctors = StyleSheet.create({
  main: {
    flexDirection: 'column',
    padding: 20,
    backgroundColor: '#f8f9fa',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ced4da',
    margin: 10
  },
  element: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e9ecef'
  },
  labelText: {
    fontWeight: 'bold',
    color: '#495057',
    fontSize: 16
  },
  valueText: {
    color: '#6c757d',
    fontSize: 16
  },
  sectionTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    color: '#343a40',
    marginBottom: 10,
    textDecorationLine: 'underline'
  }
});
