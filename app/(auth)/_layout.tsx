import {  Stack } from 'expo-router';
import '../global.css';
import { useAuth } from '@clerk/clerk-expo';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';
import StyledText from '../../components/StyledText';
import { Pressable, View } from 'react-native';

export const LogoutButton = () => {
  const { signOut } = useAuth();
  const doLogout = () => {
    signOut();
  };
  return (
    <Pressable
      onPress={doLogout}
      className="flex justify-center items center"
    >
      <View className="flex-row items-center justify-center gap-2">
        <StyledText className="text-xl text-neutral-500" weight="semibold">
          Sign out
        </StyledText>
        <Ionicons name="log-out-outline" size={24} color={COLORS.blue_900} />
      </View>
    </Pressable>
  );
};

export default function RootLayoutNav() {
  const { isSignedIn } = useAuth();
  
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen
        name="(tabs)"
        options={{ headerShown: false }}
        redirect={!isSignedIn}
      />
    </Stack>
  );
}
