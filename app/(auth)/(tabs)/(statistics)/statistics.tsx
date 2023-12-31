import { useEffect, useState } from 'react';
import Button from '../../../../components/Button';
import { Pressable, ScrollView, View } from 'react-native';
import StyledText from '../../../../components/StyledText';
import { Category, Question } from '../../../../data/types';
import { useLocalSearchParams } from 'expo-router';
import importCategoryData from '../../../../util/data';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { twMerge } from 'tailwind-merge';
import ScrollLayout from '../../../../components/ScrollLayout';
import Bar from '../../../../components/Bar';
import Card from '../../../../components/Card';
import { colorMapTW } from '../../../../util/colorMapping';
import StyledPieChart from '../../../../components/StyledPieChart';
import { SelectList } from 'react-native-dropdown-select-list';
import React from 'react';
import { COLORS } from '../../../../constants';

export default function statistics() {
  const categories = [
    { value: 'Personal Relationship', key: 1 },
    { value: 'Family Relationship', key: 2 },
    { value: 'Personal Development', key: 3 },
    { value: 'Health & Fitness', key: 4 },
    { value: 'Financial Health & Habits', key: 5 },
    { value: 'Hobbies', key: 6 },
    { value: 'Career', key: 7 },
    { value: 'Workplace', key: 8 },
  ];

  const [data, setData] = useState<Category | null>();
  const [questions, setQuestions] = useState<Question[] | []>();
  const params = useLocalSearchParams().id
    ? useLocalSearchParams<{ id: string }>().id
    : 'Personal Relationship';
  const [selectedCategory, setSelectedCategory] = useState<string>(params);

  useEffect(() => {
    importCategoryData(selectedCategory)
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
  }, [selectedCategory]);

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
        <StyledPieChart data={data.questions} key={-1} />
      </View>

      <Card className="relative flex-col p-16 mt-20">
        <View className="z-10 flex-row items-start justify-end gap-10 ">
          <View className="absolute left-0 z-10">
            <SelectList
              fontFamily="QuicksandSemiBold"
              data={categories}
              setSelected={(val: string) => setSelectedCategory(val)}
              save="value"
              boxStyles={{ borderWidth: 0, backgroundColor: 'transparent' }}
              dropdownStyles={{
                borderWidth: 0,
                position: 'relative',
                backgroundColor: '#f5f5f5',
                elevation: 5, // For Android

              }}
              
              search={false}
              placeholder={params}
            />
          </View>

          <Pressable onPress={changeSort}>
            <MaterialCommunityIcons
              name="swap-vertical"
              size={24}
              color="#1E3A8A"
            />
          </Pressable>
        </View>

        <View className="mt-20 h-96 w-96">
          <ScrollView className="px-12 pb-6">
            {questions?.map((item) => {
              return (
                <React.Fragment key={item.id}>
                  <View className="flex-row justify-between" key={item.id}>
                    <StyledText className="text-xl" weight="medium">
                      {item.subCategory}
                    </StyledText>
                    <StyledText
                      className={twMerge(
                        'text-xl text-right ',
                        colorMapTW(item.value)
                      )}
                      weight="bold"
                    >
                      {item.value}
                    </StyledText>
                  </View>
                  <Bar />
                </React.Fragment>
              );
            })}
          </ScrollView>
        </View>
      </Card>
    </ScrollLayout>
  );
}
