import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import React, { useRef } from 'react';
import { Animated, Image, View } from 'react-native';
import { useTheme } from '../../src/context/ThemeContext';

export default function TabsLayout() {
  const { colors, isDarkMode } = useTheme();
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const animatePress = () => {
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 0.9,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const TabIcon = ({ name, color, size, focused }: { name: string; color: string; size: number; focused: boolean }) => (
    <View style={{ 
      alignItems: 'center',
      justifyContent: 'center',
      width: 40,
      height: 40,
    }}>
      {focused && (
        <Animated.View
          style={{
            position: 'absolute',
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: colors.primary + '20',
            transform: [{ scale: focused ? 1 : 0 }],
          }}
        />
      )}
      <Ionicons name={name as any} size={size} color={color} />
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 75,
          paddingBottom: 30,
          paddingTop: 10,
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.1,
          shadowRadius: 8,
          elevation: 5,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="history"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="time-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
      <Tabs.Screen
        name="water-dashboard"
        options={{
          tabBarIcon: ({ focused }) => (
            <Animated.View 
              style={{ 
                backgroundColor: colors.surface,
                width: 60,
                height: 60,
                borderRadius: 30,
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 20,
                transform: [
                  { scale: scaleAnim },
                  { translateY: focused ? -10 : 0 }
                ],
                shadowColor: colors.primary,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.3,
                shadowRadius: 8,
                elevation: 8,
              }}
              onTouchStart={animatePress}
            >
              <Image
                source={require('../../assets/images/logo.png')}
                style={{ width: 24, height: 24 }}
                resizeMode="contain"
              />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size, focused }) => (
            <TabIcon name="settings-outline" color={color} size={size} focused={focused} />
          ),
        }}
      />
    </Tabs>
  );
}