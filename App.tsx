/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {SafeAreaView, TextInput, View} from 'react-native';
import Typhography from './src/components/atom/Typhography';
import Icon from './src/components/atom/Icon/Icon';
import colors from './src/constant/colors';

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
          Paragraph
        </Typhography>
        <Typhography type="special" size="large">
          speacial Large
        </Typhography>
        <Typhography type="special" size="medium">
          speacial Large
        </Typhography>
        <Icon
          name="angle-double-left"
          fill={colors.blue600}
          width={40}
          height={50}
        />
        <TextInput placeholder="Input" style={{borderWidth: 1}} />
      </View>
    </SafeAreaView>
  );
}

export default App;
