import {StyleSheet, TouchableOpacity} from 'react-native';
import React from 'react';
import Typhography from '../atom/Typhography';
import colors from '../../constant/colors';
import Icon, {IconName} from '../atom/Icon/Icon';

type ButtonProps = {
  size: 'small' | 'medium' | 'large';
  type: 'text-only' | 'icon-left' | 'icon-right' | 'icon-only';
  variant: 'primary' | 'outline' | 'tertiary' | 'link';
  disabled: boolean;
  children: React.ReactNode;
  iconName?: IconName;
  onPress?: () => void;
};

const getButtonStyles = (variant: string, disabled: boolean) => {
  const color = disabled ? colors.neutral400 : colors.purple600;
  const baseStyles = {
    borderWidth: 1,
    borderColor: 'transparent',
    borderRadius: 32,
    textColor: '#fff',
    alignItems: 'center' as 'center',
    justifyContent: 'center' as 'center',
    flexDirection: 'row' as 'row',
  };

  switch (variant) {
    case 'primary':
      return {
        ...baseStyles,
        backgroundColor: color,
        borderColor: 'transparent',
        textColor: '#FFFFFF',
      };
    case 'outline':
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        borderColor: color,
        textColor: color,
      };
    case 'tertiary':
      return {
        ...baseStyles,
        backgroundColor: disabled ? colors.neutral400 : colors.purple100,
        borderColor: 'transparent',
        textColor: color,
      };
    case 'link':
      return {
        ...baseStyles,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        textColor: color,
      };
    default:
      return baseStyles;
  }
};

export default function Button({
  disabled = false,
  size = 'medium',
  type = 'text-only',
  variant = 'primary',
  iconName,
  children,
  onPress,
}: ButtonProps) {
  const sizeStyle = styles[size];
  const variantStyle = getButtonStyles(variant, disabled);
  const {textColor, ...buttonStyle} = variantStyle;
  const combinedStyle = [sizeStyle, buttonStyle, disabled && styles.disabled];
  const iconSize = iconSizes[size];
  return (
    <TouchableOpacity
      style={combinedStyle}
      disabled={disabled}
      onPress={onPress}>
      {type === 'icon-left' && !!iconName && (
        <Icon
          name={iconName}
          fill={disabled ? colors.neutral700 : textColor}
          width={iconSize}
          height={iconSize}
        />
      )}
      <Typhography
        type="heading"
        size={size}
        color={{color: disabled ? colors.neutral700 : textColor}}
        style={{paddingHorizontal: 8}}>
        {children}
      </Typhography>
      {type === 'icon-right' && !!iconName && (
        <Icon
          name={iconName}
          fill={disabled ? colors.neutral700 : textColor}
          width={iconSize}
          height={iconSize}
        />
      )}
    </TouchableOpacity>
  );
}
const iconSizes = {
  small: 12,
  medium: 16,
  large: 20,
};

const styles = StyleSheet.create({
  small: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  medium: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  large: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 4,
  },
  disabled: {
    opacity: 0.6,
  },
});
