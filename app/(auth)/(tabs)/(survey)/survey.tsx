import { View, SafeAreaView } from 'react-native';
import Slider from '@react-native-community/slider';
import React, { useState, useEffect } from 'react';
import { COLORS } from '../../../../constants';
import Button from '../../../../components/Button';
import StyledText from '../../../../components/StyledText';
import { router, useLocalSearchParams } from 'expo-router';
import { Question } from '../../../../data/types';
import ProgressIndicator from '../../../../components/ProgressIndicator';
import importCategoryData from '../../../../util/data';
import Layout from '../../../../components/Layout';
import { useUser } from '@clerk/clerk-expo';
import { url } from '../../../../util/key';
import { normalizeCategoryName } from '../../../../util/util';

export default function Survey() {
  const [category, setCategory] = useState('');
  const [sliderValue, setSliderValue] = useState(5);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [buttonLabel, setButtonLabel] = useState('Next question');
  const { user } = useUser();
  const params = useLocalSearchParams<{ id: string }>();
  const categoryName = params.id;
  
  useEffect(() => {
    return () => {
      setSliderValue(5);
      setCurrentQuestion(0);
      setButtonLabel('Next question');
    };
  }, []);

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

  const submitSurvey = async () => {
    const data = {
      userId: user?.id,
      category: categoryName,
      questions: questions.map(({ _id, question, ...rest }) => rest),
    };

    const surveyDataJSON = JSON.stringify(data);
    try {
      const collectionName = normalizeCategoryName(categoryName);

      const response = await fetch(
        `${url}/categories/${user?.id}/${collectionName}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: surveyDataJSON,
        }
      );

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      //const responseData = await response.json();
      // console.log('Survey data saved:', responseData);

      // Redirect or update the UI after successful submission
      setCurrentQuestion(0);
      setSliderValue(5);
      setButtonLabel('Next question');
      router.replace({
        pathname: '/(auth)/(tabs)/(statistics)/statistics',
        params: { id: categoryName },
      });
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const nextQuestion = () => {
    questions[currentQuestion].value = sliderValue;
    if (currentQuestion < questions.length - 1) {
      if (currentQuestion === questions.length - 2)
        setButtonLabel('Finish survey');
      setCurrentQuestion((prev) => prev + 1);
      setSliderValue(5);
    } else {
      submitSurvey();
    }
  };
  if (questions.length === 0) {
    return <Layout />;
  }

  return (
    <Layout>
      <ProgressIndicator maximumValue={questions.length} currentValue={currentQuestion} />
      <SafeAreaView className="items-center justify-between flex-1 w-2/3 mx-auto my-20">
        <View className="items-center">
          <StyledText weight="semibold" className="text-2xl">
            {category}
          </StyledText>
          {/* <StyledText className="mt-5">
            {Math.round((currentQuestion / questions.length) * 100)}%
          </StyledText> */}
        </View>

        <StyledText
          className="text-4xl !leading-tight text-center text-blue-900 lg:text-6xl"
          weight="semibold"
        >
          {questions[currentQuestion].question}
        </StyledText>

        <View>
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
            <StyledText className="ml-2 text-xl" weight="semibold">
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
              onPressIn={nextQuestion}
            >
              {buttonLabel}
            </Button>
            <Button
              className="mt-8"
              variant="clear"
              size="lg"
              onPressIn={nextQuestion}
            >
              Skip question
            </Button>
          </View>
        </View>
      </SafeAreaView>
    </Layout>
  );
}
