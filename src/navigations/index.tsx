import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '@screens/Onboarding';
import Login from '@screens/Login';

import {DetailPost} from '@screens/DetailPost';
import CreatePost from '@screens/CreatePost';
import {HomeTab} from '@screens/Home/components/HomeTab';
import Register from '@screens/Register/Register';
import notifee, {EventType} from '@notifee/react-native';
import {useNavigation} from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const InitNotification = () => {
  const {navigate} = useNavigation();
  const onHandleNotification = async ({type, detail}) => {
    switch (type) {
      case EventType.PRESS:
        if (detail.notification?.data.type === 'OPEN_POST_DETAIL') {
          navigate('Post', {id: detail.notification?.data.postId});
        }
        break;
    }
  };

  useEffect(() => {
    notifee.onForegroundEvent(onHandleNotification);
    notifee.onBackgroundEvent(onHandleNotification);
  }, []);

  return null;
};
export default function MainNavigation() {
  return (
    <NavigationContainer>
      <InitNotification />
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Register"
          component={Register}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="OnBoarding"
          component={Onboarding}
          options={{title: 'Welcome', headerShown: false}}
        />
        <Stack.Screen
          name="HomeTab"
          component={HomeTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Post"
          component={DetailPost}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="Create Post"
          component={CreatePost}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
