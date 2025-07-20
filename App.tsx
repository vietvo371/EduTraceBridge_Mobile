import React from 'react';
import { StatusBar, Platform } from 'react-native';
import { Provider } from 'react-redux';
import { store } from './src/store';
import AppNavigator from './src/navigation/AppNavigator';
import { COLORS } from './src/styles/theme';
import './src/utils/i18n';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { enableScreens } from 'react-native-screens';
import PushNotification from 'react-native-push-notification';
import Toast from 'react-native-toast-message';

// Enable native screens
enableScreens();

const App = () => {
  React.useEffect(() => {
    configureNotifications();
  }, []);

  // Configure notifications
  const configureNotifications = () => {
    PushNotification.configure({
      onRegister: function (token: any) {
        console.log('TOKEN:', token);
      },
      onNotification: function (notification: any) {
        console.log('NOTIFICATION:', notification);
      },
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },
      popInitialNotification: true,
      requestPermissions: Platform.OS === 'ios',
    });

    // Create notification channel for Android
    if (Platform.OS === 'android') {
      PushNotification.createChannel(
        {
          channelId: 'default',
          channelName: 'Default',
          channelDescription: 'Default notifications channel',
          soundName: 'default',
          importance: 4,
          vibrate: true,
        },
        () => { }
      );
    }
  };

  return (
    <Provider store={store}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <StatusBar
          barStyle="light-content"
          backgroundColor={COLORS.primary}
        />
        <AppNavigator />
        <Toast />
      </GestureHandlerRootView>
    </Provider>
  );
};

export default App;