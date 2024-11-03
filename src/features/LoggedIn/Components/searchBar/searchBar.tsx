import React, { useState } from 'react';
import { View, TextInput, SafeAreaView } from 'react-native';
import { Color } from '../../../../utils/StylingConsts/Colors/Colors';
import { styleSearchBar } from './searchBarStyles';
import { Icons } from '../../../../utils/StylingConsts/Icons/icons';
import { stylesGlobal } from '../../Utils/styling/globalStyles';
interface SearchBarProps {
  placeholderText: string;
  sorting: boolean;
  handleAction?: (text: string) => void;
}

const SearchComponent: React.FC<SearchBarProps> = ({
  placeholderText,
  sorting,
  handleAction
}) => {
  const [text, setText] = useState<string>('');
  return (
    <SafeAreaView style={stylesGlobal.container}>
      <View style={styleSearchBar.layout}>
        <View style={styleSearchBar.inputContainer}>
          <Icons.Material name="search" size={28} />
          <TextInput
            style={styleSearchBar.searchPlaceholder}
            placeholder={placeholderText}
            value={text}
            onChangeText={(text) => {
              setText(text), handleAction && handleAction(text);
            }}
          />
        </View>

        {sorting && (
          <View style={styleSearchBar.sortBtn}>
            <Icons.Material name="tune" size={28} color={Color.white} />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default SearchComponent;
