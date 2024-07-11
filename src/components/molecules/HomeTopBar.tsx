import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React from 'react';
import COLORS from '@constant/colors';
import {Icon} from '@components/atom';

export default function HomeTopBar() {
  return (
    <View style={styles.container}>
      <Image
        source={require('../../../assets/img/investly_logo.png')}
        style={styles.imageSise}
      />
      <TouchableOpacity>
        <Icon name="bell" fill={COLORS.purple600} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral100,
    paddingHorizontal: 24,
    paddingVertical: 12,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageSise: {
    width: 84,
    height: 24,
  },
});
