import StyledText from '../../../components/StyledText';
import Button from '../../../components/Button';
import { Pressable, View, ScrollView } from 'react-native';
import Layout from '../../../components/Layout';
import React, { useState } from 'react';
import StyledModal from '../../../components/StyledModal';
import Card from '../../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
const data = [
  {
    category: 'Personal Relationship',
    description: 'Some description',
  },
  {
    category: 'Family Relationship',
    description: 'Some description',
  },
  {
    category: 'Personal Development',
    description: 'Some description',
  },
  {
    category: 'Health And Fitness',
    description: 'Some description',
  },
  {
    category: 'Financial Health And Habits',
    description: 'Some description',
  },
  {
    category: 'Hobbies',
    description: 'Some description',
  },
  {
    category: 'Career',
    description: 'Some description',
  },
  {
    category: 'Workplace',
    description: 'Some description',
  },
];
export default function home() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selection, setSelection] = useState<Number>();
  return (
    <Layout className="flex-col items-center justify-center gap-6 px-10 mx-auto">
      <StyledText className="text-[86px] text-blue-900" weight="bold">
        Welcome!
      </StyledText>
      <StyledText className="mb-16 text-3xl " weight="medium">
        Discover your inner compass
      </StyledText>
      <Button variant="primary" size="lg" onPress={() => setModalVisible(true)}>
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
            {data.map((item, index) => {
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
              pathname: '/(tabs)/(survey)/survey',
              params: { id: selectedCategory},
            });
          }}
        >
          Next
        </Button>
      
      </StyledModal>
    </Layout>
  );
}
