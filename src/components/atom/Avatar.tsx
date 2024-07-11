import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';

type AvatarProps = {
  size: 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
  image?: string;
};
export default function Avatar({
  size,
  image = '../../../assets/img/Avatar.png',
}: AvatarProps) {
  const styleSize = styles[size];
  return (
    <View>
      <Image source={{uri: image}} style={[styleSize, styles.avatar]} />
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {borderRadius: 80},
  xxlarge: {
    width: 64,
    height: 64,
  },
  xlarge: {
    width: 52,
    height: 52,
  },
  large: {
    width: 40,
    height: 40,
  },
  medium: {
    width: 32,
    height: 32,
  },
  small: {
    width: 24,
    height: 24,
  },
  xsmall: {
    width: 16,
    height: 16,
  },
});
