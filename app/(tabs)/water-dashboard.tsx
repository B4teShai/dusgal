import { useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationSection from '../../components/NotificationSection';
import WaterSavingTip from '../../components/WaterSavingTip';
import WaterUsageCard from '../../components/WaterUsageCard';
import { useTheme } from '../../src/context/ThemeContext';
import { GET_DAILY_SUMMARY, GET_NOTIFICATIONS, GET_WATER_SAVING_TIPS, GET_WATER_USAGE } from '../../src/graphql/queries';

export default function WaterDashboardScreen() {
  const { colors, isDarkMode } = useTheme();
  const [showNotifications, setShowNotifications] = useState(false);
  
  const { data: dailySummary, loading: dailyLoading } = useQuery(GET_DAILY_SUMMARY);
  const { data: waterUsage, loading: usageLoading } = useQuery(GET_WATER_USAGE);
  const { data: savingTips, loading: tipsLoading } = useQuery(GET_WATER_SAVING_TIPS);
  const { data: notificationsData, loading: notificationsLoading } = useQuery(GET_NOTIFICATIONS);

  const handleCloseNotification = (id: string) => {
    // Here you would typically call a mutation to mark the notification as read
    console.log('Close notification:', id);
  };

  if (dailyLoading || usageLoading || tipsLoading || notificationsLoading) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
        <View className="flex-1 items-center justify-center">
          <Text style={{ color: colors.text.primary }}>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      {showNotifications && notificationsData?.notifications && (
        <NotificationSection
          notifications={notificationsData.notifications}
          onClose={handleCloseNotification}
        />
      )}
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
              className="p-3 rounded-full relative"
              style={{ backgroundColor: colors.primary + '20' }}
              onPress={() => setShowNotifications(!showNotifications)}
            >
              <Ionicons name="notifications-outline" size={24} color={colors.primary} />
              {notificationsData?.notifications?.length > 0 && (
                <View 
                  className="absolute -top-1 -right-1 w-5 h-5 rounded-full items-center justify-center"
                  style={{ backgroundColor: colors.accent.blue }}
                >
                  <Text className="text-xs text-white font-bold">
                    {notificationsData.notifications.length}
                  </Text>
                </View>
              )}
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
                {dailySummary?.dailySummary.total}L
              </Text>
            </View>
            <View className="flex-row justify-between">
              <View className="items-center">
                <Text style={{ color: colors.text.secondary }}>Өнгөрсөн өдрөөс</Text>
                <Text 
                  className="text-lg font-semibold"
                  style={{ color: colors.accent.green }}
                >
                  {dailySummary?.dailySummary.previousDayChange}%
                </Text>
              </View>
              <View className="items-center">
                <Text style={{ color: colors.text.secondary }}>Энэ сар</Text>
                <Text 
                  className="text-lg font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  {dailySummary?.dailySummary.monthlyTotal}L
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
          <View className={`space-y-4 mb-8 rounded-3xl p-6 shadow-sm ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`} style={{ backgroundColor: colors.primary + '15' }}>
            {waterUsage?.waterUsage.map((usage: any) => (
              <WaterUsageCard
                key={usage.id}
                title={usage.type}
                usage={`${usage.amount}L`}
                icon={getIconForType(usage.type)}
                color={getColorForType(usage.type, colors)}
                backgroundColor={colors.primary + '15'}
                percentage={calculatePercentage(usage.amount, dailySummary?.dailySummary.total)}
              />
            ))}
          </View>

          {/* Water Saving Tips */}
           <Text 
            className="text-xl font-semibold mb-4"
            style={{ color: colors.text.primary }}
          >
            Ус хэмнэх зөвлөмж
          </Text>
          <View className="rounded-3xl p-6 shadow-sm" style={{ backgroundColor: colors.primary + '15' }}>
            <View className="flex-row justify-between items-center mb-4">
              <TouchableOpacity>
                <Text 
                  className="text-sm"
                  style={{ color: colors.primary }}
                >
                  Бүгдийг харах
                </Text>
              </TouchableOpacity>
            </View>
            {savingTips?.waterSavingTips.map((tip: any) => (
              <WaterSavingTip
                key={tip.id}
                title={tip.title}
                description={tip.description}
                icon={tip.icon}
                impact={tip.impact}
              />
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function getIconForType(type: string): keyof typeof Ionicons.glyphMap {
  const icons: { [key: string]: keyof typeof Ionicons.glyphMap } = {
    'Угаалга': 'shirt-outline',
    'Шүршүүр': 'water-outline',
    'Жимс хүнс': 'nutrition-outline',
  };
  return icons[type] || 'water-outline';
}

function getColorForType(type: string, colors: any): string {
  const colorMap: { [key: string]: string } = {
    'Угаалга': colors.accent.blue,
    'Шүршүүр': colors.accent.purple,
    'Жимс хүнс': colors.accent.green,
  };
  return colorMap[type] || colors.primary;
}

function calculatePercentage(amount: number, total: number): number {
  return Math.round((amount / total) * 100);
} 