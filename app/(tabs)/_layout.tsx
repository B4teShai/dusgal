import { Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';
import { useRef } from 'react';
import { Animated, View } from 'react-native';
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

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
          height: 65,
          paddingBottom: 10,
          paddingTop: 10,
          position: 'absolute',
          bottom: 20,
          left: 20,
          right: 20,
          borderRadius: 30,
          shadowColor: colors.primary,
          shadowOffset: { width: 0, height: 4 },
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
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={{ 
              transform: [{ scale: focused ? 1.1 : 1 }],
              opacity: focused ? 1 : 0.7,
            }}>
              <Ionicons name="time-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="water-dashboard"
        options={{
          tabBarIcon: ({ focused }: { focused: boolean }) => (
            <Animated.View 
              style={{ 
                backgroundColor: colors.primary,
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
              <Ionicons name="water-outline" size={28} color="#ffffff" />
            </Animated.View>
          ),
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          tabBarIcon: ({ color, size, focused }: { color: string; size: number; focused: boolean }) => (
            <View style={{ 
              transform: [{ scale: focused ? 1.1 : 1 }],
              opacity: focused ? 1 : 0.7,
            }}>
              <Ionicons name="settings-outline" size={size} color={color} />
            </View>
          ),
        }}
      />
    </Tabs>
  );
} 