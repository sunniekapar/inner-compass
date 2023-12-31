import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

export default function StartPage() {
  return (
    <View className='justify-center flex-1'>
      <ActivityIndicator size="large" color={COLORS.blue_900} />
    </View>
  )
}