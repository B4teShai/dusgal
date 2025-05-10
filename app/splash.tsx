import { useTheme } from '@/src/context/ThemeContext';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { commonStyles } from '../src/theme';

const { width } = Dimensions.get('window');

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
  const scrollX = new Animated.Value(0);
  const fadeAnimation = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(fadeAnimation, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
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

  const { colors } = useTheme();
  
  return (
    <SafeAreaView className={commonStyles.container}>
      <View className="flex-1">
        <View className="flex-row justify-end px-6 pt-4">
          <TouchableOpacity onPress={handleSkip}>
            <Text className={commonStyles.text.link}>Алгасах</Text>
          </TouchableOpacity>
        </View>

        <Animated.View 
          className="flex-1 items-center justify-center px-6"
          style={{ opacity: fadeAnimation }}
        >
          <View className="items-center mb-12">
            <Ionicons 
              name={onboardingData[currentPage].icon as any} 
              size={140} 
              color={colors.primary} 
            />
          </View>
          
          <View className="items-center">
            <Text className={`${commonStyles.text.title} text-center mb-4`}>
              {onboardingData[currentPage].title}
            </Text>
            <Text className={`${commonStyles.text.subtitle} text-center`}>
              {onboardingData[currentPage].subtitle}
            </Text>
          </View>

          <View className="flex-row justify-center mt-8 mb-12">
            {onboardingData.map((_, index) => (
              <View
                key={index}
                className={`h-2 w-2 rounded-full mx-1 ${
                  currentPage === index ? 'bg-primary' : 'bg-gray-300'
                }`}
              />
            ))}
          </View>

          <TouchableOpacity
            className={`${commonStyles.button.primary} w-full shadow-lg`}
            onPress={handleNext}
          >
            <Text className={commonStyles.button.text.primary}>
              {currentPage === onboardingData.length - 1 ? 'Эхлэх' : 'Үргэлжлүүлэх'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
} 