/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, View} from 'react-native';
import Typhography from './src/components/atom/Typhography';

function App(): React.JSX.Element {
  return (
    <SafeAreaView>
      <View style={{padding: 16}}>
        <Typhography type="heading" size="xxlarge">
          Heading
        </Typhography>
        <Typhography type="heading" size="xlarge">
          Heading
        </Typhography>
        <Typhography type="heading" size="large">
          Heading
        </Typhography>
        <Typhography type="paragraph" size="large">
          Heading
        </Typhography>
      </View>
    </SafeAreaView>
  );
}

export default App;
