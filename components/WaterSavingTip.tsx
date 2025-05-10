import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';

interface WaterSavingTipProps {
  tip: string;
  icon?: keyof typeof Ionicons.glyphMap;
}

export default function WaterSavingTip({ tip, icon = 'bulb' }: WaterSavingTipProps) {
  return (
    <View className="bg-gray-50 p-4 rounded-xl flex-row items-center">
      <Ionicons name={icon} size={20} color="#4b5563" />
      <Text className="text-gray-800 ml-2 flex-1">{tip}</Text>
    </View>
  );
} 