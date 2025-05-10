import { useGetReportQuery } from '@/src/graphql/graphql';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import SkiaWaterWave from '../../components/SkiaWaterWave';
import { useTheme } from '../../src/context/ThemeContext';

// Static data for water usage
const STATIC_WATER_DATA = {
  normalUsage: 140, 
};

export default function WaterDashboardScreen() {
  const { colors, isDarkMode } = useTheme();
  const [isError, setIsError] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(false);
  const now = new Date();

const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
const tomorrowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const {data, error} = useGetReportQuery({variables: {startDate: todayMidnight.getTime(), endDate: tomorrowMidnight.getTime()}, pollInterval: 2000});
  console.log(data, error);
  // Update current usage every minute
  useEffect(() => {
    
  }, []);

  if (isError) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: colors.text.primary }}>Error updating water usage</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {/* Star Button */}
      <TouchableOpacity 
        className="absolute top-20 right-4 z-10 p-2 rounded-full"
        style={{ backgroundColor: colors.surface }}
        onPress={() => setShowTipsModal(true)}
      >
        <Ionicons name="star" size={24} color={colors.accent.blue} />
      </TouchableOpacity>

      {/* Water Wave Animation */}
      <View className="mb-4 h-full" style={{ backgroundColor: colors.background }}>
        <SkiaWaterWave
          currentUsage={data?.getReport.usedWater || 0}
          normalUsage={STATIC_WATER_DATA.normalUsage}
        />
      </View>

      {/* Tips Modal */}
      <Modal
        visible={showTipsModal}
        transparent
        animationType="slide"
        onRequestClose={() => setShowTipsModal(false)}
      >
        <View className="flex-1 justify-end">
          <View 
            className="h-2/3 rounded-t-3xl p-6"
            style={{ backgroundColor: colors.surface }}
          >
            <View className="flex-row justify-between items-center mb-6">
              <Text 
                className="text-2xl font-bold"
                style={{ color: colors.text.primary }}
              >
                Water Saving Tips
              </Text>
              <TouchableOpacity 
                onPress={() => setShowTipsModal(false)}
                className="p-2"
              >
                <Ionicons name="close" size={24} color={colors.text.secondary} />
              </TouchableOpacity>
            </View>

            <View className="space-y-4">
              <View className="p-4 rounded-xl" style={{ backgroundColor: colors.primary + '10' }}>
                <Text 
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  Fix Leaks
                </Text>
                <Text style={{ color: colors.text.secondary }}>
                  A dripping faucet can waste up to 20 gallons of water per day. Check and fix any leaks in your home.
                </Text>
              </View>

              <View className="p-4 rounded-xl" style={{ backgroundColor: colors.primary + '10' }}>
                <Text 
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  Shorter Showers
                </Text>
                <Text style={{ color: colors.text.secondary }}>
                  Reduce your shower time by 2 minutes to save up to 10 gallons of water per shower.
                </Text>
              </View>

              <View className="p-4 rounded-xl" style={{ backgroundColor: colors.primary + '10' }}>
                <Text 
                  className="text-lg font-semibold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  Full Loads Only
                </Text>
                <Text style={{ color: colors.text.secondary }}>
                  Run your dishwasher and washing machine only when they are full to maximize water efficiency.
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}