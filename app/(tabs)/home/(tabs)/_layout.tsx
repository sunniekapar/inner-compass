import { Tabs } from 'expo-router';

export default () => {
  return (
    <Tabs>
      <Tabs.Screen name="test" options={{ headerShown: false}} />
      <Tabs.Screen name="graph" options={{ headerShown: false }} />
    </Tabs>
  );
};
