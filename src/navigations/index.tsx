import React, {useEffect, useCallback} from 'react';
import {
  NavigationContainer,
  NavigationProp,
  useNavigation,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Onboarding from '@screens/Onboarding';
import Login from '@screens/Login';

import {DetailPost} from '@screens/DetailPost';
import CreatePost from '@screens/CreatePost';
import {HomeTab} from '@screens/Home/components/HomeTab';
import Register from '@screens/Register/Register';
import notifee, {EventType, Event} from '@notifee/react-native';

const Stack = createNativeStackNavigator();
type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  OnBoarding: undefined;
  HomeTab: undefined;
  Post: {id: string};
  'Create Post': undefined;
};

const InitNotification = () => {
  const navigation = useNavigation<NavigationProp<RootStackParamList>>();

  const onHandleNotification = useCallback(
    async ({type, detail}: Event) => {
      switch (type) {
        case EventType.PRESS:
          if (detail.notification?.data?.type === 'OPEN_POST_DETAIL') {
            const postId = detail.notification.data.postId;
            if (typeof postId === 'string') {
              navigation.navigate('Post', {id: postId});
            }
          }
          break;
      }
    },
    [navigation],
  );

  useEffect(() => {
    const unsubscribeForeground =
      notifee.onForegroundEvent(onHandleNotification);
    notifee.onBackgroundEvent(onHandleNotification);

    return () => {
      unsubscribeForeground();
    };
  }, [onHandleNotification]);

  return null;
};
export default function MainNavigation() {
  return (
    <NavigationContainer>
      <InitNotification />
      <Stack.Navigator>
        <Stack.Screen
          name="OnBoarding"
          component={Onboarding}
          options={{title: 'Welcome', headerShown: false}}
        />
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
