/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {FunctionComponent} from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {HomeTab} from '@screens/Home/Home';
import Onboarding from '@screens/Onboarding';
import Login from '@screens/Login';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {AuthProvider} from '@contexts/AuthContext';
import CreatePost from '@screens/CreatePost';
import DetailPost from '@screens/DetailPost';

const Stack = createNativeStackNavigator();

const App: FunctionComponent = () => {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Post" component={DetailPost} />

          <Stack.Screen
            name="HomeTab"
            component={HomeTab}
            options={{headerShown: false}}
          />
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
            name="Create Post"
            component={CreatePost}
            options={{headerShown: false}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
};
export default App;
