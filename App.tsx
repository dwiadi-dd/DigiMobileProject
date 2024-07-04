/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {Alert, SafeAreaView, TextInput, View} from 'react-native';
import Typhography from './src/components/atom/Typhography';
import Icon from './src/components/atom/Icon/Icon';
import colors from './src/constant/colors';
import Button from './src/components/molecules/Button';

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
        <Button
          size="large"
          type="text-only"
          variant="primary"
          disabled={false}>
          test button
        </Button>
        <Button size="small" type="text-only" variant="primary" disabled>
          test button
        </Button>
        <Button
          size="large"
          type="text-only"
          variant="primary"
          disabled={false}>
          test button
        </Button>
        <Button size="large" type="text-only" variant="primary" disabled>
          test button
        </Button>
        <Button
          size="large"
          type="text-only"
          variant="outline"
          disabled={false}>
          test button
        </Button>
        <Button
          size="small"
          type="icon-right"
          variant="link"
          disabled={false}
          iconName="angle-double-left">
          test button
        </Button>
        <Button
          size="large"
          type="icon-left"
          variant="link"
          disabled={false}
          onPress={() => Alert.alert('Button Pressed')}
          iconName="angle-double-left">
          test button
        </Button>
      </View>
    </SafeAreaView>
  );
}

export default App;
