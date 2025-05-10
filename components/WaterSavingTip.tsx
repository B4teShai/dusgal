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
    <View className={`${commonStyles.card} shadow-sm`} style={{ backgroundColor: colors.surface }}>
      <View className="flex-row items-start">
        <View style={{ backgroundColor: colors.primary + '15' }} className="p-2 rounded-lg">
          <Ionicons name={icon} size={24} color={colors.primary} />
        </View>
        <View className="ml-3 flex-1">
          <View className="flex-row items-center justify-between">
            <Text style={{ color: colors.text.primary }} className="font-medium mb-1">{title}</Text>
            <View style={{ backgroundColor: colors.success + '15' }} className="px-2 py-1 rounded-full">
              <Text style={{ color: colors.success }} className="text-xs font-medium">{impact}</Text>
            </View>
          </View>
          <Text style={{ color: colors.text.secondary }} className="text-sm">{description}</Text>
        </View>
      </View>
    </View>
  );
} 