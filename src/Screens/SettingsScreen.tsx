import React, { useState } from 'react';
import {
  View,
  LayoutAnimation,
  StyleSheet,
  Text,
  TouchableNativeFeedback,
  TouchableOpacity
} from 'react-native';
import { changeLanguage, tt } from '../locales/translation.config';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import { useAppDispatch } from '../hooks/hooks';
import { setLanguage } from '../hooks/Slices/UserSlice';

const languages = [
  { name: 'english', code: 'en' },
  { name: 'french', code: 'fr' }
];
const SettingsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const [showLanguagesList, setOpenLanguagesList] = useState(false);
  const handleLanguageChange = (language: string) => {
    dispatch(setLanguage(language));
    changeLanguage(language);
  };

  return (
    <>
      <TouchableNativeFeedback
        onPress={() => {
          setOpenLanguagesList(!showLanguagesList);
          LayoutAnimation.configureNext(
            LayoutAnimation.create(200, 'easeInEaseOut', 'opacity')
          );
        }}>
        <View style={styles.button}>
          <Text style={styles.buttonText}>{tt('changeLanguage')}</Text>
        </View>
      </TouchableNativeFeedback>
      {showLanguagesList && (
        <>
          {languages.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={[styles.button, { paddingHorizontal: 24 }]}
              onPress={() => handleLanguageChange(item.code)}>
              <Text style={styles.buttonText}>{tt(item.name)}</Text>
            </TouchableOpacity>
          ))}
        </>
      )}
    </>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  button: {
    padding: 10
  },
  buttonText: {
    fontSize: 18,
    color: Colors.primary
  },
  container: {
    flex: 1,
    margin: 10
  }
});
