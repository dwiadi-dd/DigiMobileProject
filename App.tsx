/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FC, useEffect} from 'react';
import {AuthProvider} from '@contexts/AuthContext';
import {PostsProvider} from '@contexts/PostContext';
import MainNavigation from '@navigations/index';
import notifee, {EventType} from '@notifee/react-native';

const App: FC = () => {
  useEffect(() => {
    return notifee.onForegroundEvent(({type, detail}) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
  }, []);
  return (
    <PostsProvider>
      <AuthProvider>
        <MainNavigation />
      </AuthProvider>
    </PostsProvider>
  );
};
export default App;
