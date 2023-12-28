import { useEffect, useState } from 'react';
import Button from '../../../components/Button';
import { Pressable, ScrollView, View } from 'react-native';
import StyledText from '../../../components/StyledText';
import { Category, Question } from '../../../data/types';
import { useLocalSearchParams } from 'expo-router';
import importCategoryData from '../../../util/data';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import ScrollLayout from '../../../components/ScrollLayout';
import Bar from '../../../components/Bar';
import Card from '../../../components/Card';
import { colorMapTW } from '../../../util/colorMapping';
import StyledPieChart from '../../../components/StyledPieChart';

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
    <ScrollLayout className="mx-auto w-[400px] my-32 items-center">
      <View className="items-center justify-center flex-1 h-96 w-96">
        <View className="items-center justify-center flex-1 h-96 w-96">
          <StyledPieChart data={data.questions}  />

        </View>
      </View>
      <Card className="flex-col p-16 mt-6 ">
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
          <ScrollView className="px-6 pb-6">
            {questions?.map((item) => {
              return (
                <>
                  <View className="flex-row justify-between" key={item.id}>
                    <StyledText className="text-xl" weight="medium">
                      {item.subCategory}
                    </StyledText>
                    <StyledText
                      className={twMerge(
                        'text-xl text-right',
                        colorMapTW(item.value)
                      )}
                      weight="bold"
                    >
                      {item.value}
                    </StyledText>
                  </View>
                  <Bar />
                </>
              );
            })}
          </ScrollView>
        </View>
      </Card>
    </ScrollLayout>
  );
}