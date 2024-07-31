import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC, memo} from 'react';
import COLORS from '@constant/colors';
import SPACING from '@constant/spacing';
import {Button} from '@components/molecules';
import {storageServices} from '@services/index';
import {CommonActions, useNavigation} from '@react-navigation/native';

const Profile: FC = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={require('../../assets/img/invest.png')}
          style={styles.image}
        />
        <Button
          size="medium"
          variant="primary"
          type="text-only"
          onPress={() => {
            storageServices.logout();
            navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [{name: 'OnBoarding', params: {isLogin: false}}],
              }),
            );
          }}>
          Logout
        </Button>
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
