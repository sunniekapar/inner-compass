import { Redirect } from 'expo-router';

export default function StartPage() {
  return (
    <Redirect href="/(tabs)/(home)/home" />
  );
}
