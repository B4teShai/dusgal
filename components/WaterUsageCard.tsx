import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface WaterUsageCardProps {
  title: string;
  value: number;
  unit: string;
  icon?: keyof typeof Ionicons.glyphMap;
  color?: string;
}

export default function WaterUsageCard({ title, value, unit, icon = 'water', color = 'blue' }: WaterUsageCardProps) {
  return (
    <View className={`p-4 bg-${color}-50 rounded-xl`}>
      <Text className={`text-lg font-semibold text-${color}-800`}>{title}</Text>
      <View className="flex-row items-center mt-2">
        <Ionicons name={icon} size={24} color={`#${color === 'blue' ? '1e40af' : color === 'green' ? '166534' : '7e22ce'}`} />
        <Text className={`text-2xl font-bold text-${color}-900 ml-2`}>{value}</Text>
        <Text className={`text-${color}-900 ml-1`}>{unit}</Text>
      </View>
    </View>
  );
} 