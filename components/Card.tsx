import { View, ViewProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export default function Card({children, className} : ViewProps) {
  return (
    <View className={twMerge("bg-stone-100 rounded-lg shadow-lg p-8", className)}>
      {children}
    </View>
  )
}