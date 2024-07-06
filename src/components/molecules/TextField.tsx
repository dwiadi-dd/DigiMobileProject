import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import Icon from '../atom/Icon/Icon';
import colors from '../../constant/colors';
import Typhography from '../atom/Typhography';

type TextFieldProps = {
  state?: 'default' | 'positive' | 'negative' | 'disabled';
  type?: 'text' | 'password' | 'email' | 'number';
  visible?: boolean;
  label?: string;
  placeholder?: string;
  message?: string;
};

export default function TextField({
  state = 'default',
  type = 'text',
  placeholder = 'Input',
  label = 'Label',
  message,
  visible = false,
}: TextFieldProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(visible);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  const getContainerStyle = () => {
    if (isFocused) return [styles.inputTextContainer, styles.focus];
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
      <Typhography
        type="heading"
        size="small"
        style={
          state === 'disabled' ? {color: colors.neutral400} : styles.label
        }>
        {label}
      </Typhography>
      <View style={getContainerStyle()}>
        <TextInput
          secureTextEntry={type === 'password' && !isPasswordVisible}
          placeholderTextColor={colors.neutral500}
          placeholder={placeholder}
          style={
            state === 'default'
              ? [styles.inputText, {color: colors.neutral500}]
              : styles.inputText
          }
          onFocus={handleFocus}
          onBlur={handleBlur}
          editable={state !== 'disabled'}
        />
        {type === 'password' && (
          <TouchableOpacity
            onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
            <Icon
              name={isPasswordVisible ? 'eye-slash' : 'eye'}
              fill={colors.neutral500}
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
    color: colors.red500,
  },
  label: {
    paddingBottom: 8,
  },
  inputText: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: colors.neutral700,
  },
  inputTextContainer: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  default: {
    borderColor: colors.neutral300,
    backgroundColor: colors.neutral200,
  },
  positive: {
    borderColor: colors.green500,
    backgroundColor: colors.green100,
  },
  negative: {
    borderColor: colors.red500,
    backgroundColor: colors.red100,
  },
  disabled: {
    borderColor: colors.neutral300,
    backgroundColor: colors.neutral200,
  },
  focus: {
    borderColor: colors.purple500,
    backgroundColor: colors.purple100,
  },
});
