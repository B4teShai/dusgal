import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';
import { commonStyles } from '../src/theme';

interface WaterUsageCardProps {
  title: string;
  usage: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  percentage: number;
  backgroundColor?: string;
}

export default function WaterUsageCard({ title, usage, icon, color, percentage, backgroundColor }: WaterUsageCardProps) {
  const { colors } = useTheme();
  
  return (
    <View className={`${commonStyles.card} shadow-sm`} style={{ backgroundColor: backgroundColor || colors.surface }}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View style={{ backgroundColor: color + '15' }} className="p-2 rounded-lg">
            <Ionicons name={icon} size={24} color={color} />
          </View>
          <View className="ml-3 flex-1">
            <Text style={{ color: colors.text.primary }} className="font-medium">{title}</Text>
            <View className="flex-row items-center mt-1">
              <View style={{ backgroundColor: colors.border }} className="h-1.5 rounded-full flex-1 mr-2">
                <View 
                  className="h-1.5 rounded-full" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }} 
                />
              </View>
              <Text style={{ color: colors.text.secondary }} className="text-sm">{percentage}%</Text>
            </View>
          </View>
        </View>
        <Text style={{ color: colors.text.primary }} className="text-xl font-semibold ml-4">{usage}</Text>
      </View>
    </View>
  );
} 