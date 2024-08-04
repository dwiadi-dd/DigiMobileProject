/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC} from 'react';
import {AuthProvider} from '@contexts/AuthContext';
import {PostsProvider} from '@contexts/PostContext';
import MainNavigation from '@navigations/index';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';

async function onMessageReceived(message: any) {
  notifee.displayNotification(JSON.parse(message.data.notifee));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);
const App: FC = () => {
  return (
    <PostsProvider>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </PostsProvider>
  );
};
export default App;
