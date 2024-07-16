import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC, memo} from 'react';
import {Typography} from '@components/atom';
import COLORS from '@constant/colors';
import SPACING from '@constant/spacing';

const Profile: FC = () => {
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
};
export default memo(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
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
