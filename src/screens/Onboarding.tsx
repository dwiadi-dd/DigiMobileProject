import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Button} from '@components/molecules';

export default function Onboarding({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Onboarding</Text>
      <View style={styles.flex} />
      <Button
        onPress={() => {
          navigation.navigate('Login', {
            name: 'adi',
          });
        }}>
        Get Started
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 44,
  },
  flex: {flex: 1},
});
