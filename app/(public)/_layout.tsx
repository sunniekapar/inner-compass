import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack screenOptions={{ headerBackTitle: 'Back' }}>
      <Stack.Screen name="login" options={{ headerTitle: 'Inner Compass', headerShown: false}} />
      <Stack.Screen name="reset" options={{ headerTitle: 'Reset Password', headerShown: false }} />
      <Stack.Screen
        name="register"
        options={{ headerTitle: 'Create Account', headerShown: false }}
      />
    </Stack>
  );
};
