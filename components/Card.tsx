import { View, ViewProps } from 'react-native'
import { twMerge } from 'tailwind-merge'

export default function Card({children, className} : ViewProps) {
  return (
    <View className={twMerge(" bg-slate-rgba rounded-lg shadow-lg p-8", className)}>
      {children}
    </View>
  )
}