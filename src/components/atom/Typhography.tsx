import fontSize from '@constant/fontSize';
import spacing from '@constant/spacing';
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
    fontSize: FONT_SIZE.xxxl,
    fontWeight: 'bold',
    lineHeight: SPACING.xl5,
    fontFamily: 'Inter-Bold',
  },
  headingXlarge: {
    fontSize: FONT_SIZE.xxl,
    fontWeight: 'bold',
    lineHeight: SPACING.xl4,
    fontFamily: 'Inter-Bold',
  },
  headingLarge: {
    fontSize: FONT_SIZE.xl,
    fontWeight: 'bold',
    lineHeight: SPACING.xxxl,
    fontFamily: 'Inter-Bold',
  },
  headingMedium: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'bold',
    lineHeight: SPACING.xxl,
    fontFamily: 'Inter-Bold',
  },
  headingSmall: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'bold',
    lineHeight: SPACING.xl,
    fontFamily: 'Inter-Bold',
  },
  headingXsmall: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'bold',
    lineHeight: SPACING.xl,
    fontFamily: 'Inter-Bold',
  },
  headingXxsmall: {
    fontSize: FONT_SIZE.xs,
    fontWeight: 'bold',
    lineHeight: SPACING.lg,
    fontFamily: 'Inter-Bold',
  },
  paragraphLarge: {
    fontSize: FONT_SIZE.lg,
    fontWeight: 'normal',
    lineHeight: SPACING.xxl,
    fontFamily: 'Inter-Regular',
  },
  paragraphMedium: {
    fontSize: FONT_SIZE.md,
    fontWeight: 'normal',
    lineHeight: SPACING.xl,
    fontFamily: 'Inter-Regular',
  },
  paragraphSmall: {
    fontSize: FONT_SIZE.sm,
    fontWeight: 'normal',
    lineHeight: SPACING.xl,
    fontFamily: 'Inter-Regular',
  },
  paragraphXsmall: {
    fontSize: FONT_SIZE.xs,
    fontWeight: 'normal',
    lineHeight: SPACING.lg,
    fontFamily: 'Inter-Regular',
  },
  specialLarge: {
    fontSize: FONT_SIZE.lg,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: SPACING.xxl,
  },
  specialMedium: {
    fontSize: FONT_SIZE.md,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: SPACING.xl,
  },
  specialSmall: {
    fontSize: FONT_SIZE.sm,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: SPACING.xl,
  },
  specialXsmall: {
    fontSize: FONT_SIZE.xs,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: SPACING.lg,
  },
  specialXxsmall: {
    fontSize: FONT_SIZE.xxs,
    fontStyle: 'italic',
    fontFamily: 'Inter-Regular',
    lineHeight: SPACING.md,
  },
});
