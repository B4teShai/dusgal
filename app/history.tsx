import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HistoryScreen() {
  const usageHistory = [
    { date: '2024-03-20', usage: 115, unit: 'L' },
    { date: '2024-03-19', usage: 125, unit: 'L' },
    { date: '2024-03-18', usage: 130, unit: 'L' },
    { date: '2024-03-17', usage: 120, unit: 'L' },
    { date: '2024-03-16', usage: 118, unit: 'L' },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-blue-600">Usage History</Text>
          <Text className="text-gray-600 mt-2">Track your water consumption over time</Text>
        </View>

        <View className="px-4">
          {usageHistory.map((record, index) => (
            <View
              key={index}
              className="flex-row items-center justify-between p-4 bg-gray-50 rounded-xl mb-3"
            >
              <View className="flex-row items-center">
                <Ionicons name="calendar-outline" size={20} color="#4b5563" />
                <Text className="text-gray-800 ml-2">{record.date}</Text>
              </View>
              <View className="flex-row items-center">
                <Ionicons name="water-outline" size={20} color="#2563eb" />
                <Text className="text-blue-600 font-semibold ml-2">
                  {record.usage}{record.unit}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 