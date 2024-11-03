import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import LayoutContainer from './navigation/Layout.container';
import store, { persistor } from './store/store';
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Bridge was already shutdown']);

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <LayoutContainer />
      </PersistGate>
    </Provider>
  );
}
export default App;
