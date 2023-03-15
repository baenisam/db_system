import * as React from 'react';
import {SafeAreaView, Text} from 'react-native';
import FlashMessage from "react-native-flash-message";
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './src/redux/store';
import AuthNavigator from './src/navigators/AuthNavigator';
import {GlobalProvider} from './src/services/context';
export default function App() {
  return (
    <NavigationContainer>
      <GlobalProvider>
        <Provider store={store}>
          <AuthNavigator />
          <FlashMessage position="bottom" />
        </Provider>
      </GlobalProvider>
    </NavigationContainer>
  );
}
