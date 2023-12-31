import { TextInput, SafeAreaView, View, ScrollView } from 'react-native';
import React, { useState } from 'react';
import Button from '../../components/Button';
import { Link } from 'expo-router';
import { useSignIn } from '@clerk/clerk-expo';
import StyledTextInput from '../../components/StyledTextInput';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';


export default function Login() {
  const { signIn, setActive, isLoaded } = useSignIn();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setloading] = useState(false);

  const onSignInPress = async () => {
    if (!isLoaded) return;
    setloading(true);
    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress,
        password,
      });
      await setActive({ session: completeSignIn.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setloading(false);
    }
  };
  return (
    <Layout className="items-center justify-center flex-1 w-1/2 px-4 mx-auto ">
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center'}}
        className="w-full"
      >

        <StyledText
          className="w-full mb-12 text-4xl text-center text-blue-900"
          weight="bold"
        >
          Welcome to Inner Compass
        </StyledText>
        <StyledText
          className="mb-8 text-2xl"
          weight="bold"
        >
          Sign in
        </StyledText>
        <View className="justify-start w-full mb-2">
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
          <StyledText weight="bold" className="mb-1 text-xl">
            Password
          </StyledText>
          <StyledTextInput
            placeholder="password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
            className="mb-4"
          />
        </View>

        <View className="flex-row justify-between w-full mb-4 align-center">
          {/* <StyledText>Remember me</StyledText> */}

          <Link href="/reset">
            <StyledText weight="bold">Forgot password?</StyledText>
          </Link>
        </View>

        <Button
          variant="primary"
          size="md"
          className="w-full mb-4"
          onPress={onSignInPress}
        >
          Log In
        </Button>

        <View className="flex-row w-full">
          <StyledText weight="semibold" className="mr-1 text-neutral-600">
            Don't have an account?
          </StyledText>
          <Link href="/register">
            <StyledText weight="bold">Sign up</StyledText>
          </Link>
        </View>
      </ScrollView>
    </Layout>
  );
}
