/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Icon from './src/components/atom/Icon/Icon';
import colors from './src/constant/colors';
import TextField from './src/components/molecules/TextField';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={{padding: 16}}>
        <Icon
          name="angle-double-left"
          fill={colors.blue600}
          width={40}
          height={50}
        />

        <TextField label="Test" placeholder="place" state="positive" />
        <TextField
          label="Test"
          placeholder="place"
          state="negative"
          message="kocak"
        />
        <TextField label="Password" placeholder="place" type="password" />
        <TextField label="Test" placeholder="place" state="disabled" />
      </View>
    </SafeAreaView>
  );
}
export default App;
