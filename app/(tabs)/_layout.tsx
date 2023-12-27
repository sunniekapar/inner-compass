import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../../constants';

export default function _layout() {
  return (
    <Tabs
      screenOptions={{
        tabBarStyle: {
          height: 70,
          backgroundColor: "#e5e8eb",
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: 'bold',
          marginBottom: 10,
        },
      }}
    >
      <Tabs.Screen name="survey" options={{ headerShown: false, href: null }} />
      <Tabs.Screen
        name="home/start"
        options={{
          title: 'Home',
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? COLORS.blue_900 : COLORS.blue_900_opaque;
            return <Ionicons name="ios-home" size={size} color={color} />;
          },
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="stats/statistics"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? COLORS.blue_900 : COLORS.blue_900_opaque;
            return (
              <Ionicons name="ios-analytics-sharp" size={size} color={color} />
            );
          },
          tabBarShowLabel: false,
        }}
      />
      <Tabs.Screen
        name="history/history"
        options={{
          headerShown: false,
          tabBarIcon: ({ focused, color, size }) => {
            color = focused ? COLORS.blue_900 : COLORS.blue_900_opaque;
            return (
              <Ionicons name="ios-journal-sharp" size={size} color={color} />
            );
          },
          tabBarShowLabel: false,
        }}
      />
    </Tabs>
  );
}
