import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Text, View } from 'react-native';
import { commonStyles } from '../src/theme';

interface WaterUsageCardProps {
  title: string;
  usage: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  percentage: number;
}

export default function WaterUsageCard({ title, usage, icon, color, percentage }: WaterUsageCardProps) {
  return (
    <View className={`${commonStyles.card} shadow-sm bg-white`}>
      <View className="flex-row items-center justify-between">
        <View className="flex-row items-center flex-1">
          <View className="bg-sky-50 p-2 rounded-lg">
            <Ionicons name={icon} size={24} color={color} />
          </View>
          <View className="ml-3 flex-1">
            <Text className="text-slate-800 font-medium">{title}</Text>
            <View className="flex-row items-center mt-1">
              <View className="h-1.5 bg-slate-100 rounded-full flex-1 mr-2">
                <View 
                  className="h-1.5 rounded-full" 
                  style={{ 
                    width: `${percentage}%`,
                    backgroundColor: color,
                  }} 
                />
              </View>
              <Text className="text-slate-500 text-sm">{percentage}%</Text>
            </View>
          </View>
        </View>
        <Text className="text-xl font-semibold text-slate-900 ml-4">{usage}</Text>
      </View>
    </View>
  );
} 