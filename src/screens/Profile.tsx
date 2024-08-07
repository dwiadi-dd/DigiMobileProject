import {SafeAreaView, StyleSheet, View} from 'react-native';
import React, {FC, memo, useCallback} from 'react';
import COLORS from '@constant/colors';
import SPACING from '@constant/spacing';
import {Button, UserCard} from '@components/molecules';
import {investlyServices, storageServices} from '@services/index';
import {CommonActions, useNavigation} from '@react-navigation/native';
import notifee, {
  AndroidImportance,
  TimestampTrigger,
  TriggerType,
} from '@notifee/react-native';
import messaging from '@react-native-firebase/messaging';
import analytics from '@react-native-firebase/analytics';
import {useProfileStore} from '@stores/userStore';

const Profile: FC = () => {
  const {profileData} = useProfileStore();
  const navigation = useNavigation();

  async function onAppBootstrap() {
    await messaging().registerDeviceForRemoteMessages();

    messaging().subscribeToTopic('DIGICAMP');
  }

  const handleNotification = async () => {
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

  const onLogout = useCallback(async () => {
    const res = await investlyServices.logout();
    if (res?.status === 200 && res.data?.data) {
      analytics().logEvent('click_logout', {
        username: profileData?.username,
      });
      storageServices.clearLoginData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'OnBoarding', params: {isLogin: false}}],
        }),
      );
    } else {
      storageServices.clearLoginData();
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{name: 'OnBoarding', params: {isLogin: false}}],
        }),
      );
    }
  }, [navigation, profileData]);

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
      <View style={styles.simpleCard}>
        <UserCard
          profileImage={profileData?.profile_path || ''}
          username={profileData?.username || 'Username'}
          name={profileData?.name || 'Name'}
          email={profileData?.email || 'Email'}
        />
        <View style={styles.itemContainer}>
          <Button
            size="medium"
            variant="primary"
            type="text-only"
            onPress={onLogout}>
            Logout
          </Button>
        </View>
      </View>
      <View style={styles.itemContainer}>
        <View style={styles.profileContainer}>
          <Button
            size="medium"
            variant="primary"
            type="text-only"
            onPress={onAppBootstrap}>
            Notification FCM
          </Button>
          <Button
            size="medium"
            variant="primary"
            type="text-only"
            onPress={handleNotification}>
            Notification Local
          </Button>
          <Button
            size="medium"
            variant="primary"
            type="text-only"
            onPress={onCreateTriggerNotification}>
            Notification Delay
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};
export default memo(Profile);

const styles = StyleSheet.create({
  simpleCard: {
    backgroundColor: COLORS.neutral100,
    borderRadius: 16,
    borderColor: COLORS.neutral300,
    borderWidth: 1,
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  container: {
    flex: 1,
    paddingHorizontal: SPACING.xl,
    paddingVertical: SPACING.xxl,
    justifyContent: 'center',
    backgroundColor: COLORS.neutral100,
  },
  flex: {flex: 1},
  itemContainer: {
    padding: SPACING.lg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 240,
    height: 240,
    resizeMode: 'contain',
  },
  profileContainer: {gap: 10},
});
