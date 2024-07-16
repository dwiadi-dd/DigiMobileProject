import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {TextField} from '@components/molecules';
import COLORS from '@constant/colors';
import {Icon, Typography} from '@components/atom';

import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';
import Avatar from '@components/atom/Avatar';
import {usePosts} from '@contexts/PostContext';
import LoginAlert from '@components/organism/LoginAlert';
import useAuth from '@hooks/useAuth';
import Trending from './components/Trending';

const TopTab = createMaterialTopTabNavigator();

const Home = () => {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();
  const userAvatar = isAuthenticated
    ? 'https://lwfiles.mycourse.app/656ef73b8e59fa6dfcddbe98-public/3073ed5d42a0e38174e311a1a0cb0800.png'
    : undefined;

  const {posts} = usePosts();

  const handleCreate = useAuth(() => {
    navigation.navigate('Create Post');
  });

  return (
    <View style={styles.flex}>
      <View style={styles.homeHeaderContainer}>
        <View style={styles.postSection}>
          {isAuthenticated ? (
            <Avatar image={userAvatar} size="large" />
          ) : (
            <Avatar size="large" />
          )}
          <View style={styles.postField}>
            <TextField placeholder="What`s on your mind?" type="no-label" />
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
            <Typography size="xsmall" type="heading">
              Pertanyaan
            </Typography>
          </TouchableOpacity>
          <View style={styles.divider} />
          <TouchableOpacity onPress={handleCreate} style={styles.headButton}>
            <Icon name="plus" fill={COLORS.green500} width={16} height={16} />
            <Typography size="xsmall" type="heading">
              Post
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
      <TopTab.Navigator
        screenOptions={{
          tabBarStyle: {backgroundColor: 'white'},
          tabBarIndicatorStyle: {backgroundColor: COLORS.purple600, height: 4},
          tabBarLabelStyle: {fontSize: 14, fontWeight: 'bold'},
          tabBarActiveTintColor: COLORS.purple600,
          tabBarInactiveTintColor: COLORS.neutral700,
        }}>
        <TopTab.Screen
          name="Trending"
          children={() => (
            <Trending
              data={posts?.sort((a, b) => b.post_upvote - a.post_upvote)}
            />
          )}
        />
        <TopTab.Screen
          name="News"
          children={() => (
            <Trending
              data={posts?.sort(
                (a, b) =>
                  (new Date(b.created_at) as any) -
                  (new Date(a.created_at) as any),
              )}
            />
          )}
        />
      </TopTab.Navigator>
      {!isAuthenticated && <LoginAlert />}
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
    borderWidth: 1,
    marginVertical: 14,
    marginHorizontal: 14,
  },
  postSection: {
    flexDirection: 'row',
    width: 'auto',
    paddingVertical: 13,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
  },
  postField: {flex: 2, width: 'auto'},
  buttonSection: {
    flexDirection: 'row',
    width: 'auto',
    paddingVertical: 13,
    paddingHorizontal: 24,
    alignItems: 'center',
    gap: 12,
    marginLeft: 10,
    justifyContent: 'space-between',
  },
  headButton: {
    flex: 2,
    width: 'auto',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 4,
  },
  divider: {
    height: 20,
    width: 1,
    backgroundColor: '#ddd',
  },
});
