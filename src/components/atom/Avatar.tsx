import {StyleSheet, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native';
type AvatarProps = {
  size: 'xxlarge' | 'xlarge' | 'large' | 'medium' | 'small' | 'xsmall';
  image?: string;
};

export default function Avatar({size, image}: AvatarProps) {
  const styleSize = styles[size];

  const defaultImage = require('../../../assets/img/avitir.png');
  const imageSource = image
    ? typeof image === 'string'
      ? {uri: image}
      : image
    : defaultImage;

  return (
    <View>
      <Image source={imageSource} style={[styleSize, styles.avatar]} />
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
