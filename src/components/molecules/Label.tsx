import {StyleSheet, View} from 'react-native';
import React, {FC, ReactNode} from 'react';
import COLORS from '@constant/colors';
import {Typography} from '@components/atom';

type LabelProps = {
  variant: 'primary' | 'outline' | 'tertiary';
  color: 'red' | 'blue' | 'purple' | 'green' | 'grey';
  children: ReactNode;
};

const Label: FC<LabelProps> = ({variant, color, children}) => {
  const getStyle = () => {
    switch (variant) {
      case 'primary':
        return [styles.base, styles.primary, styles[color]];
      case 'outline':
        return [styles.base, styles.outline, styles[`outline_${color}`]];
      case 'tertiary':
        return [styles.base, styles.tertiary, styles[`tertiary_${color}`]];
      default:
        return [styles.base];
    }
  };
  const textColor = variant !== 'primary' ? styles[`text_${color}`] : {};
  return (
    <View style={getStyle()}>
      <Typography type="heading" size="xsmall" color={textColor}>
        {children}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  base: {
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 16,
    margin: 4,
    justifyContent: 'center',
    alignSelf: 'baseline',
  },
  primary: {
    backgroundColor: COLORS.neutral100,
  },
  outline: {
    backgroundColor: COLORS.neutral100,
    borderWidth: 2,
  },
  tertiary: {
    backgroundColor: COLORS.neutral200,
  },
  blue: {
    backgroundColor: COLORS.blue700,
  },
  outline_blue: {
    borderColor: COLORS.blue700,
  },
  tertiary_blue: {
    backgroundColor: COLORS.blue200,
  },
  red: {
    backgroundColor: COLORS.red600,
  },
  outline_red: {
    borderColor: COLORS.red600,
  },
  tertiary_red: {
    backgroundColor: COLORS.red300,
  },
  purple: {
    backgroundColor: COLORS.neutral100,
  },
  outline_purple: {
    borderColor: COLORS.neutral100,
  },
  tertiary_purple: {
    backgroundColor: COLORS.purple200,
  },
  green: {
    backgroundColor: COLORS.green600,
  },
  outline_green: {
    borderColor: COLORS.green600,
  },
  tertiary_green: {
    backgroundColor: COLORS.green200,
  },
  grey: {
    backgroundColor: COLORS.neutral500,
  },
  outline_grey: {
    borderColor: COLORS.neutral500,
  },
  tertiary_grey: {
    backgroundColor: COLORS.neutral100,
  },
  text_blue: {
    color: COLORS.blue400,
  },
  text_red: {
    color: COLORS.red600,
  },
  text_purple: {
    color: COLORS.purple600,
  },
  text_green: {
    color: COLORS.green600,
  },
  text_grey: {
    color: COLORS.neutral500,
  },
});

export default Label;
