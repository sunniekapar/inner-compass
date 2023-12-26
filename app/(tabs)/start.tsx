import StyledText from '../../components/StyledText';
import Button from '../../components/Button';
import { View } from 'react-native';
import { router } from 'expo-router';
import Layout from '../../components/Layout';
export default function App() {
  return (
    <Layout className="flex-col justify-center gap-10 mx-auto">
      <View className="px-10">
        <View>
          <StyledText className="mb-2 text-[86px] text-blue-900" weight="bold">
            Welcome
          </StyledText>
          <StyledText className="mb-10 text-3xl " weight="medium">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic, unde?
          </StyledText>
        </View>
        <View className="items-start">
          <Button
            variant="primary"
            size="md"
            onPress={() => {
              router.push({
                pathname: '/survey',
                params: { id: 'PersonalDevelopment' },
              });
            }}
          >
            Personal Development
          </Button>

          <Button
            variant="primary"
            size="md"
            className="mt-4"
            onPress={() =>
              router.push({
                pathname: '/survey',
                params: { id: 'PersonalRelationship' },
              })
            }
          >
            Personal Relationship
          </Button>

          <Button
            variant="primary"
            size="md"
            className="mt-4"
            onPress={() =>
              router.push({
                pathname: '/home/dashboard',
              })
            }
          >
            Dashboard
          </Button>
        </View>
      </View>
    </Layout>
  );
}
