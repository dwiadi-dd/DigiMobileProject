import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {FC} from 'react';
import COLORS from '@constant/colors';
import {Icon} from '@components/atom';

const HomeTopBar: FC = () => {
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
};
export default HomeTopBar;

const styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.neutral100,
    paddingHorizontal: 24,
    paddingVertical: 20,
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageSise: {
    width: 100,
    height: 30,
  },
});
