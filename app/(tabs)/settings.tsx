import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ScrollView, Switch, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';

type IconName = keyof typeof Ionicons.glyphMap;

interface SettingItemProps {
  icon: IconName;
  title: string;
  value?: React.ReactNode;
  onPress?: () => void;
  showArrow?: boolean;
}

const SettingItem: React.FC<SettingItemProps> = ({ 
  icon, 
  title, 
  value, 
  onPress = () => {}, 
  showArrow = true 
}) => {
  const { colors } = useTheme();
  
  return (
    <TouchableOpacity 
      className="flex-row items-center justify-between py-4"
      onPress={onPress}
    >
      <View className="flex-row items-center">
        <View 
          className="w-10 h-10 rounded-full items-center justify-center mr-3"
          style={{ backgroundColor: colors.primary + '15' }}
        >
          <Ionicons name={icon} size={20} color={colors.primary} />
        </View>
        <Text 
          className="text-lg"
          style={{ color: colors.text.primary }}
        >
          {title}
        </Text>
      </View>
      <View className="flex-row items-center">
        {value && (
          <Text 
            className="mr-2"
            style={{ color: colors.text.secondary }}
          >
            {value}
          </Text>
        )}
        {showArrow && (
          <Ionicons 
            name="chevron-forward" 
            size={20} 
            color={colors.text.secondary} 
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default function SettingsScreen() {
  const { colors, isDarkMode, toggleDarkMode } = useTheme();
  const [notifications, setNotifications] = React.useState(true);
  const [isEditingPhone, setIsEditingPhone] = useState(false);
  const [phoneNumber, setPhoneNumber] = useState('9911-1111');
  const router = useRouter();

  const handleSavePhone = () => {
    // Here you would typically save to backend
    setIsEditingPhone(false);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          {/* Header */}
          <View className="mb-8">
            <Text 
              className="text-3xl font-bold mb-2"
              style={{ color: colors.text.primary }}
            >
              Тохиргоо
            </Text>
          </View>

          {/* Profile Section */}
          <View className="rounded-3xl p-6 shadow-sm mb-8" style={{ backgroundColor: colors.primary + '15' }}>
            <View className="items-center mb-6">
              <View 
                className="w-24 h-24 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: colors.primary + '15' }}
              >
                <Ionicons name="water" size={48} color={colors.primary} />
              </View>
              <Text 
                className="text-xl font-semibold mb-1"
                style={{ color: colors.text.primary }}
              >
                Усны тоолуур
              </Text>
              <Text 
                className="text-base mb-2"
                style={{ color: colors.text.secondary }}
              >
                ID: WTM-2024-001
              </Text>
              <View className="flex-row items-center">
                <Ionicons name="phone-portrait-outline" size={16} color={colors.text.secondary} />
                {isEditingPhone ? (
                  <View className="flex-row items-center ml-2">
                    <TextInput
                      value={phoneNumber}
                      onChangeText={setPhoneNumber}
                      className="text-base px-2 py-1 rounded-lg"
                      style={{ 
                        backgroundColor: colors.background,
                        color: colors.text.primary,
                        borderWidth: 1,
                        borderColor: colors.border
                      }}
                      keyboardType="phone-pad"
                    />
                    <TouchableOpacity 
                      onPress={handleSavePhone}
                      className="ml-2 p-2 rounded-full"
                      style={{ backgroundColor: colors.primary + '20' }}
                    >
                      <Ionicons name="checkmark" size={20} color={colors.primary} />
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity 
                    onPress={() => setIsEditingPhone(true)}
                    className="flex-row items-center ml-2"
                  >
                    <Text 
                      className="text-base mr-2"
                      style={{ color: colors.text.secondary }}
                    >
                      {phoneNumber}
                    </Text>
                    <Ionicons name="create-outline" size={16} color={colors.text.secondary} />
                  </TouchableOpacity>
                )}
              </View>
            </View>

            <View className="space-y-3">
              <View className="flex-row items-center justify-between p-3 rounded-xl" 
                style={{ backgroundColor: colors.primary + '10' }}>
                <View className="flex-row items-center">
                  <Ionicons name="hardware-chip-outline" size={20} color={colors.primary} />
                  <Text 
                    className="ml-2 text-base"
                    style={{ color: colors.text.primary }}
                  >
                    Төхөөрөмж
                  </Text>
                </View>
                <Text 
                  className="text-base"
                  style={{ color: colors.text.secondary }}
                >
                  Smart Water Meter Pro
                </Text>
              </View>

              <View className="flex-row items-center justify-between p-3 rounded-xl" 
                style={{ backgroundColor: colors.primary + '10' }}>
                <View className="flex-row items-center">
                  <Ionicons name="location-outline" size={20} color={colors.primary} />
                  <Text 
                    className="ml-2 text-base"
                    style={{ color: colors.text.primary }}
                  >
                    Байршил
                  </Text>
                </View>
                <Text 
                  className="text-base"
                  style={{ color: colors.text.secondary }}
                >
                  СБД, 1-р хороо
                </Text>
              </View>

              <View className="flex-row items-center justify-between p-3 rounded-xl" 
                style={{ backgroundColor: colors.primary + '10' }}>
                <View className="flex-row items-center">
                  <Ionicons name="calendar-outline" size={20} color={colors.primary} />
                  <Text 
                    className="ml-2 text-base"
                    style={{ color: colors.text.primary }}
                  >
                    Суулгасан огноо
                  </Text>
                </View>
                <Text 
                  className="text-base"
                  style={{ color: colors.text.secondary }}
                >
                  2024.01.15
                </Text>
              </View>
            </View>
          </View>

          {/* Water Saving Guidance Section */}
          <View className="rounded-3xl p-6 shadow-sm mb-8" style={{ backgroundColor: colors.primary + '15' }}>
            <Text 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Ус хэмнэх зөвлөмж
            </Text>

            <View className="space-y-4">
              <View className="flex-row items-start">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3 mt-1"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Ionicons name="water-outline" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text 
                    className="text-base font-medium mb-1"
                    style={{ color: colors.text.primary }}
                  >
                    Шүршүүрт орох
                  </Text>
                  <Text 
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    Шүршүүрт 5-10 минут орж, 100-150 литр ус хэмнэх
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3 mt-1"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Ionicons name="brush-outline" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text 
                    className="text-base font-medium mb-1"
                    style={{ color: colors.text.primary }}
                  >
                    Шүд угаах
                  </Text>
                  <Text 
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    Шүд угаах үед ус хаах, 10-15 литр ус хэмнэх
                  </Text>
                </View>
              </View>

              <View className="flex-row items-start">
                <View 
                  className="w-10 h-10 rounded-full items-center justify-center mr-3 mt-1"
                  style={{ backgroundColor: colors.primary + '15' }}
                >
                  <Ionicons name="restaurant-outline" size={20} color={colors.primary} />
                </View>
                <View className="flex-1">
                  <Text 
                    className="text-base font-medium mb-1"
                    style={{ color: colors.text.primary }}
                  >
                    Аяга таваг угаах
                  </Text>
                  <Text 
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    Аяга таваг угаахын өмнө үлдэгдэл хоолыг цэвэрлэх, 20-30 литр ус хэмнэх
                  </Text>
                </View>
              </View>

              <TouchableOpacity 
                className="flex-row items-center justify-center py-3 rounded-xl mt-2"
                style={{ backgroundColor: colors.primary + '15' }}
                onPress={() => router.push('/water-saving-guide')}
              >
                <Ionicons name="book-outline" size={20} color={colors.primary} />
                <Text 
                  className="ml-2 font-medium"
                  style={{ color: colors.primary }}
                >
                  Дэлгэрэнгүй зөвлөмж үзэх
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Preferences Section */}
          <View className="rounded-3xl p-6 shadow-sm mb-8" style={{ backgroundColor: colors.primary + '15' }}>
            <Text 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Тохиргоо
            </Text>

            <View className="space-y-2">
              <SettingItem
                icon="notifications-outline"
                title="Мэдэгдэл"
                value={
                  <Switch
                    value={notifications}
                    onValueChange={setNotifications}
                    trackColor={{ false: '#767577', true: colors.primary + '50' }}
                    thumbColor={notifications ? colors.primary : '#f4f3f4'}
                  />
                }
                showArrow={false}
              />
              <SettingItem
                icon="moon-outline"
                title="Харанхуй горим"
                value={
                  <Switch
                    value={isDarkMode}
                    onValueChange={toggleDarkMode}
                    trackColor={{ false: '#767577', true: colors.primary + '50' }}
                    thumbColor={isDarkMode ? colors.primary : '#f4f3f4'}
                  />
                }
                showArrow={false}
              />
              <SettingItem
                icon="language-outline"
                title="Хэл"
                value="Монгол"
              />
              <SettingItem
                icon="water-outline"
                title="Усны хэмжээ"
                value="Литр"
              />
            </View>
          </View>

          {/* App Settings Section */}
          <View className="rounded-3xl p-6 shadow-sm mb-8" style={{ backgroundColor: colors.primary + '15' }}>

            <View className="space-y-2">
              <SettingItem
                icon="information-circle-outline"
                title="Тусламж"
                value={undefined}
              />
              <SettingItem
                icon="shield-checkmark-outline"
                title="Нууцлал"
                value={undefined}
              />
              <SettingItem
                icon="document-text-outline"
                title="Үйлчилгээний нөхцөл"
                value={undefined}
              />
            </View>
          </View>

          {/* Logout Button */}
          <TouchableOpacity 
            className="flex-row items-center justify-center py-4 rounded-xl"
            style={{ backgroundColor: colors.error + '15' }}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text 
              className="ml-2 font-medium"
              style={{ color: colors.error }}
            >
              Гарах
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 