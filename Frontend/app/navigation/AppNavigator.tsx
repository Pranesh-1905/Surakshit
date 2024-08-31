import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';
import LoginScreen from '../screens/Login_Screen';
import RegisterScreen from '../screens/Reg_Screen';
import DashboardScreen from '../screens/DashboardScreen';
import AlertGuidelineScreen from '../screens/AlertGuidelineScreen';
import OfflineScreen from '../screens/OfflineScreen';
import { Animated } from 'react-native-reanimated';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

const fadeAnimation = {
  animation: 'fade',
  animationDuration: 500,
};

const AuthNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS, // Slide transition for iOS and Android
      }}
    >
      
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
      <Stack.Screen name="Dashboard" component={DashboardScreen} />
      <Stack.Screen name="Alert" component={AlertGuidelineScreen} />
      <Stack.Screen name="Offline" component={OfflineScreen} />
    </Stack.Navigator>
  );
};

const AppNavigator = () => {
  const navigation = useNavigation();
  return (
    <>
      <Tab.Navigator
        animationEnabled={true} // Add this prop to enable animations
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = focused ? 'dashboard' : 'dashboard';
            } else if (route.name === 'Alert') {
              iconName = focused ? 'exclamation-circle' : 'exclamation-circle';
            } else if (route.name === 'Offline') {
              iconName = focused ? 'cloud' : 'cloud';
            } else if (route.name === 'Login') {
              iconName = focused ? 'sign-in' : 'sign-in';
            } else if (route.name === 'Register') {
              iconName = focused ? 'user-plus' : 'user-plus';
            }

            return <Icon name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#2c3e50',
          tabBarInactiveTintColor: 'gray',
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
        })}
      >
        <Tab.Screen name="Login" component={LoginScreen} {...fadeAnimation} />
        <Tab.Screen name="Dashboard" component={DashboardScreen} {...fadeAnimation} />
        <Tab.Screen name="Alert" component={AlertGuidelineScreen} {...fadeAnimation} />
        <Tab.Screen name="Offline" component={OfflineScreen} {...fadeAnimation} />
        <Tab.Screen name="Register" component={RegisterScreen} {...fadeAnimation} />
      </Tab.Navigator>
      <Button
        title="Logout"
        onPress={() => navigation.navigate('Login')}
        style={styles.logoutButton}
      />
    </>
  );
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#f8f8f8',
    borderTopWidth: 0,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tabBarLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  logoutButton: {
    backgroundColor: '#e74c3c',
    color: '#fff',
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
});

export default AppNavigator;