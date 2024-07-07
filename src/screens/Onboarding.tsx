import {Text, View} from 'react-native';
import React from 'react';
import Button from '../components/molecules/Button';

export default function Onboarding({navigation}) {
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 20,
        paddingVertical: 44,
      }}>
      <Text>Onboarding</Text>
      <View style={{flex: 1}} />
      <Button
        onPress={() => {
          navigation.navigate('Login');
        }}>
        Get Started
      </Button>
    </View>
  );
}
