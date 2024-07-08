/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Onboarding from './src/screens/Onboarding';
import Login from './src/screens/Login';
import Home from './src/screens/Home/Home';
import Profile from './src/screens/Profile';
import {Icon} from '@components/atom';
import COLORS from '@constant/colors';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const HomeTab = () => {
  const [activeTab, setActiveTab] = React.useState('Home');

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,

        tabBarLabelStyle: {
          fontWeight: route.name === 'Home' ? 'bold' : 'normal',
        },
        tabBarIcon: ({color, size}) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = 'home';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <Icon name={iconName} fill={color} size={size} />;
        },
        tabBarStyle: {height: 52, paddingVertical: 4}, // Add this line to set vertical padding
      })}
      tabBarOptions={{
        activeTintColor: COLORS.purple600,
        inactiveTintColor: 'gray',
      }}>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};
function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={Onboarding}
          options={{title: 'Welcome'}}
        />
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
export default App;
