import {SafeAreaView, StyleSheet} from 'react-native';
import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Trending from './trending/Trending';
import News from './news/News';
import {Button} from '@components/molecules';

const Tab = createMaterialTopTabNavigator();
export default function Home({navigation}) {
  return (
    <SafeAreaView style={styles.flex}>
      <Tab.Navigator>
        <Tab.Screen name="Trending" component={Trending} />
        <Tab.Screen name="News" component={News} />
      </Tab.Navigator>
      <Button
        onPress={() => {
          navigation.goBack();
        }}>
        Go Back To Login
      </Button>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: {flex: 1},
});
