import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Home';
import Profile from '@screens/Profile';
import {HomeIcon, ProfileIcon} from './IconBar';
import {TouchableOpacity} from 'react-native';
import useAuth from '@hooks/useAuth';
import {HomeTopBar} from '@components/molecules';

const BottomTab = createBottomTabNavigator();
const renderHomeIcon = ({focused}: {focused: boolean}) => (
  <HomeIcon focused={focused} />
);
const renderProfileIcon = ({focused}: {focused: boolean}) => (
  <ProfileIcon focused={focused} />
);

export const HomeTab = () => {
  return (
    <BottomTab.Navigator
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: {height: 60},
      }}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: renderHomeIcon,
          header: HomeTopBar,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: renderProfileIcon,
          headerShown: false,
          tabBarButton: ProfileTabBarButton,
        }}
      />
    </BottomTab.Navigator>
  );
};

const ProfileTabBarButton = ({...props}) => {
  const handleProfilePress = useAuth(() => {});

  return <TouchableOpacity {...props} onPress={handleProfilePress} />;
};
