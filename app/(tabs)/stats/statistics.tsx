import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import {
  FlatList,
  Pressable,
  SafeAreaView,
  ScrollView,
  View,
} from 'react-native';
import StyledText from '../../../components/StyledText';
import { Category, Question } from '../../../data/types';
import { useLocalSearchParams } from 'expo-router';
import importCategoryData from '../../../util/data';
import Layout from '../../../components/Layout';
import { COLORS } from '../../../constants';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import ScrollLayout from '../../../components/ScrollLayout';
import Bar from '../../../components/Bar';
import Card from '../../../components/Card';

const resultsColorMap = (value: number) => {
  switch (value) {
    case 10:
      return 'text-blue-900';
    case 9:
    case 8:
      return 'text-emerald-900';
    case 7:
    case 6:
      return 'text-green-800';
    case 5:
    case 4:
      return 'text-yellow-700';
    case 3:
    case 2:
      return 'text-amber-700';
    default:
      return 'text-red-900';
  }
};

export default function statistics() {
  const [data, setData] = useState<Category | null>();
  const [questions, setQuestions] = useState<Question[] | []>();
  const params = useLocalSearchParams().id
    ? useLocalSearchParams<{ id: string }>().id
    : 'PersonalRelationship';

  useEffect(() => {
    importCategoryData(params)
      .then((module) => {
        const sortedQuestions = [...module.default.questions].sort(
          (a, b) => b.value - a.value
        );
        setData({ ...module.default, questions: sortedQuestions });
        setQuestions(sortedQuestions);
      })
      .catch((error) => {
        console.error('Unable to import data', error);
      });
  }, [params]);

  const changeSort = () => {
    setQuestions((prev) => {
      if (prev && Array.isArray(prev)) {
        return [...prev].reverse();
      }
      return prev;
    });
  };

  if (!data) {
    return <StyledText>hi</StyledText>;
  }
  return (
    <ScrollLayout className="mx-auto w-[400px] my-32">
      <View className="flex items-center justify-center border border-blue-900 rounded-lg h-72">
        <StyledText>Graph</StyledText>
      </View>
      <Card className="flex-col p-16 mt-10 ">
        <View className="flex-row items-center justify-between gap-5 mb-10">
          <View className="flex-row gap-4">
            <Button variant="primary" size="sm" className="rounded-full ">
              Results
            </Button>
            <Button variant="primary" size="sm" className="rounded-full">
              Goals
            </Button>
          </View>
          <Pressable onPress={changeSort}>
            <MaterialCommunityIcons
              name="swap-vertical"
              size={24}
              color="#1E3A8A"
            />
          </Pressable>
        </View>
        <View className="h-96">
          <FlatList
            data={questions}
            renderItem={({ item }) => (
              <>
                <View className="flex-row justify-between">
                  <StyledText className="text-xl" weight="medium">
                    {item.subCategory}
                  </StyledText>
                  <StyledText
                    className={twMerge(
                      'text-xl text-right',
                      resultsColorMap(item.value)
                    )}
                    weight="bold"
                  >
                    {item.value}
                  </StyledText>
                </View>
                <Bar />
              </>
            )}
            keyExtractor={(item) => item.id.toString()}
            contentContainerClassName="px-6 pb-6"
          />
        </View>
      </Card>
    </ScrollLayout>
  );
}
