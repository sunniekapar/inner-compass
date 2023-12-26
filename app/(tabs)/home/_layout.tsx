import { Stack } from 'expo-router';

export default () => {
  return (
    <Stack>
      <Stack.Screen
        name="dashboard"
        options={{
          headerShown: false,
          headerStyle: {
            backgroundColor: 'transparent',
          }, 
        }}
      />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
    </Stack>
  );
};
