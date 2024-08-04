import {Image, SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC, memo} from 'react';
import COLORS from '@constant/colors';
import SPACING from '@constant/spacing';
import {Button} from '@components/molecules';
import {storageServices} from '@services/index';
import {CommonActions, useNavigation} from '@react-navigation/native';
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
const Profile: FC = () => {
  const navigation = useNavigation();

  async function onAppBootstrap() {
    await messaging().registerDeviceForRemoteMessages();

    messaging().subscribeToTopic('DIGICAMP');
  }

  const handleNotification = async () => {
    // await notifee.requestPermission();

    const channelId = await notifee.createChannel({
      id: 'default-DIG',
      name: 'Default Channel DIGI',
      importance: AndroidImportance.HIGH,
    });

    await notifee.displayNotification({
      title: 'Title',
      subtitle: 'Subtitle',
      body: 'Main body content of the notification',
      android: {
        channelId,
        pressAction: {
          id: 'default',
        },
      },
      data: {
        type: 'OPEN_POST_DETAIL',
        postId: '7e55ef5f-05df-4428-be77-e68b36f6b63e',
      },
    });
  };

  const onCreateTriggerNotification = async () => {
    const date = new Date(Date.now());
    date.setSeconds(date.getSeconds() + 10);

    const trigger: TimestampTrigger = {
      type: TriggerType.TIMESTAMP,
      timestamp: date.getTime(),
    };

    await notifee.createTriggerNotification(
      {
        title: 'Meeting with Jane',
        body: 'Today at 11:20am',
        android: {
          channelId: 'default-DIG',
          pressAction: {
            id: 'default',
          },
        },
        data: {
          type: 'OPEN_POST_DETAIL',
          postId: '7e55ef5f-05df-4428-be77-e68b36f6b63e',
        },
      },
      trigger,
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.itemContainer}>
        <Image
          source={require('../../assets/img/invest.png')}
          style={styles.image}
        />
        <View style={{gap: 10}}>
          <Button
            size="medium"
            variant="primary"
            type="text-only"
            onPress={onAppBootstrap}>
            fcm
          </Button>
          <Button
            size="medium"
            variant="primary"
            type="text-only"
            onPress={handleNotification}>
            local
          </Button>
          <Button
            size="medium"
            variant="primary"
            type="text-only"
            onPress={onCreateTriggerNotification}>
            delay
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
