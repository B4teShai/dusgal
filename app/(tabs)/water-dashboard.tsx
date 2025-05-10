import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WaterSavingTip from '../../components/WaterSavingTip';
import WaterUsageCard from '../../components/WaterUsageCard';
import { useTheme } from '../../src/context/ThemeContext';

export default function WaterDashboardScreen() {
  const { colors } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          {/* Header Section */}
          <View className="flex-row justify-between items-center mb-6">
            <View>
              <Text 
                className="text-3xl font-bold mb-2"
                style={{ color: colors.text.primary }}
              >
                Усны Хэрэглээ
              </Text>
              <Text 
                className="text-lg"
                style={{ color: colors.text.secondary }}
              >
                Өнөөдрийн усны хэрэглээ
              </Text>
            </View>
            <TouchableOpacity 
              className="p-3 rounded-full"
              style={{ backgroundColor: colors.primary + '20' }}
            >
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
            </TouchableOpacity>
          </View>

          {/* Daily Summary Card */}
          <View 
            className="p-6 rounded-3xl mb-8"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <Text 
                className="text-xl font-semibold"
                style={{ color: colors.text.primary }}
              >
                Өнөөдрийн нийт
              </Text>
              <Text 
                className="text-2xl font-bold"
                style={{ color: colors.primary }}
              >
                120L
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text style={{ color: colors.text.secondary }}>Өнгөрсөн өдрөөс</Text>
                <Text 
                  className="text-lg font-semibold"
                  style={{ color: colors.accent.green }}
                >
                  -15%
                </Text>
              </View>
              <View className="items-center">
                <Text style={{ color: colors.text.secondary }}>Энэ сар</Text>
                <Text 
                  className="text-lg font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  2,450L
                </Text>
              </View>
            </View>
          </View>

          {/* Usage Breakdown */}
          <Text 
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text.primary }}
          >
            Хэрэглээний тайлан
          </Text>
          <View className="space-y-4 mb-8">
            <WaterUsageCard
              title="Угаалга"
              usage="45L"
              icon="shirt-outline"
              color={colors.accent.blue}
              percentage={37.5}
            />
            <WaterUsageCard
              title="Шүршүүр"
              usage="30L"
              icon="water-outline"
              color={colors.accent.purple}
              percentage={25}
            />
            <WaterUsageCard
              title="Жимс хүнс"
              usage="15L"
              icon="nutrition-outline"
              color={colors.accent.green}
              percentage={12.5}
            />
          </View>

          {/* Water Saving Tips */}
          <View className="bg-white rounded-3xl p-6 shadow-sm">
            <View className="flex-row justify-between items-center mb-4">
              <Text 
                className="text-xl font-semibold"
                style={{ color: colors.text.primary }}
              >
                Ус хэмнэх зөвлөмж
              </Text>
              <TouchableOpacity>
                <Text 
                  className="text-sm"
                  style={{ color: colors.primary }}
                >
                  Бүгдийг харах
                </Text>
              </TouchableOpacity>
            </View>
            <WaterSavingTip
              title="Угаалгын машиныг бүрэн дүүрэн ажиллуулах"
              description="Угаалгын машиныг бүрэн дүүрэн ажиллуулах нь ус хэмнэхэд тусална."
              icon="shirt-outline"
              impact="30L хэмнэх"
            />
            <WaterSavingTip
              title="Шүршүүрт бага хугацаа байх"
              description="Шүршүүрт 5-10 минут байх нь ус хэмнэхэд тусална."
              icon="water-outline"
              impact="95L хэмнэх"
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 