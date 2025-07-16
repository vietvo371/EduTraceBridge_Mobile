import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/styles/theme';
import './src/utils/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';

// Enable native screens
enableScreens();

const App = () => {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <StatusBar
          barStyle={Platform.OS === 'ios' ? 'dark-content' : 'light-content'}
          backgroundColor={COLORS.primary}
        />
        <AppNavigator />
      </Provider>
    </GestureHandlerRootView>
  );
};

export default App;