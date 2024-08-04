import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC, memo} from 'react';
import COLORS from '@constant/colors';
import SPACING from '@constant/spacing';
import {Button} from '@components/molecules';
import {storageServices} from '@services/index';
import {CommonActions, useNavigation} from '@react-navigation/native';
import notifee, {AndroidImportance} from '@notifee/react-native';
const Profile: FC = () => {
  const navigation = useNavigation();
  async function onDisplayNotification() {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default-DIG',
      name: 'Default Channel DIGI',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Notification Title',
      subtitle: 'Subtitle of the notification',
      body: 'Main body content of the notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
    });
  }
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
          onPress={onDisplayNotification}>
          NOTIF
        </Button>
        <Button
          size="medium"
          variant="primary"
          type="text-only"
          onPress={() => {
            storageServices.clearLoginData();
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
