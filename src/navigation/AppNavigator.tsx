import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HomeScreen from '../screens/Home/HomeScreen';
import StartedScreen from '../screens/Started/StartedScreen';
import LoginScreen from '../screens/Auth/LoginScreen';
import CertificatesScreen from '../screens/Certificates/CertificatesScreen';
import JobsScreen from '../screens/Jobs/JobsScreen';
import ProfileScreen from '../screens/Profile/ProfileScreen';
import LearningScreen from '../screens/Learning/LearningScreen';
import LoadingScreen from '../screens/Loading/LoadingScreen';
import { COLORS } from '../styles/theme';
import DetailLearningScreen from '../screens/Learning/DetailLearningScreen';
import DetailJobScreen from '../screens/Jobs/DetailJobScreen';
import PDFViewerScreen from '../screens/Profile/PDFViewerScreen';
import NotificationScreen from '../screens/Notification/NotificationScreen';

// Navigation params types
export type RootStackParamList = {
  Loading: undefined;
  Started: undefined;
  Auth: undefined;
  MainTab: undefined;
  DetailLearningScreen: undefined;
  DetailJobScreen: undefined;
  PDFViewer: undefined;
  Notification: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Certificates: undefined;
  Learning: undefined;
  Jobs: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

interface AppNavigatorProps {
  initialRoute?: keyof RootStackParamList;
}

// Main Tab Navigator
const MainTabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          switch (route.name) {
            case 'Home':
              iconName = 'home';
              break;
            case 'Certificates':
              iconName = 'school';
              break;
            case 'Learning':
              iconName = 'book';
              break;
            case 'Jobs':
              iconName = 'work';
              break;
            case 'Profile':
              iconName = 'person';
              break;
            default:
              iconName = 'home';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray,
        headerShown: true,
        headerStyle: {
          backgroundColor: COLORS.primary,
        },
        headerTintColor: '#fff',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
          title: 'Trang chủ'
        }}
      />
      <Tab.Screen
        name="Certificates"
        component={CertificatesScreen}
        options={{
          headerShown: false,
          title: 'Văn bằng'
        }}
      />
      <Tab.Screen
        name="Learning"
        component={LearningScreen}
        options={{
          headerShown: false,
          title: 'Học tập'
        }}
      />
      <Tab.Screen
        name="Jobs"
        component={JobsScreen}
        options={{
          headerShown: false,
          title: 'Việc làm'
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
          title: 'Hồ sơ'
        }}
      />
    </Tab.Navigator>
  );
};

// Root Navigator
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Loading"
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Loading" component={LoadingScreen} />
        <Stack.Screen name="Started" component={StartedScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
        <Stack.Screen name="DetailJobScreen" component={DetailJobScreen} />
        <Stack.Screen name="DetailLearningScreen" component={DetailLearningScreen} />
        <Stack.Screen
          name="PDFViewer"
          component={PDFViewerScreen}
          options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: COLORS.primary,
            },
            headerTintColor: '#fff',
            title: 'Xem CV'
          }}
        />
        <Stack.Screen 
          name="Notification" 
          component={NotificationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator;