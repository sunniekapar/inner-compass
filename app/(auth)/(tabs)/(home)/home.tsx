import StyledText from '../../../../components/StyledText';
import Button from '../../../../components/Button';
import { Pressable, View, ScrollView, SafeAreaView } from 'react-native';
import Layout from '../../../../components/Layout';
import React, { useState } from 'react';
import StyledModal from '../../../../components/StyledModal';
import Card from '../../../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useUser } from '@clerk/clerk-expo';
import { LogoutButton } from '../../_layout';

const categories = [
  {
    category: 'Personal Relationship',
    description: 'Explore and evaluate the quality of your romantic and close personal connections.',
  },
  {
    category: 'Family Relationship',
    description: 'Reflect on the dynamics and health of your relationships with family members.',
  },
  {
    category: 'Personal Development',
    description: 'Assess your journey in self-improvement and personal growth areas.',
  },
  {
    category: 'Health & Fitness',
    description: 'Gauge your physical well-being, fitness levels, and health habits.',
  },
  {
    category: 'Financial Health & Habits',
    description: 'Examine your financial management skills and monetary well-being.',
  },
  {
    category: 'Hobbies & Interests',
    description: 'Look into how you engage with and value your leisure activities and interests.',
  },
  {
    category: 'Career',
    description: 'Evaluate your professional progression, satisfaction, and aspirations.',
  },
  {
    category: 'Workplace',
    description: 'Assess the environment and culture of your current workplace and its impact on you.',
  },
];

export default function home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selection, setSelection] = useState<Number>();
  const { user } = useUser();
  return (
    <>
      <View className="absolute z-10 right-8 top-8">
        <LogoutButton />
      </View>
      <Layout className="flex-col items-center justify-center gap-6 px-10 mx-auto">
        <StyledText className="text-[86px] text-blue-900" weight="bold">
          {`Welcome ${user?.firstName}!`}
        </StyledText>
        <StyledText className="mb-16 text-3xl " weight="medium">
          Discover your inner compass
        </StyledText>
        <Button
          variant="primary"
          size="lg"
          onPress={() => setModalVisible(true)}
        >
          Start questionaire
        </Button>

        <StyledModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          className="justify-between"
        >
          <View className="flex-1">
            <StyledText className="mb-10 text-4xl" weight="bold">
              Choose one topic that you'd like to focus on:
            </StyledText>
            <ScrollView>
              {categories.map((item, index) => {
                return (
                  <Pressable
                    onPress={() => {
                      setSelection(index);
                      setSelectedCategory(item.category);
                    }}
                    key={index}
                  >
                    <Card
                      className={`px-8 pt-6 pb-8 border shadow-none border-slate-300 mb-4 ${
                        selection !== index ? 'opacity-50' : ''
                      }`}
                    >
                      <StyledText weight="bold" className="mb-6 text-2xl">
                        {item.category}
                      </StyledText>
                      <View className="flex-row items-center justify-between gap-6">
                        <StyledText className="text-xl">
                          {item.description}
                        </StyledText>
                        <View className="">
                          {selection === index ? (
                            <Ionicons
                              name="checkmark-circle"
                              size={16}
                              color="black"
                            />
                          ) : (
                            <Entypo
                              name="circle"
                              size={16}
                              color="black"
                              style={{ opacity: 0.2 }}
                            />
                          )}
                        </View>
                      </View>
                    </Card>
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>

          <Button
            variant="primary"
            size="md"
            disabled={selection === undefined}
            onPress={() => {
              setModalVisible(false);
              router.push({
                pathname: '/(auth)/(tabs)/(survey)/survey',
                params: { id: selectedCategory },
              });
            }}
          >
            Next
          </Button>
        </StyledModal>
      </Layout>
    </>
  );
}
