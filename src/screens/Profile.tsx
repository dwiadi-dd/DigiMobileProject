import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React from 'react';
import {Typography} from '@components/atom';
import COLORS from '@constant/colors';

export default function Profile() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={require('../../assets/img/invest.png')}
          style={styles.image}
        />
        <Typography type="heading" size="xlarge">
          Coming Soon
        </Typography>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 22,
    justifyContent: 'center',
    backgroundColor: COLORS.neutral100,
  },
  flex: {flex: 1},
  itemContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
});
