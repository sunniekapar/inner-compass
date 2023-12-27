import StyledText from '../../../components/StyledText';
import Button from '../../../components/Button';
import { Pressable, View } from 'react-native';
import Layout from '../../../components/Layout';
import { useState } from 'react';
import StyledModal from '../../../components/StyledModal';
import Card from '../../../components/Card';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { router } from 'expo-router';
import Survey from './../survey';

export default function start() {
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selection, setSelection] = useState(false);
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
        <View>
          <StyledText className="mb-10 text-4xl" weight="bold">
            Choose one topic that you'd like to focus on:
          </StyledText>

          <Pressable onPress={() => setSelection((prev) => !prev)}>
            <Card className="px-8 pt-6 pb-8 border shadow-none border-slate-300">
              <StyledText weight="bold" className="mb-6 text-2xl">
                Personal relationship
              </StyledText>
              <View className="flex-row items-center justify-between gap-6">
                <StyledText className="text-xl">
                  For you and your loved ones
                </StyledText>
                <View className="">
                  {selection ? (
                    <Ionicons name="checkmark-circle" size={16} color="black" />
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
        </View>

        <Button
          variant="primary"
          size="md"
          disabled={!selection}
          onPress={() => {
            setModalVisible(false);
            router.push({
              pathname: '/survey',
              params: { id: 'PersonalRelationship' },
            });
          }}
        >
          Next
        </Button>
      </StyledModal>
    </Layout>
  );
}
