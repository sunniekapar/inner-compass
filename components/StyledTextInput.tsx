import { View, Text, TextInputProps, TextInput } from 'react-native';
import React from 'react';
import { twMerge } from 'tailwind-merge';
import { COLORS } from '../constants';
import StyledText from './StyledText';

interface StyledTextInputProps extends TextInputProps {
  label?: string;
  description?: string;
}
export default function StyledTextInput({
  label,
  description,
  ...props
}: StyledTextInputProps) {
  return (
    <View className='w-full mb-2'>
      {label ? (
        <StyledText weight="bold" className="mb-2 text-xl">
          {label}
        </StyledText>
      ) : null}
      <TextInput
        placeholderTextColor={COLORS.neutral_400}
        {...props}
        style={{ fontFamily: 'QuicksandSemiBold' }}
        className={twMerge(
          'w-full p-3 border rounded-xl border-neutral-400 focus:border-blue-600 focus:border-2',
          props.className
        )}
      />
      {description ? (
        <StyledText weight="base" className="mt-1 text-neutral-500">
          {description}
        </StyledText>
      ) : null}
    </View>
  );
}
