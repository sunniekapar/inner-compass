import { View, Text, TextInputProps, TextInput } from 'react-native'
import React from 'react'
import { twMerge } from 'tailwind-merge'
import { COLORS } from '../constants'

interface StyledTextInputProps extends TextInputProps {}
export default function StyledTextInput({...props} : StyledTextInputProps) {
  return (
    <TextInput placeholderTextColor={COLORS.neutral_400} {...props} style={{fontFamily: 'QuicksandSemiBold'}} className={twMerge("w-full p-3 mt-1 border rounded-xl border-neutral-400 focus:border-blue-600 focus:border-2", props.className) }/>
  )
}