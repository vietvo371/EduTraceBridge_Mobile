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
import { COLORS } from '../styles/theme';

// Navigation params types
export type RootStackParamList = {
  Started: undefined;
  Auth: undefined;
  MainTab: undefined;
};

export type MainTabParamList = {
  Home: undefined;
  Certificates: undefined;
  Jobs: undefined;
  Profile: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

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
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Started" component={StartedScreen} />
        <Stack.Screen name="Auth" component={LoginScreen} />
        <Stack.Screen name="MainTab" component={MainTabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 