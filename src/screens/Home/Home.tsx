import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {LoginAlert, TextField} from '@components/molecules';
import COLORS from '@constant/colors';
import {Icon, Typography} from '@components/atom';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import Avatar from '@components/atom/Avatar';
import Feed from './components/Feed';
import useAuth from '@hooks/useAuth';
import SPACING from '@constant/spacing';
import storageServices from '@services/storageServices';

const TopTab = createMaterialTopTabNavigator();

const Home = () => {
  const isLoggedIn = storageServices.getLoginData().isLoggedIn;
  const navigation = useNavigation<NavigationProp<any>>();
  const userAvatar = isLoggedIn
    ? 'https://lwfiles.mycourse.app/656ef73b8e59fa6dfcddbe98-public/3073ed5d42a0e38174e311a1a0cb0800.png'
    : undefined;

  const handleCreate = useAuth(() => {
    navigation.navigate('Create Post');
  });
  return (
    <View style={styles.flex}>
      <View style={styles.homeHeaderContainer}>
        <View style={styles.postSection}>
          {isLoggedIn ? (
            <Avatar image={userAvatar} size="large" />
          ) : (
            <Avatar size="large" />
          )}
          <View style={styles.postField}>
            <TextField
              placeholder="Apa yang ingin kamu tanyakan?"
              type="no-label"
              isProtected={true}
            />
          </View>
        </View>
        <View style={styles.buttonSection}>
          <TouchableOpacity style={styles.headButton} onPress={handleCreate}>
            <Icon
              name="question-mark"
              fill={COLORS.yellow500}
              width={16}
              height={16}
            />
            <Typography size="small" type="heading">
              Pertanyaan
            </Typography>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={handleCreate} style={styles.headButton}>
            <Icon name="plus" fill={COLORS.green500} width={16} height={16} />
            <Typography size="small" type="heading">
              Post
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: 'white'},
          tabBarIndicatorStyle: {
            backgroundColor: COLORS.purple600,
            height: 2,
          },
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarActiveTintColor: COLORS.purple600,
          tabBarInactiveTintColor: COLORS.neutral700,
        }}>
        <TopTab.Screen
          name="Trending"
          children={() => <Feed sortBy="engagement" />}
        />
        <TopTab.Screen
          name="News"
          children={() => <Feed sortBy="created_at" />}
        />
      </TopTab.Navigator>
      {!isLoggedIn && <LoginAlert />}
    </View>
  );
};
export default Home;

const styles = StyleSheet.create({
  flex: {flex: 1},
  homeHeaderContainer: {
    backgroundColor: COLORS.neutral100,
    borderRadius: 16,
    borderColor: COLORS.neutral300,
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    gap: SPACING.md,
    borderWidth: 1,
    marginVertical: 14,
    marginHorizontal: 10,
  },
  postSection: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    gap: 8,
  },
  postField: {flex: 2, width: 'auto'},
  buttonSection: {
    flexDirection: 'row',
    width: 'auto',
    alignItems: 'center',
    gap: 12,
    justifyContent: 'space-between',
  },
  headButton: {
    flex: 2,
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  divider: {
    height: 24,
    width: 1,
    backgroundColor: COLORS.neutral300,
  },
});
