import { Redirect } from 'expo-router';

export default function StartPage() {
  return (
    <Redirect href="/(auth)/(tabs)/(home)/home" />
  );
}
