import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, ScrollView, View } from 'react-native';
import StyledText from '../../../../components/StyledText';
import { Category } from '../../../../data/types';
import { useLocalSearchParams } from 'expo-router';
import importCategoryData from '../../../../util/data';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import ScrollLayout from '../../../../components/ScrollLayout';
import Bar from '../../../../components/Bar';
import Card from '../../../../components/Card';
import { colorMapHEX } from '../../../../util/colorMapping';
import StyledPieChart from '../../../../components/StyledPieChart';
import { SelectList } from 'react-native-dropdown-select-list';
import React from 'react';
import { useUser } from '@clerk/clerk-expo';
import { COLORS } from '../../../../constants';
import { url } from '../../../../util/key';

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

  const [loading, setLoading] = useState(true);
  const { user } = useUser();
  const params = useLocalSearchParams().id
    ? useLocalSearchParams<{ id: string }>().id
    : 'Personal Relationship';

  const [selectedCategoryName, setSelectedCategoryName] =
    useState<string>(params);

  const [questions, setQuestions] = useState<any>([]);

  const fetchFromLocal = (categoryName: string) => {
    importCategoryData(categoryName)
      .then((module) => {
        setData({ ...module.default });
        setSelectedCategoryName(module.default.category);
        setQuestions(module.default.questions);
      })
      .catch((error) => {
        console.error('Unable to import data', error);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${url}/categories/${
            user?.id
          }/${selectedCategoryName.replaceAll(' ', '')}`
        );
        if (!response.ok) fetchFromLocal(selectedCategoryName);
        else {
          const result = await response.json();

          const sortedQuestions = [...result.questions].sort(
            (a, b) => b.value - a.value
          );

          setData(result);
          setSelectedCategoryName(result.category);
          setQuestions(sortedQuestions);
        }
      } catch (error) {
        console.error('Error submitting survey:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedCategoryName]);

  const changeSort = () => {
    setQuestions((prev: []) => {
      if (prev && Array.isArray(prev)) {
        return [...prev].reverse();
      }
      return prev;
    });
  };

  if (loading)
    return (
      <View className="justify-center flex-1">
        <ActivityIndicator size="large" color={COLORS.blue_900} />
      </View>
    );

  return (
    <ScrollLayout className="mx-auto w-[400px] my-32 items-center">
      <View className="items-center justify-center flex-1 h-96 w-96">
        {loading ? (
          <ActivityIndicator />
        ) : (
          <StyledPieChart data={questions} key={-1} />
        )}
      </View>

      <Card className="relative flex-col p-16 mt-20">
        <View className="z-10 flex-row items-start justify-end gap-10 ">
          <View className="absolute left-0 z-10">
            <SelectList
              fontFamily="QuicksandSemiBold"
              data={categories}
              setSelected={(val: string) => setSelectedCategoryName(val)}
              save="value"
              boxStyles={{ borderWidth: 0, backgroundColor: 'transparent' }}
              dropdownStyles={{
                borderWidth: 0,
                position: 'relative',
                backgroundColor: '#f5f5f5',
                elevation: 5, // For Android
              }}
              search={false}
              placeholder={selectedCategoryName}
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
            {questions ? (
              questions.map((item: any, index: number) => {
                return (
                  <React.Fragment key={index}>
                    <View className="flex-row justify-between" key={index}>
                      <StyledText className="text-xl" weight="medium">
                        {item.subCategory}
                      </StyledText>
                      <StyledText
                        className={`text-xl text-right text-[${colorMapHEX(
                          item.value
                        )}]`}
                        weight="bold"
                      >
                        {item.value}
                      </StyledText>
                    </View>
                    <Bar />
                  </React.Fragment>
                );
              })
            ) : (
              <ActivityIndicator />
            )}
          </ScrollView>
        </View>
      </Card>
    </ScrollLayout>
  );
}
