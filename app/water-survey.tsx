import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Animated, Image, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/ThemeContext';

export default function WaterSurveyScreen() {
  const { colors, isDarkMode } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);
  const [showSplash, setShowSplash] = useState(true);
  const fadeAnim = new Animated.Value(0);
  const slideAnim = new Animated.Value(50);

  const [formData, setFormData] = useState({
    householdSize: '',
    showerDuration: '',
    hasLowFlowShower: false,
    takesBaths: false,
    bathFrequency: '',
    faucetDuration: '',
    hasLowFlowFaucets: false,
    letsItMellow: false,
    hasLowFlowToilets: false,
    kitchenFaucetDuration: '',
    hasLowFlowKitchenFaucet: false,
    dishWashingMethods: [] as string[],
    laundryMethods: [] as string[],
  });

  useEffect(() => {
    if (showSplash) {
      setTimeout(() => {
        setShowSplash(false);
      }, 2000);
    }
  }, [showSplash]);

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start();
  }, [currentStep]);

  const handleSubmit = () => {
    router.replace('/(tabs)/water-dashboard');
  };

  const toggleCheckbox = (field: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  const toggleArrayItem = (field: 'dishWashingMethods' | 'laundryMethods', value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: prev[field].includes(value)
        ? prev[field].filter(item => item !== value)
        : [...prev[field], value]
    }));
  };

  const nextStep = () => {
    setCurrentStep(prev => prev + 1);
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  if (showSplash) {
    return (
      <View style={{ flex: 1, backgroundColor: colors.background, justifyContent: 'center', alignItems: 'center' }}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Image 
            source={require('../assets/images/water-drop.svg')} 
            style={{ width: 200, height: 200 }}
          />
          <Text style={{ color: colors.text.primary, fontSize: 24, textAlign: 'center', marginTop: 20 }}>
            Усны хэрэглээний судалгаа
          </Text>
        </Animated.View>
      </View>
    );
  }

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return (
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <View className="items-center mb-8">
              <Image 
                source={require('../assets/images/household.svg')} 
                style={{ width: 150, height: 150, marginBottom: 20 }}
              />
              <Text style={{ color: colors.text.primary }} className="text-2xl font-bold mb-4">
                Гэр бүлийн мэдээлэл
              </Text>
              <TextInput
                className="w-full rounded-xl px-4 py-3 mb-4"
                style={{ 
                  backgroundColor: isDarkMode ? colors.surface : colors.background,
                  borderColor: colors.border,
                  borderWidth: 1,
                  color: colors.text.primary
                }}
                keyboardType="numeric"
                value={formData.householdSize}
                onChangeText={(text) => setFormData(prev => ({ ...prev, householdSize: text }))}
                placeholder="Гэр бүлийн хүний тоо"
                placeholderTextColor={colors.text.light}
              />
            </View>
          </Animated.View>
        );
      case 1:
        return (
          <Animated.View style={{ opacity: fadeAnim, transform: [{ translateY: slideAnim }] }}>
            <View className="items-center mb-8">
              <Image 
                source={require('../assets/images/shower.svg')} 
                style={{ width: 150, height: 150, marginBottom: 20 }}
              />
              <Text style={{ color: colors.text.primary }} className="text-2xl font-bold mb-4">
                Шүршүүрт орох хугацаа
              </Text>
              <TextInput
                className="w-full rounded-xl px-4 py-3 mb-4"
                style={{ 
                  backgroundColor: isDarkMode ? colors.surface : colors.background,
                  borderColor: colors.border,
                  borderWidth: 1,
                  color: colors.text.primary
                }}
                keyboardType="numeric"
                value={formData.showerDuration}
                onChangeText={(text) => setFormData(prev => ({ ...prev, showerDuration: text }))}
                placeholder="Минутаар оруулна уу"
                placeholderTextColor={colors.text.light}
              />
              <TouchableOpacity
                className="w-full rounded-xl py-3 mb-4"
                style={{ backgroundColor: colors.primary }}
                onPress={() => toggleCheckbox('hasLowFlowShower')}
              >
                <Text className="text-white text-center">
                  {formData.hasLowFlowShower ? '✓ Бага урсгалтай шүршүүртэй' : 'Бага урсгалтай шүршүүртэй'}
                </Text>
              </TouchableOpacity>
            </View>
          </Animated.View>
        );
      // Add more cases for other steps...
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="flex-1 px-6 py-8">
        {renderStep()}
        
        <View className="flex-row justify-between mt-8">
          {currentStep > 0 && (
            <TouchableOpacity
              className="rounded-xl py-4 px-8"
              style={{ backgroundColor: colors.surface }}
              onPress={prevStep}
            >
              <Text style={{ color: colors.text.primary }} className="font-semibold">
                Буцах
              </Text>
            </TouchableOpacity>
          )}
          
          {currentStep < 2 ? (
            <TouchableOpacity
              className="rounded-xl py-4 px-8"
              style={{ backgroundColor: colors.primary }}
              onPress={nextStep}
            >
              <Text className="text-white font-semibold">
                Дараах
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              className="rounded-xl py-4 px-8"
              style={{ backgroundColor: colors.primary }}
              onPress={handleSubmit}
            >
              <Text className="text-white font-semibold">
                Дуусгах
              </Text>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 