import { View, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../constants';
import Button from '../../components/Button';
import StyledText from '../../components/StyledText';
import { router, useLocalSearchParams } from 'expo-router';

import { Category, Question } from '../../data/types';

type RouteParams =
  | 'PersonalRelationship'
  | 'FamilyRelationship'
  | 'PersonalDevelopment'
  | 'HealthAndFitness'
  | 'FinancialHealthAndHabits'
  | 'Hobbies'
  | 'Career'
  | 'Workplace';

const importCategoryData = (categoryName: string | string[]) => {
  switch (categoryName) {
    case 'PersonalRelationship':
      return import('../../data/PersonalRelationship');
    case 'FamilyRelationship':
      return import('../../data/FamilyRelationship');
    case 'PersonalDevelopment':
      return import('../../data/PersonalDevelopment');
    case 'HealthAndFitness':
      return import('../../data/HealthAndFitness');
    case 'FinancialHealthAndHabits':
      return import('../../data/FinancialHealthAndHabits');
    case 'Hobbies':
      return import('../../data/Hobbies');
    case 'Career':
      return import('../../data/Career');
    case 'Workplace':
      return import('../../data/Workplace');
    default:
      throw new Error('Unkown Category');
  }
};

export default function Survey() {
  const [category, setCategory] = useState('');
  const [sliderValue, setSliderValue] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const params = useLocalSearchParams();
  let categoryName = Array.isArray(params) ? params.id[0] : params.id;

  useEffect(() => {
    importCategoryData(categoryName)
      .then((module) => {
        setCategory(module.default.category);
        setQuestions(module.default.questions);
        setCurrentQuestion(0);
      })
      .catch((error) => {
        console.error('Failed to load category data', error);
      });
  }, [categoryName]);

  const nextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
      setSliderValue(5);
    } else {
      router.replace('/layouts/Dashboard');
    }
  };
  if(questions.length === 0) {
    return <StyledText>Hi</StyledText>
  }
  return (
    <SafeAreaView className="items-center justify-between flex-1 w-2/3 mx-auto my-20">
      <View className="items-center">
        <StyledText weight="semibold" className="text-2xl">
          {category}
        </StyledText>
        <StyledText className="mt-5">
          {Math.round((currentQuestion / questions.length) * 100)}%
        </StyledText>
      </View>

      <StyledText
        className="text-4xl !leading-tight text-center text-blue-900 lg:text-6xl"
        weight="semibold"
      >
        {questions[currentQuestion].question}
      </StyledText>

      <View className="">
        <Slider
          minimumValue={0}
          maximumValue={10}
          minimumTrackTintColor={COLORS.blue_900}
          maximumTrackTintColor={'#1E3A8A80'}
          thumbTintColor={COLORS.blue_900}
          value={sliderValue}
          onValueChange={(value) => setSliderValue(value)}
          step={1}
          style={{ width: 300, height: 30 }}
        />
        <View className="flex-row justify-between w-100">
          <StyledText className="text-xl" weight="semibold">
            Not at all
          </StyledText>
          <StyledText className="text-xl ms-2" weight="semibold">
            {sliderValue}
          </StyledText>
          <StyledText className="text-xl" weight="semibold">
            Extremely
          </StyledText>
        </View>
        <View className="items-center pt-32">
          <Button
            className="shadow-md "
            variant="primary"
            size="lg"
            onPress={nextQuestion}
          >
            Next question
          </Button>
          <Button
            className="mt-8"
            variant="clear"
            size="lg"
            onPress={nextQuestion}
          >
            Skip question
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
}
