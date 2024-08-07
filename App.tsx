/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import React, {FC, useEffect} from 'react';
import MainNavigation from '@navigations/index';
import messaging from '@react-native-firebase/messaging';
import notifee from '@notifee/react-native';
import analytics from '@react-native-firebase/analytics';
import crashlytics from '@react-native-firebase/crashlytics';
import JailMonkey from 'jail-monkey';
import {Alert} from 'react-native';
import codePush from 'react-native-code-push';

if (__DEV__) {
  analytics().setAnalyticsCollectionEnabled(true);
}

async function onMessageReceived(message: any) {
  notifee.displayNotification(JSON.parse(message.data.notifee));
}

messaging().onMessage(onMessageReceived);
messaging().setBackgroundMessageHandler(onMessageReceived);

const App: FC = () => {
  useEffect(() => {
    crashlytics().log('App mounted.');
    if (JailMonkey.isJailBroken()) {
      Alert.alert('Warning', 'This device is jailbroken/rooted.');
    }

    codePush.sync({
      installMode: codePush.InstallMode.ON_NEXT_RESTART,
      mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
    });
  }, []);

  return <MainNavigation />;
};

const codePushOptions = {
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
};

export default codePush(codePushOptions)(App);
