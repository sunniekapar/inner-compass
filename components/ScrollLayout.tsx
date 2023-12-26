import { useState } from 'react';
import { SafeAreaView, ImageBackground, ViewProps } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { twMerge } from 'tailwind-merge';

export default function Layout({ children, className }: ViewProps) {
  const background = require('../assets/images/background3.jpg');
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <ImageBackground
      source={background}
      onLoadEnd={() => setIsLoaded(true)}
      style={isLoaded ? {} : { backgroundColor: '#C4C3C4' }}
      className="flex-1 h-[100vh]"
    >
      <ScrollView>
        <SafeAreaView className={twMerge('flex-1', className)}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </ImageBackground>
  );
}
