import React from 'react';
import {StyleProp, StyleSheet, Text, TextStyle, View} from 'react-native';

type TyphographyProps = {
  type: 'heading' | 'paragraph' | 'special';
  size:
    | 'xxlarge'
    | 'xlarge'
    | 'large'
    | 'medium'
    | 'small'
    | 'xsmall'
    | 'xxsmall';
  color?: TextStyle;
  style?: StyleProp<TextStyle>;
  children: React.ReactNode;
};

type StyleMap = {
  [key in TyphographyProps['type']]: {
    [key in TyphographyProps['size']]?: object;
  };
};

export default function Typhography({
  size,
  type,
  color,
  style,
  children,
}: TyphographyProps) {
  const styleMap: StyleMap = {
    heading: {
      xxlarge: styles.headingXXlarge,
      xlarge: styles.headingXlarge,
      large: styles.headingLarge,
      medium: styles.headingMedium,
      small: styles.headingSmall,
      xsmall: styles.headingXsmall,
      xxsmall: styles.headingXxsmall,
    },
    paragraph: {
      large: styles.paragraphLarge,
      medium: styles.paragraphMedium,
      small: styles.paragraphSmall,
      xsmall: styles.paragraphXsmall,
    },
    special: {
      large: styles.specialLarge,
      medium: styles.specialMedium,
      small: styles.specialSmall,
      xsmall: styles.specialXsmall,
      xxsmall: styles.specialXxsmall,
    },
  };
  const textStyle = [styleMap[type]?.[size], color, style];

  return (
    <View>
      <Text style={textStyle}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  headingXXlarge: {
    fontSize: 28,
    fontWeight: 'bold',
    lineHeight: 36,
    fontFamily: 'Inter-Bold',
  },
  headingXlarge: {
    fontSize: 24,
    fontWeight: 'bold',
    lineHeight: 32,
    fontFamily: 'Inter-Bold',
  },
  headingLarge: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 28,
    fontFamily: 'Inter-Bold',
  },
  headingMedium: {
    fontSize: 16,
    fontWeight: 'bold',
    lineHeight: 24,
    fontFamily: 'Inter-Bold',
  },
  headingSmall: {
    fontSize: 14,
    fontWeight: 'bold',
    lineHeight: 22,
    fontFamily: 'Inter-Bold',
  },
  headingXsmall: {
    fontSize: 12,
    fontWeight: 'bold',
    lineHeight: 20,
    fontFamily: 'Inter-Bold',
  },
  headingXxsmall: {
    fontSize: 10,
    fontWeight: 'bold',
    lineHeight: 18,
    fontFamily: 'Inter-Bold',
  },
  paragraphLarge: {
    fontSize: 16,
    fontWeight: 'normal',
    lineHeight: 24,
    fontFamily: 'Inter-Regular',
  },
  paragraphMedium: {
    fontSize: 14,
    fontWeight: 'normal',
    lineHeight: 22,
    fontFamily: 'Inter-Regular',
  },
  paragraphSmall: {
    fontSize: 12,
    fontWeight: 'normal',
    lineHeight: 20,
    fontFamily: 'Inter-Regular',
  },
  paragraphXsmall: {
    fontSize: 10,
    fontWeight: 'normal',
    lineHeight: 18,
    fontFamily: 'Inter-Regular',
  },
  specialLarge: {
    fontSize: 16,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: 24,
  },
  specialMedium: {
    fontSize: 14,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: 22,
  },
  specialSmall: {
    fontSize: 12,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: 20,
  },
  specialXsmall: {
    fontSize: 10,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: 18,
  },
  specialXxsmall: {
    fontSize: 8,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: 12,
  },
});
