import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';
import { commonStyles } from '../src/theme';
interface WaterSavingTipProps {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  impact: string;
}

export default function WaterSavingTip({ title, description, icon, impact }: WaterSavingTipProps) {
  const { colors } = useTheme();
  return (
    <View className={`${commonStyles.card} shadow-sm bg-white`}>
      <View className="flex-row items-start">
        <View className="bg-sky-50 p-2 rounded-lg">
          <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <Text className="text-slate-800 font-medium mb-1">{title}</Text>
            <View className="bg-green-50 px-2 py-1 rounded-full">
              <Text className="text-green-600 text-xs font-medium">{impact}</Text>
            </View>
          </View>
          <Text className="text-slate-600 text-sm">{description}</Text>
        </View>
      </View>
    </View>
  );
} 