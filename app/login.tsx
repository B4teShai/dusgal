import { useLoginMutation } from '@/src/graphql/graphql';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAuth } from '../src/context/AuthContext';
import { useTheme } from '../src/context/ThemeContext';

export default function LoginScreen() {
  const { colors, isDarkMode } = useTheme();
  const { login } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [phoneNo, setPhoneNo] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loginMutation, { loading, error }] = useLoginMutation();

  const handleSubmit = async () => {
    try {
      if (isLogin) {
        if (!phoneNo || !password) {
          Alert.alert('Алдаа', 'Бүх талбарыг бөглөнө үү');
          return;
        }

        const response = await loginMutation({
          variables: {
            phoneNo,
            password
          }
        }).catch(error => {
          console.log('Login mutation error:', error);
          if (error.networkError) {
            console.log('Network error details:', error.networkError);
          }
          if (error.graphQLErrors) {
            console.log('GraphQL errors:', error.graphQLErrors);
          }
          throw error;
        });

        if (response.data?.login) {
          const { token } = response.data.login;
          await login(token);
        } else {
          Alert.alert('Алдаа', 'Утасны дугаар эсвэл нууц үг буруу байна');
        }
      } else {
        // Registration logic
        if (!name || !phoneNo || !password) {
          Alert.alert('Алдаа', 'Бүх талбарыг бөглөнө үү');
          return;
        }

        // TODO: Implement registration mutation
        Alert.alert('Алдаа', 'Бүртгүүлэх боломжгүй байна');
      }
    } catch (error) {
      console.log('Login error:', error);
      Alert.alert('Алдаа', 'Алдаа гарлаа. Дараа дахин оролдоно уу');
    }
  };

  const toggleMode = () => {
    setIsLogin(!isLogin);
    setPhoneNo('');
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
                Утасны дугаар
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
                  placeholder="Утасны дугаараа оруулна уу"
                  placeholderTextColor={colors.text.light}
                  value={phoneNo}
                  onChangeText={setPhoneNo}
                  keyboardType="phone-pad"
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
                  secureTextEntry={!showPassword}
                  style={{ color: colors.text.primary }}
                />
                <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
                  <Ionicons 
                    name={showPassword ? "eye-off-outline" : "eye-outline"} 
                    size={20} 
                    color={colors.text.secondary} 
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              className="rounded-xl py-4 mt-8"
              style={{ backgroundColor: colors.primary }}
              onPress={handleSubmit}
              disabled={loading}
            >
              <Text className="text-white text-center font-semibold text-lg">
                {loading ? 'Түр хүлээнэ үү...' : (isLogin ? 'Нэвтрэх' : 'Бүртгүүлэх')}
              </Text>
            </TouchableOpacity>

            {error && (
              <Text className="text-red-500 text-center mt-2">
                {error.message}
              </Text>
            )}

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