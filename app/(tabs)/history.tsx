import React, { useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';

const timeRanges = ['Өнөөдөр', '7 хоног', '30 хоног', '3 сар'];
const { width } = Dimensions.get('window');
const chartWidth = width - 48;

const mockData = {
  dailyUsage: {
    labels: ['Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям', 'Ням'],
    datasets: [
      {
        data: [120, 145, 130, 160, 140, 150, 135],
      },
    ],
  },
  categoryUsage: [
    {
      name: 'Угаалга',
      usage: 450,
      color: '#4CAF50',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Шүршүүр',
      usage: 300,
      color: '#2196F3',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Жимс хүнс',
      usage: 150,
      color: '#FFC107',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
    {
      name: 'Бусад',
      usage: 115,
      color: '#9C27B0',
      legendFontColor: '#7F7F7F',
      legendFontSize: 12,
    },
  ],
  hourlyUsage: {
    labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  },
};

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [selectedRange, setSelectedRange] = useState('7 хоног');

  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => colors.primary,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          {/* Header */}
          <View className="mb-8">
            <Text 
              className="text-3xl font-bold mb-2"
              style={{ color: colors.text.primary }}
            >
              Түүх
            </Text>
            <Text 
              className="text-lg"
              style={{ color: colors.text.secondary }}
            >
              Усны хэрэглээний түүх
            </Text>
          </View>

          {/* Time Range Selector */}
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            className="mb-8"
          >
            <View className="flex-row space-x-2">
              {timeRanges.map((range) => (
                <TouchableOpacity
                  key={range}
                  onPress={() => setSelectedRange(range)}
                  className={`px-4 py-2 rounded-full ${
                    selectedRange === range 
                      ? 'bg-primary' 
                      : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedRange === range
                        ? 'text-white'
                        : 'text-gray-600'
                    }`}
                  >
                    {range}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </ScrollView>

          {/* Usage Summary Card */}
          <View 
            className="p-6 rounded-3xl mb-8"
            style={{ backgroundColor: colors.primary + '15' }}
          >
            <View className="flex-row justify-between items-center mb-4">
              <View>
                <Text 
                  className="text-lg font-semibold mb-1"
                  style={{ color: colors.text.primary }}
                >
                  Дундаж хэрэглээ
                </Text>
                <Text 
                  className="text-3xl font-bold"
                  style={{ color: colors.primary }}
                >
                  145L
                </Text>
              </View>
              <View className="items-end">
                <Text 
                  className="text-lg font-semibold mb-1"
                  style={{ color: colors.text.primary }}
                >
                  Нийт хэрэглээ
                </Text>
                <Text 
                  className="text-3xl font-bold"
                  style={{ color: colors.primary }}
                >
                  1,015L
                </Text>
              </View>
            </View>
          </View>

          {/* Charts Section */}
          <View className="mb-8">
            <Text 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Графикууд
            </Text>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              snapToInterval={chartWidth + 24}
              decelerationRate="fast"
              className="space-x-6"
            >
              {/* Daily Usage Chart */}
              <View className="rounded-3xl p-6 shadow-sm" style={{ width: chartWidth, backgroundColor: colors.primary + '15' }}>
                <Text 
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.text.primary }}
                >
                  Өдөр тутмын хэрэглээ
                </Text>
                <LineChart
                  data={mockData.dailyUsage}
                  width={chartWidth - 48}
                  height={220}
                  chartConfig={chartConfig}
                  bezier
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  yAxisLabel=""
                  yAxisSuffix="L"
                />
              </View>

              {/* Category Distribution */}
              <View className="rounded-3xl p-6 shadow-sm" style={{ width: chartWidth, backgroundColor: colors.primary + '15' }}>
                <Text 
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.text.primary }}
                >
                  Хэрэглээний хуваарилалт
                </Text>
                <PieChart
                  data={mockData.categoryUsage}
                  width={chartWidth - 48}
                  height={220}
                  chartConfig={chartConfig}
                  accessor="usage"
                  backgroundColor="transparent"
                  paddingLeft="15"
                  absolute
                />
              </View>

              {/* Hourly Usage */}
              <View className="bg-white rounded-3xl p-6 shadow-sm" style={{ width: chartWidth }}>
                <Text 
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.text.primary }}
                >
                  Цагийн хэрэглээ
                </Text>
                <BarChart
                  data={mockData.hourlyUsage}
                  width={chartWidth - 48}
                  height={220}
                  chartConfig={chartConfig}
                  style={{
                    marginVertical: 8,
                    borderRadius: 16,
                  }}
                  yAxisLabel=""
                  yAxisSuffix="L"
                />
              </View>
            </ScrollView>
          </View>

          {/* Usage Breakdown */}
          <View className="rounded-3xl p-6 shadow-sm" style={{ backgroundColor: colors.primary + '15' }}>
            <Text 
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Хэрэглээний тайлан
            </Text>
            
            {/* Usage Categories */}
            <View className="space-y-4">
              {[
                { title: 'Угаалга', usage: '450L', percentage: 44.3 },
                { title: 'Шүршүүр', usage: '300L', percentage: 29.6 },
                { title: 'Жимс хүнс', usage: '150L', percentage: 14.8 },
                { title: 'Бусад', usage: '115L', percentage: 11.3 },
              ].map((item, index) => (
                <View key={index} className="space-y-2">
                  <View className="flex-row justify-between">
                    <Text style={{ color: colors.text.primary }}>{item.title}</Text>
                    <Text style={{ color: colors.text.primary }}>{item.usage}</Text>
                  </View>
                  <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View 
                      className="h-full rounded-full"
                      style={{ 
                        width: `${item.percentage}%`,
                        backgroundColor: colors.primary 
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
} 