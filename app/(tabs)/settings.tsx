import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Switch, Text, TouchableOpacity, View } from 'react-native';
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
            <Text 
              className="text-lg"
              style={{ color: colors.text.secondary }}
            >
              Апп-ын тохиргоо
            </Text>
          </View>

          {/* Profile Section */}
          <View className="bg-white rounded-3xl p-6 shadow-sm mb-8">
            <View className="items-center mb-6">
              <View 
                className="w-24 h-24 rounded-full items-center justify-center mb-4"
                style={{ backgroundColor: colors.primary + '15' }}
              >
                <Ionicons name="person" size={48} color={colors.primary} />
              </View>
              <Text 
                className="text-xl font-semibold mb-1"
                style={{ color: colors.text.primary }}
              >
                Бат-Эрдэнэ
              </Text>
              <Text 
                className="text-base"
                style={{ color: colors.text.secondary }}
              >
                bat.erdene@example.com
              </Text>
            </View>

            <TouchableOpacity 
              className="flex-row items-center justify-center py-3 rounded-xl"
              style={{ backgroundColor: colors.primary + '15' }}
            >
              <Ionicons name="create-outline" size={20} color={colors.primary} />
              <Text 
                className="ml-2 font-medium"
                style={{ color: colors.primary }}
              >
                Профайл засах
              </Text>
            </TouchableOpacity>
          </View>

          {/* Preferences Section */}
          <View className="bg-white rounded-3xl p-6 shadow-sm mb-8">
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
          <View className="bg-white rounded-3xl p-6 shadow-sm mb-8">
            <Text 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Апп-ын тохиргоо
            </Text>

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