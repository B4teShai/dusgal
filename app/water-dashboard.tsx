import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WaterSavingTip from '../components/WaterSavingTip';
import WaterUsageCard from '../components/WaterUsageCard';

export default function WaterDashboard() {
  const waterSavingTips = [
    { tip: 'Fix leaky faucets promptly', icon: 'construct-outline' as keyof typeof Ionicons.glyphMap },
    { tip: 'Take shorter showers', icon: 'timer-outline' as keyof typeof Ionicons.glyphMap },
    { tip: 'Use water-efficient appliances', icon: 'hardware-chip-outline' as keyof typeof Ionicons.glyphMap },
  ];

  return (
    <SafeAreaView className="flex-1 bg-white">
      <ScrollView className="flex-1">
        {/* Header */}
        <View className="px-4 py-6">
          <Text className="text-3xl font-bold text-blue-600">Water Dashboard</Text>
          <Text className="text-gray-600 mt-2">Track your home water usage</Text>
        </View>

        {/* Current Usage */}
        <View className="mx-4">
          <WaterUsageCard
            title="Current Usage"
            value={120}
            unit="Liters"
            color="blue"
          />
        </View>

        {/* Usage Statistics */}
        <View className="mx-4 mt-6">
          <Text className="text-lg font-semibold text-gray-800">Usage Statistics</Text>
          <View className="flex-row justify-between mt-4">
            <View className="flex-1 mr-2">
              <WaterUsageCard
                title="Daily"
                value={120}
                unit="L"
                color="green"
              />
            </View>
            <View className="flex-1 mx-2">
              <WaterUsageCard
                title="Weekly"
                value={840}
                unit="L"
                color="purple"
              />
            </View>
            <View className="flex-1 ml-2">
              <WaterUsageCard
                title="Monthly"
                value={3600}
                unit="L"
                color="orange"
              />
            </View>
          </View>
        </View>

        {/* Water Saving Tips */}
        <View className="mx-4 mt-6 mb-8">
          <Text className="text-lg font-semibold text-gray-800">Water Saving Tips</Text>
          <View className="mt-4 space-y-3">
            {waterSavingTips.map((tip, index) => (
              <WaterSavingTip
                key={index}
                tip={tip.tip}
                icon={tip.icon}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 