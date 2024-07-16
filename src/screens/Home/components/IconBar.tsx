import React, {FC} from 'react';
import {Icon, Typography} from '@components/atom';
import COLORS from '@constant/colors';
import {IconProps} from '@utils/props';
import {StyleSheet, View} from 'react-native';

export const HomeIcon: FC<IconProps> = ({focused}) => (
  <View style={styles.iconContainer}>
    <Icon name="home" fill={focused ? COLORS.purple600 : COLORS.neutral400} />
    <Typography
      type="heading"
      size="xsmall"
      style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
      Home
    </Typography>
  </View>
);

export const ProfileIcon: FC<IconProps> = ({focused}) => (
  <View style={styles.iconContainer}>
    <Icon name="user" fill={focused ? COLORS.purple600 : COLORS.neutral400} />
    <Typography
      type="heading"
      size="xsmall"
      style={{color: focused ? COLORS.purple600 : COLORS.neutral400}}>
      Profil
    </Typography>
  </View>
);

const styles = StyleSheet.create({
  iconContainer: {alignItems: 'center', justifyContent: 'center'},
});
