import {Image, StyleSheet, TouchableOpacity, View} from 'react-native';
import React, {useEffect, useState} from 'react';
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

const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();
export default function Home() {
  const [data, setData] = useState<any[]>([]);
  useEffect(() => {
    setData(generateDummyPosts());
  }, []);
  return (
    <View style={styles.flex}>
      <View
        style={{
          backgroundColor: COLORS.neutral100,
          borderRadius: 16,
          borderColor: COLORS.neutral300,
          borderWidth: 1,
          marginVertical: 14,
          marginHorizontal: 14,
        }}>
        <View
          style={{
            flexDirection: 'row',
            width: 'auto',
            paddingVertical: 13,
            paddingHorizontal: 24,
            alignItems: 'center',
            gap: 12,
          }}>
          <Image
            source={require('../../../assets/img/Avatar.png')}
            style={{width: 40, height: 40}}
          />
          <View style={{flex: 2, width: 'auto'}}>
            <TextField placeholder="What`s on your mind?" type="no-label" />
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            width: 'auto',
            paddingVertical: 13,
            paddingHorizontal: 24,
            alignItems: 'center',
            gap: 12,
            marginLeft: 10,
            justifyContent: 'space-between',
          }}>
          <TouchableOpacity
            style={{
              flex: 2,
              width: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',

              gap: 4,
            }}>
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
          <TouchableOpacity
            style={{
              flex: 2,
              width: 'auto',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}>
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
});
