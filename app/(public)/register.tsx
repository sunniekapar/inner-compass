import { View, Text, SafeAreaView, Pressable, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-expo';
import { isLoading } from 'expo-font';
import StyledTextInput from '../../components/StyledTextInput';
import Button from '../../components/Button';
import Layout from '../../components/Layout';
import StyledText from '../../components/StyledText';
import { Link } from 'expo-router';

export default function register() {
  const { isLoaded, signUp, setActive } = useSignUp();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [canSendCodeAgain, setCanSendCodeAgain] = useState(true);
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      // Create the user on Clerk
      await signUp.create({
        emailAddress,
        password,
      });

      // Send verification Email
      await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });

      // change the UI to verify the email address
      setPendingVerification(true);
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) {
      return;
    }
    setLoading(true);

    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });

      await setActive({ session: completeSignUp.createdSessionId });
    } catch (err: any) {
      alert(err.errors[0].message);
    } finally {
      setLoading(false);
    }
  };

  function didNotRecieveCode() {
    onPressVerify();
    setCanSendCodeAgain(false);
    setTimeout(() => {
      setCanSendCodeAgain(false);
    }, 5000 * 60);
  }

  return (
    <Layout className="items-center justify-center flex-1 w-1/2 px-4 mx-auto ">
      <ScrollView
        automaticallyAdjustKeyboardInsets
        contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}
        className="w-full"
      >
        {!pendingVerification ? (
          <>
            <StyledText className="mb-2 text-4xl" weight="bold">
              Create an account
            </StyledText>
            <StyledText className="mb-5 text-lg text-neutral-500" weight="base">
              Enter your email below to create your account
            </StyledText>

            <View className="w-full">
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
              <Button variant="primary" size="md" className='mb-4' onPress={onSignUpPress}>
                Sign up with email
              </Button>

              <View className="flex-row w-full">
                <StyledText weight="semibold" className="mr-1 text-neutral-500">
                  Already have an account? 
                </StyledText>
                <Link href="/login">
                  <StyledText weight="bold">Log in</StyledText>
                </Link>
              </View>
            </View>
          </>
        ) : (
          <View className="items-center w-full">
            <StyledText className="mb-2 text-4xl" weight="bold">
              Verifiction Code
            </StyledText>
            <StyledText className="mb-6 text-lg text-neutral-500" weight="base">
              Enter the 6-digit code that we have sent through your email
            </StyledText>
            <StyledTextInput
              value={code}
              placeholder="Code..."
              onChangeText={setCode}
              className="mb-3"
            />
            <Button
              className="w-full mb-3"
              variant="primary"
              size="md"
              onPress={onPressVerify}
            >
              Verify Email
            </Button>
            <View className="flex-row justify-start w-full">
              <StyledText className="mr-1 text-neutral-500">
                Didn't recieve a code?{' '}
              </StyledText>
              <Pressable
                onPress={didNotRecieveCode}
                disabled={!canSendCodeAgain}
              >
                <StyledText
                  weight="semibold"
                  className={`${canSendCodeAgain ? '' : 'opacity-70'}`}
                >
                  Send another one
                </StyledText>
              </Pressable>
            </View>
          </View>
        )}
      </ScrollView>
    </Layout>
  );
}
