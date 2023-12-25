import StyledText from '../components/StyledText';
import Button from '../components/Button';
import { View, SafeAreaView, Pressable, Text } from 'react-native';
import { Link } from 'expo-router';
export default function App() {
  return (
    <SafeAreaView className="mx-auto max-w-[100% - 3rem] flex-1">
      <View className="pt-80">
        <StyledText className="mb-2 text-6xl text-blue-900" weight="bold">
          Welcome
        </StyledText>
        <StyledText className="mb-10 text-3xl " weight="medium">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, unde?
        </StyledText>
      </View>
      <View className="items-start">
        <Link
          href={{
            pathname: '/layouts/Survey',
            params: { id: 'PersonalDevelopment' },
          }}
          asChild
        >
          <Button variant="primary" size="md">
            Personal Development
          </Button>
        </Link>
        <Link
          href={{
            pathname: '/layouts/Survey',
            params: { id: 'PersonalRelationship' },
          }}
          asChild
        >
          <Button variant="primary" size="md" className="mt-4">
            Personal Relationship
          </Button>
        </Link>
      </View>
    </SafeAreaView>
  );
}
