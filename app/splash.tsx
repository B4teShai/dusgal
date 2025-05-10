import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');
//sda
const onboardingData = [
  {
    title: 'Усны Хэрэглээ',
    subtitle: 'Таны гэрийн усны хэрэглээг хянах, хэмнэх',
    icon: 'water',
  },
  {
    title: 'Статистик',
    subtitle: 'Өдөр тутмын усны хэрэглээний дэлгэрэнгүй мэдээлэл',
    icon: 'stats-chart',
  },
  {
    title: 'Хэмнэлт',
    subtitle: 'Усны хэрэглээг багасгаж, мөнгөө хэмнэх',
    icon: 'leaf',
  },
];

export default function SplashScreen() {
  const [currentPage, setCurrentPage] = useState(0);
  const { colors, isDarkMode } = useTheme();
  const scrollX = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(0);
  const scaleAnimation = new Animated.Value(0.8);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnimation, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnimation, {
        toValue: 1,
        tension: 20,
        friction: 7,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const handleNext = () => {
    if (currentPage < onboardingData.length - 1) {
      setCurrentPage(currentPage + 1);
    } else {
      router.replace('/login');
    }
  };

  const handleSkip = () => {
    router.replace('/login');
  };
  
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1">
        <View className="flex-row justify-end px-6 pt-4">
          <TouchableOpacity onPress={handleSkip}>
            <Text style={{ color: colors.primary }} className="text-base font-medium">
              Алгасах
            </Text>
          </TouchableOpacity>
        </View>

        <Animated.View 
          className="flex-1 items-center justify-center px-6"
          style={{ 
            opacity: fadeAnimation,
            transform: [{ scale: scaleAnimation }]
          }}
        >
          <View className="items-center mb-12">
            <View style={{ backgroundColor: colors.primary + '15' }} className="p-8 rounded-full">
              <Ionicons 
                name={onboardingData[currentPage].icon as any} 
                size={140} 
                color={colors.primary} 
              />
            </View>
          </View>
          
          <View className="items-center">
            <Text style={{ color: colors.text.primary }} className="text-4xl font-bold text-center mb-4">
              {onboardingData[currentPage].title}
            </Text>
            <Text style={{ color: colors.text.secondary }} className="text-lg text-center">
              {onboardingData[currentPage].subtitle}
            </Text>
          </View>

          <View className="flex-row justify-center mt-8 mb-12">
            {onboardingData.map((_, index) => (
              <View
                key={index}
                style={{ 
                  backgroundColor: currentPage === index ? colors.primary : colors.border,
                  width: currentPage === index ? 20 : 8,
                }}
                className="h-2 rounded-full mx-1 transition-all duration-300"
              />
            ))}
          </View>

          <TouchableOpacity
            style={{ backgroundColor: colors.primary }}
            className="w-full py-4 rounded-xl shadow-lg"
            onPress={handleNext}
          >
            <Text style={{ color: '#ffffff' }} className="text-center font-semibold text-lg">
              {currentPage === onboardingData.length - 1 ? 'Эхлэх' : 'Үргэлжлүүлэх'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
} 