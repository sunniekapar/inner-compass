import { View, Text, SafeAreaView, ScrollView } from 'react-native';
import React from 'react';
import { useSignIn } from '@clerk/clerk-expo';
import { useState } from 'react';
import StyledTextInput from '../../components/StyledTextInput';
import { Link, Stack } from 'expo-router';
import Button from '../../components/Button';
import StyledText from '../../components/StyledText';
import Layout from '../../components/Layout';
export default function reset() {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [code, setCode] = useState('');
  const [successfulCreation, setSucessfulCreation] = useState(false);
  const { signIn, setActive } = useSignIn();

  const onRequestRest = async () => {
    try {
      await signIn!.create({
        strategy: 'reset_password_email_code',
        identifier: 'emailAddress',
      });
      setSucessfulCreation(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };
  const onReset = async () => {
    try {
      const result = await signIn!.attemptFirstFactor({
        strategy: 'reset_password_email_code',
        code,
        password,
      });
      console.log(result);
      alert('Password reset successfully');

      await setActive!({ session: result.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    }
  };

  return (
    <Layout className="items-center justify-center flex-1 w-1/2 px-4 mx-auto ">
      <Stack.Screen options={{ headerBackVisible: !successfulCreation }} />
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="w-full"
      >
        {successfulCreation ? (
          <>
            <StyledTextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
            />
            <StyledTextInput
              value={password}
              placeholder="New Password"
              onChangeText={setPassword}
            />
            <Button onPress={onReset}> Set new Password</Button>
          </>
        ) : (
          <>
            <View className="items-center justify-center">
              <StyledText className="mb-2 text-4xl" weight="bold">
                Reset password
              </StyledText>
              <StyledText
                className="mb-5 text-lg text-neutral-500 "
                weight="base"
              >
                Enter your email to reset your password
              </StyledText>
            </View>

            <View className="w-full justify start">
              <StyledText weight="bold" className="mb-1 text-xl">
                Email
              </StyledText>
              <StyledTextInput
                autoCapitalize="none"
                placeholder="johndoe@gmail.com"
                value={emailAddress}
                onChangeText={setEmailAddress}
                className="mb-2"
              />
            </View>
            <Button
              variant="primary"
              className="w-full mb-4"
              size="md"
              onPress={onRequestRest}
            >
              Reset password
            </Button>
            <View className="flex-row w-full">
              <Link href="/login">
                <StyledText weight="semibold">
                  Back to sign in
                </StyledText>
              </Link>
            </View>
          </>
        )}
      </ScrollView>
    </Layout>
  );
}
