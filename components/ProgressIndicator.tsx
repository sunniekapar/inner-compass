import React, { useEffect, useRef } from 'react';
import { View, Animated } from 'react-native';

interface ProgressIndicatorProps {
  maximumValue: number;
  currentValue: number;
}

export default function ProgressIndicator({
  maximumValue,
  currentValue,
}: ProgressIndicatorProps) {
  const animatedHeight = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedHeight, {
      toValue: currentValue / maximumValue,
      duration: 250,
      useNativeDriver: false,
    }).start();
  }, [currentValue, maximumValue]);

  const bottomInterpolation = animatedHeight.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View className="absolute top-0 bottom-0 left-0 right-0 w-2">
      <Animated.View
        className="absolute bottom-0 left-0 right-0 bg-blue-900 rounded"
        style={{ height: bottomInterpolation }}
      />
    </View>
  );
}
