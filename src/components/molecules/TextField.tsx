import {StyleSheet, View, TextInput, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import Icon from '../atom/Icon/Icon';
import Typhography from '../atom/Typhography';
import COLORS from '@constant/colors';
import SPACING from '@constant/spacing';
import FONT_SIZE from '@constant/fontSize';
import {TextFieldProps} from '@utils/props';

export default function TextField({
  state = 'default',
  type = 'text',
  placeholder = 'Input',
  label = 'Label',
  message,
  visible = false,
  value,
  onChangeText = () => {},
  onSubmitEditing,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(visible);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const getContainerStyle = () => {
    if (isFocused) {
      return [styles.inputTextContainer, styles.focus];
    }
    switch (state) {
      case 'default':
        return [styles.inputTextContainer, styles.default];
      case 'positive':
        return [styles.inputTextContainer, styles.positive];
      case 'negative':
        return [styles.inputTextContainer, styles.negative];
      case 'disabled':
        return [styles.inputTextContainer, styles.disabled];
      default:
        return styles.inputTextContainer;
    }
  };
  return (
    <View>
      {type !== 'no-label' && (
        <Typhography
          type="heading"
          size="small"
          style={
            state === 'disabled' ? {color: COLORS.neutral400} : styles.label
          }>
          {label}
        </Typhography>
      )}

      <View style={getContainerStyle()}>
        <TextInput
          secureTextEntry={type === 'password' && !isPasswordVisible}
          placeholderTextColor={COLORS.neutral500}
          placeholder={placeholder}
          style={
            state === 'default'
              ? [styles.inputText, {color: COLORS.neutral500}]
              : styles.inputText
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={state !== 'disabled'}
          onChangeText={onChangeText}
          value={value}
          onSubmitEditing={onSubmitEditing}
        />
        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye-slash' : 'eye'}
              fill={COLORS.neutral500}
              width={16}
              height={16}
            />
          </TouchableOpacity>
        )}
      </View>
      {state === 'negative' && (
        <Typhography type="paragraph" size="small" style={styles.message}>
          {message}
        </Typhography>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  message: {
    color: COLORS.red500,
  },
  label: {
    paddingBottom: SPACING.sm,
  },
  inputText: {
    fontSize: FONT_SIZE.md,
    fontFamily: 'Inter-Regular',
    color: COLORS.neutral700,
    flex: 1,
  },
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: SPACING.sm,
    paddingHorizontal: SPACING.lg,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  default: {
    borderColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral200,
  },
  positive: {
    borderColor: COLORS.green500,
    backgroundColor: COLORS.green100,
  },
  negative: {
    borderColor: COLORS.red500,
    backgroundColor: COLORS.red100,
  },
  disabled: {
    borderColor: COLORS.neutral300,
    backgroundColor: COLORS.neutral200,
  },
  focus: {
    borderColor: COLORS.purple500,
    backgroundColor: COLORS.purple100,
  },
});
