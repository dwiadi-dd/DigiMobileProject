import {StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import Trending from './trending/Trending';
import News from './news/News';
import {TextField} from '@components/molecules';
import HomeTopBar from '@components/molecules/HomeTopBar';
import COLORS from '@constant/colors';
import {Icon, Typography} from '@components/atom';
import {generateDummyPosts} from '@utils/helper';

import Profile from '@screens/Profile';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import useAuth from '@utils/hooks/useAuth';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {AuthContext} from '@contexts/AuthContext';
import Avatar from '@components/atom/Avatar';

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
export default function Home() {
  const {isAuthenticated} = useContext(AuthContext);
  const navigation = useNavigation<NavigationProp<any>>();
  const userAvatar = isAuthenticated
    ? 'https://lwfiles.mycourse.app/656ef73b8e59fa6dfcddbe98-public/3073ed5d42a0e38174e311a1a0cb0800.png'
    : '../../../assets/images/avatar.png';
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(generateDummyPosts());
  }, []);

  const handleCreate = useAuth(() => {
    navigation.navigate('Create Post');
  });

  return (
    <View style={styles.flex}>
      <View style={styles.homeHeaderContainer}>
        <View style={styles.postSection}>
          <Avatar image={userAvatar} size="large" />
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
        }}>
        <TopTab.Screen
          name="Trending"
          children={() => (
            <Trending
              data={data?.sort((a, b) => b.post_upvote - a.post_upvote)}
            />
          )}
        />
        <TopTab.Screen
          name="News"
          children={() => (
            <News
              data={data?.sort(
                (a, b) =>
                  (new Date(b.created_at) as any) -
                  (new Date(a.created_at) as any),
              )}
            />
          )}
        />
      </TopTab.Navigator>
    </View>
  );
}

export const HomeTab = () => {
  return (
    <BottomTab.Navigator screenOptions={{tabBarShowLabel: false}}>
      <BottomTab.Screen
        name="Home"
        component={Home}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="home"
                fill={focused ? COLORS.purple600 : COLORS.neutral400}
              />
              <Typography
                type="heading"
                size="xsmall"
                style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
                Home
              </Typography>
            </View>
          ),
          header: HomeTopBar,
        }}
      />
      <BottomTab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={{alignItems: 'center', justifyContent: 'center'}}>
              <Icon
                name="user"
                fill={focused ? COLORS.purple600 : COLORS.neutral700}
              />
              <Typography
                type="heading"
                size="xsmall"
                style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
                Profil
              </Typography>
            </View>
          ),
          headerShown: false,
        }}
      />
    </BottomTab.Navigator>
  );
};

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
});
