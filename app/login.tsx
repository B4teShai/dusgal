import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/ThemeContext';

export default function LoginScreen() {
  const { colors, isDarkMode } = useTheme();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleSubmit = () => {
    router.replace('/(tabs)/water-dashboard');
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setEmail('');
    setPassword('');
    setName('');
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1"
      >
        <View className="flex-1 px-6 py-8">
          {/* Header */}
          <View className="items-center mb-12">
            <View 
              className="p-4 rounded-full mb-4"
              style={{ backgroundColor: isDarkMode ? colors.surface : colors.accent.blue + '20' }}
            >
              <Ionicons name="water" size={60} color={colors.primary} />
            </View>
            <Text 
              className="text-4xl font-bold mb-2"
              style={{ color: colors.text.primary }}
            >
              Усны Хэрэглээ
            </Text>
            <Text 
              className="text-lg"
              style={{ color: colors.text.secondary }}
            >
              {isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}
            </Text>
          </View>

          {/* Form */}
          <View className="space-y-4">
            {!isLogin && (
              <View>
                <Text 
                  className="mb-2 font-medium"
                  style={{ color: colors.text.primary }}
                >
                  Нэр
                </Text>
                <View 
                  className="flex-row items-center rounded-xl px-4 py-3"
                  style={{ 
                    backgroundColor: isDarkMode ? colors.surface : colors.background,
                    borderColor: colors.border,
                    borderWidth: 1,
                  }}
                >
                  <Ionicons name="person-outline" size={20} color={colors.text.secondary} />
                  <TextInput
                    className="flex-1 ml-2"
                    placeholder="Нэрээ оруулна уу"
                    placeholderTextColor={colors.text.light}
                    value={name}
                    onChangeText={setName}
                    autoCapitalize="words"
                    style={{ color: colors.text.primary }}
                  />
                </View>
              </View>
            )}

            <View>
              <Text 
                className="mb-2 font-medium"
                style={{ color: colors.text.primary }}
              >
                И-мэйл
              </Text>
              <View 
                className="flex-row items-center rounded-xl px-4 py-3"
                style={{ 
                  backgroundColor: isDarkMode ? colors.surface : colors.background,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <Ionicons name="mail-outline" size={20} color={colors.text.secondary} />
                <TextInput
                  className="flex-1 ml-2"
                  placeholder="И-мэйл хаягаа оруулна уу"
                  placeholderTextColor={colors.text.light}
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={{ color: colors.text.primary }}
                />
              </View>
            </View>

            <View>
              <Text 
                className="mb-2 font-medium"
                style={{ color: colors.text.primary }}
              >
                Нууц үг
              </Text>
              <View 
                className="flex-row items-center rounded-xl px-4 py-3"
                style={{ 
                  backgroundColor: isDarkMode ? colors.surface : colors.background,
                  borderColor: colors.border,
                  borderWidth: 1,
                }}
              >
                <Ionicons name="lock-closed-outline" size={20} color={colors.text.secondary} />
                <TextInput
                  className="flex-1 ml-2"
                  placeholder="Нууц үгээ оруулна уу"
                  placeholderTextColor={colors.text.light}
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                  style={{ color: colors.text.primary }}
                />
              </View>
            </View>

            <TouchableOpacity
              className="rounded-xl py-4 mt-8"
              style={{ backgroundColor: colors.primary }}
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх'}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity className="mt-4" onPress={toggleMode}>
              <Text 
                className="text-center font-medium"
                style={{ color: colors.primary }}
              >
                {isLogin ? 'Шинэ хэрэглэгч? Бүртгүүлэх' : 'Бүртгэлтэй юу? Нэвтрэх'}
              </Text>
            </TouchableOpacity>

            {isLogin && (
              <TouchableOpacity className="mt-2">
                <Text 
                  className="text-center font-medium"
                  style={{ color: colors.primary }}
                >
                  Нууц үгээ мартсан?
                </Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
} 