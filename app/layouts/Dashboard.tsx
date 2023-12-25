import { useState } from 'react';
import ProgressIndicator from '../../components/ProgressIndicator';
import Button from '../../components/Button';
import { SafeAreaView, View } from 'react-native';

export default function Dashboard() {
  const [value, setValue] = useState(0);
  const nextQuestion = () => {
    setValue((prev) => (prev >= 5 ? 0 : prev + 1));
  };

  return (
    <>
      <ProgressIndicator maximumValue={5} currentValue={value} />
      <SafeAreaView>
        <View className="relative items-center justify-center">
          <Button
            onPress={nextQuestion}
            size="lg"
            className="w-64"
            variant="primary"
          >
            Wassup
          </Button>
        </View>
      </SafeAreaView>
    </>
  );
}
