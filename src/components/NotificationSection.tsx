import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../context/ThemeContext';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  timestamp: string;
}

interface NotificationSectionProps {
  notifications: Notification[];
  onClose?: (id: string) => void;
}

export default function NotificationSection({ notifications, onClose }: NotificationSectionProps) {
  const { colors } = useTheme();

  const getIconForType = (type: Notification['type']): keyof typeof Ionicons.glyphMap => {
    switch (type) {
      case 'warning':
        return 'warning-outline';
      case 'info':
        return 'information-circle-outline';
      case 'success':
        return 'checkmark-circle-outline';
      default:
        return 'notifications-outline';
    }
  };

  const getColorForType = (type: Notification['type']): string => {
    switch (type) {
      case 'warning':
        return colors.accent.purple;
      case 'info':
        return colors.accent.blue;
      case 'success':
        return colors.accent.green;
      default:
        return colors.primary;
    }
  };

  return (
    <View className="absolute top-0 left-0 right-0 z-50">
      <ScrollView 
        className="max-h-96"
        showsVerticalScrollIndicator={false}
      >
        {notifications.map((notification) => (
          <View
            key={notification.id}
            className="mx-4 my-2 p-4 rounded-2xl"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row items-start justify-between">
              <View className="flex-row items-start flex-1">
                <View 
                  className="p-2 rounded-full mr-3"
                  style={{ backgroundColor: getColorForType(notification.type) + '20' }}
                >
                  <Ionicons 
                    name={getIconForType(notification.type)} 
                    size={24} 
                    color={getColorForType(notification.type)} 
                  />
                </View>
                <View className="flex-1">
                  <Text 
                    className="text-lg font-semibold mb-1"
                    style={{ color: colors.text.primary }}
                  >
                    {notification.title}
                  </Text>
                  <Text 
                    className="text-base mb-2"
                    style={{ color: colors.text.secondary }}
                  >
                    {notification.message}
                  </Text>
                  <Text 
                    className="text-sm"
                    style={{ color: colors.text.secondary }}
                  >
                    {notification.timestamp}
                  </Text>
                </View>
              </View>
              {onClose && (
                <TouchableOpacity 
                  onPress={() => onClose(notification.id)}
                  className="p-2"
                >
                  <Ionicons 
                    name="close" 
                    size={20} 
                    color={colors.text.secondary} 
                  />
                </TouchableOpacity>
              )}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
} 