import { useGetReportQuery } from '@/src/graphql/graphql';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRouter } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { BarChart, LineChart, PieChart } from 'react-native-chart-kit';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../../src/context/ThemeContext';
import SubscriptionModal from '../subscription';

const timeRanges = [ '7 хоног', '30 хоног', '3 сар'] as const;
type TimeRange = typeof timeRanges[number];

const { width } = Dimensions.get('window');
const chartWidth = width - 48;

interface ChartData {
  dailyUsage: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
  categoryUsage: {
    name: string;
    usage: number;
    color: string;
    legendFontColor: string;
    legendFontSize: number;
  }[];
  hourlyUsage: {
    labels: string[];
    datasets: {
      data: number[];
    }[];
  };
}

// Predefined data for each time range
const predefinedData: Record<TimeRange, ChartData> = {
  '7 хоног': {
    dailyUsage: {
      labels: ['Ням', 'Дав', 'Мяг', 'Лха', 'Пүр', 'Баа', 'Бям'],
      datasets: [
        {
          data: [85, 120, 110, 130, 125, 115, 95], // Weekend days have lower usage
        },
      ],
    },
    categoryUsage: [
      {
        name: 'Шүршүүр',
        usage: 320,
        color: '#2196F3',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Угаалга',
        usage: 280,
        color: '#4CAF50',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Гал тогоо',
        usage: 95,
        color: '#FFC107',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Бусад',
        usage: 85,
        color: '#9C27B0',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
    ],
    hourlyUsage: {
      labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
      datasets: [
        {
          data: [15, 25, 20, 18, 35, 22], // Higher usage in morning and evening
        },
      ],
    },
  },
  '30 хоног': {
    dailyUsage: {
      labels: ['11-21', '21-01', '01-11'],
      datasets: [
        {
          data: [2800, 2950, 2750], // Slightly varying usage across periods
        },
      ],
    },
    categoryUsage: [
      {
        name: 'Шүршүүр',
        usage: 3200,
        color: '#2196F3',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Угаалга',
        usage: 2800,
        color: '#4CAF50',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Гал тогоо',
        usage: 950,
        color: '#FFC107',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Бусад',
        usage: 850,
        color: '#9C27B0',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
    ],
    hourlyUsage: {
      labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
      datasets: [
        {
          data: [450, 650, 520, 480, 750, 580], // Higher usage in morning and evening
        },
      ],
    },
  },
  '3 сар': {
    dailyUsage: {
      labels: ['2-р сар', '3-р сар', '4-р сар'],
      datasets: [
        {
          data: [8500, 9200, 8800], // Seasonal variations in usage
        },
      ],
    },
    categoryUsage: [
      {
        name: 'Шүршүүр',
        usage: 9600,
        color: '#2196F3',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Угаалга',
        usage: 8400,
        color: '#4CAF50',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Гал тогоо',
        usage: 2850,
        color: '#FFC107',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
      {
        name: 'Бусад',
        usage: 2550,
        color: '#9C27B0',
        legendFontColor: '#7F7F7F',
        legendFontSize: 12,
      },
    ],
    hourlyUsage: {
      labels: ['6:00', '9:00', '12:00', '15:00', '18:00', '21:00'],
      datasets: [
        {
          data: [1350, 1950, 1560, 1440, 2250, 1740], // Consistent pattern but larger numbers
        },
      ],
    },
  },
};

// Calculate insights based on the data
const calculateInsights = (data: ChartData) => {
  const hourlyData = data.hourlyUsage.datasets[0].data;
  const maxHourIndex = hourlyData.indexOf(Math.max(...hourlyData));
  const maxHour = data.hourlyUsage.labels[maxHourIndex];
  const nextHour = data.hourlyUsage.labels[maxHourIndex + 1] || '00:00';
  
  const categoryData = data.categoryUsage;
  const showerUsage = categoryData.find(c => c.name === 'Шүршүүр')?.usage || 0;
  const laundryUsage = categoryData.find(c => c.name === 'Угаалга')?.usage || 0;
  const kitchenUsage = categoryData.find(c => c.name === 'Гал тогоо')?.usage || 0;

  return {
    peakTime: `${maxHour} - ${nextHour}`,
    peakPercentage: Math.round((hourlyData[maxHourIndex] / hourlyData.reduce((a, b) => a + b, 0)) * 100),
    showerSavings: Math.round(showerUsage * 0.6), // 60% potential savings
    laundrySavings: Math.round(laundryUsage * 0.4), // 40% potential savings
    kitchenSavings: Math.round(kitchenUsage * 0.25), // 25% potential savings
  };
};

export default function HistoryScreen() {
  const { colors } = useTheme();
  const [selectedRange, setSelectedRange] = useState<TimeRange>('7 хоног');
  const [subscriptionType, setSubscriptionType] = useState<'pro' | 'free'>('pro');
  const [showSubscription, setShowSubscription] = useState(false);
  const [activeChartIndex, setActiveChartIndex] = useState(0);
  const scrollViewRef = useRef<ScrollView>(null);
  const router = useRouter();

  // Load saved time range on component mount
  useEffect(() => {
    const loadSavedTimeRange = async () => {
      try {
        const savedRange = await AsyncStorage.getItem('selectedTimeRange');
        if (savedRange) {
          setSelectedRange(savedRange as TimeRange);
        }
      } catch (error) {
        console.error('Error loading saved time range:', error);
      }
    };

    loadSavedTimeRange();
  }, []);

  // Save time range when it changes
  const handleTimeRangeChange = async (range: TimeRange) => {
    try {
      await AsyncStorage.setItem('selectedTimeRange', range);
      setSelectedRange(range);
    } catch (error) {
      console.error('Error saving time range:', error);
    }
  };

  const now = new Date();
  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  
  // Calculate date ranges based on selection
  const getDateRange = () => {
    const endDate = todayMidnight;
    let startDate = new Date(todayMidnight);
    
    switch (selectedRange) {
      case '7 хоног':
        startDate.setDate(todayMidnight.getDate() - 6);
        break;
      case '30 хоног':
        startDate.setDate(todayMidnight.getDate() - 29);
        break;
      case '3 сар':
        startDate.setMonth(todayMidnight.getMonth() - 3);
        break;
    }
    
    return { startDate, endDate };
  };

  const { startDate, endDate } = getDateRange();
  const { data } = useGetReportQuery({
    variables: {
      startDate: startDate.getTime(),
      endDate: endDate.getTime()
    },
    pollInterval: 2000
  });

  // Calculate total and average usage
  const calculateUsage = () => {
    if (selectedRange === '7 хоног' && data?.getReport?.usedWater) {
      const total = Math.round(data.getReport.usedWater);
      return {
        total,
        average: Math.round(total / 7) // Daily average for 7 days
      };
    }

    // For 30 days and 3 months, calculate from the daily usage data
    const dailyData = predefinedData[selectedRange].dailyUsage.datasets[0].data;
    const total = dailyData.reduce((a, b) => a + b, 0);
    
    // Calculate daily average based on the time period
    const days = selectedRange === '30 хоног' ? 30 : 90; // 30 days or 90 days (3 months)
    const average = Math.round(total / days);

    return {
      total,
      average
    };
  };

  const { total, average } = calculateUsage();

  const chartConfig = {
    backgroundGradientFrom: colors.background,
    backgroundGradientTo: colors.background,
    color: (opacity = 1) => colors.primary,
    strokeWidth: 2,
    barPercentage: 0.5,
    useShadowColorFromDataset: false,
    decimalPlaces: 0,
  };

  const handleScroll = (event: any) => {
    const contentOffset = event.nativeEvent.contentOffset.x;
    const index = Math.round(contentOffset / (chartWidth + 24));
    setActiveChartIndex(index);
  };

  const scrollToChart = (index: number) => {
    scrollViewRef.current?.scrollTo({
      x: index * (chartWidth + 24),
      animated: true,
    });
  };

  const insights = calculateInsights(predefinedData[selectedRange]);

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <ScrollView className="flex-1">
        <View className="px-6 py-8">
          {/* Header */}
          <View className="mb-8">
            <View className="flex-row justify-between items-center">
              <Text
                className="text-3xl font-bold mb-2"
                style={{ color: colors.text.primary }}
              >
                Түүх
              </Text>
              <TouchableOpacity 
                className={`px-2 py-1 rounded-full flex-row items-center space-x-3 ${
                  subscriptionType === 'pro' 
                    ? 'bg-[#0ea5e915] border border-[#0ea5e9]' 
                    : 'bg-gray-100 border border-gray-200'
                }`}
                onPress={() => setShowSubscription(true)}
                activeOpacity={0.7}
              >
                <View className={`p-2 rounded-full ${
                  subscriptionType === 'pro' 
                    ? 'bg-[#0ea5e9]' 
                    : 'bg-gray-200'
                }`}>
                  <Ionicons 
                    name={subscriptionType === 'pro' ? 'star' : 'water'} 
                    size={14} 
                    color={subscriptionType === 'pro' ? 'white' : colors.text.secondary} 
                  />
                </View>
                <Text
                  className={`font-semibold text-base ${
                    subscriptionType === 'pro' ? 'text-[#0ea5e9]' : 'text-gray-600'
                  }`}
                >
                  {subscriptionType === 'pro' ? 'Pro' : 'Free'}
                </Text>
                <Ionicons 
                  name="chevron-forward" 
                  size={16} 
                  color={subscriptionType === 'pro' ? colors.primary : colors.text.secondary} 
                />
              </TouchableOpacity>
            </View>
            {subscriptionType === 'free' && (
              <Text className="text-sm text-gray-500 mt-2">
                Upgrade to Pro for detailed usage analysis and personalized insights
              </Text>
            )}
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
                  onPress={() => handleTimeRangeChange(range as TimeRange)}
                  className={`px-4 py-2 rounded-full ${
                    selectedRange === range
                      ? 'bg-[#0ea5e915]'
                      : 'bg-gray-100'
                  }`}
                >
                  <Text
                    className={`font-medium ${
                      selectedRange === range
                        ? 'text-[#0ea5e9]'
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
                  {average}L
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
                  {total}L
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
              Мэдээлэл
            </Text>
            {subscriptionType === 'free' ? (
              <View className="rounded-3xl p-6 shadow-sm items-center justify-center" style={{ width: chartWidth, backgroundColor: colors.primary + '15', height: 300 }}>
                <View className="bg-[#0ea5e915] p-4 rounded-full mb-4">
                  <Ionicons name="lock-closed" size={32} color={colors.primary} />
                </View>
                <Text className="text-lg font-semibold mb-2" style={{ color: colors.text.primary }}>
                  Pro хувилбарт шилжих
                </Text>
                <Text className="text-sm text-gray-500 text-center mb-4">
                  Дэлгэрэнгүй мэдээлэл, график болон шинжилгээг харахын тулд Pro хувилбарт шилжинэ үү
                </Text>
                <TouchableOpacity
                  onPress={() => setShowSubscription(true)}
                  className="bg-[#0ea5e9] px-6 py-3 rounded-full"
                >
                  <Text className="text-white font-semibold">Pro болох</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <>
                <ScrollView
                  ref={scrollViewRef}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled
                  snapToInterval={chartWidth + 24}
                  decelerationRate="fast"
                  className="space-x-6"
                  onScroll={handleScroll}
                  scrollEventThrottle={16}
                >
                  {/* Daily Usage Chart */}
                  <View className="rounded-3xl p-6 shadow-sm" style={{ width: chartWidth, backgroundColor: colors.primary + '15' }}>
                    <Text
                      className="text-lg font-semibold mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      {selectedRange === '3 сар' 
                        ? 'Сарын хэрэглээ' 
                        : selectedRange === '30 хоног'
                        ? '10 хоногийн хэрэглээ'
                        : 'Өдөр тутмын хэрэглээ'}
                    </Text>
                    <LineChart
                      data={predefinedData[selectedRange].dailyUsage}
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
                      data={predefinedData[selectedRange].categoryUsage}
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
                  <View className="rounded-3xl p-6 shadow-sm" style={{ width: chartWidth, backgroundColor: colors.primary + '15' }}>
                    <Text
                      className="text-lg font-semibold mb-4"
                      style={{ color: colors.text.primary }}
                    >
                      Цагийн хэрэглээ
                    </Text>
                    <BarChart
                      data={predefinedData[selectedRange].hourlyUsage}
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

                {/* Pagination Dots */}
                <View className="flex-row justify-center items-center mt-4 space-x-2">
                  {[0, 1, 2].map((index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => scrollToChart(index)}
                      className={`w-2 h-2 rounded-full ${
                        activeChartIndex === index
                          ? 'bg-[#0ea5e9]'
                          : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </View>
              </>
            )}
          </View>

          {/* Usage Breakdown */}
          <View className="rounded-3xl p-6 shadow-sm mb-8" style={{ backgroundColor: colors.primary + '15' }}>
            <Text
              className="text-xl font-semibold mb-4"
              style={{ color: colors.text.primary }}
            >
              Хэрэглээний тайлан
            </Text>

            {subscriptionType === 'free' ? (
              <View className="items-center justify-center py-8">
                <View className="bg-[#0ea5e915] p-4 rounded-full mb-4">
                  <Ionicons name="lock-closed" size={32} color={colors.primary} />
                </View>
                <Text className="text-lg font-semibold mb-2" style={{ color: colors.text.primary }}>
                  Pro хувилбарт шилжих
                </Text>
                <Text className="text-sm text-gray-500 text-center mb-4">
                  Дэлгэрэнгүй тайлан, хэрэглээний дэлгэрэнгүй мэдээллийг харахын тулд Pro хувилбарт шилжинэ үү
                </Text>
                <TouchableOpacity
                  onPress={() => setShowSubscription(true)}
                  className="bg-[#0ea5e9] px-6 py-3 rounded-full"
                >
                  <Text className="text-white font-semibold">Pro болох</Text>
                </TouchableOpacity>
              </View>
            ) : (
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
            )}
          </View>

          {/* Insights and Suggestions */}
          {subscriptionType === 'free' ? (
            <View>

            </View>
          ) : (
            <View className="rounded-3xl p-6 shadow-sm mb-8" style={{ 
              backgroundColor: colors.primary + '15',
              shadowColor: colors.primary,
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: 0.1,
              shadowRadius: 12,
              elevation: 5
            }}>
              <View className="flex-row items-center justify-between mb-6">
                <View>
                  <Text
                    className="text-xl font-semibold mb-1"
                    style={{ color: colors.text.primary }}
                  >
                    Ухаалгаар хэрэглэх
                  </Text>
                  <Text className="text-sm text-gray-500">
                    Усыг хэмнэх зөвлөмж
                  </Text>
                </View>
                <View className="bg-[#0ea5e915] p-2 rounded-full">
                  <Ionicons name="water" size={20} color={colors.primary} />
                </View>
              </View>
  
              {/* Peak Usage Time */}
              <View className="mb-6">
                <View className="flex-row items-center mb-3">
                  <View className="bg-[#0ea5e915] p-2 rounded-full mr-2">
                    <Ionicons name="time" size={20} color={colors.primary} />
                  </View>
                  <View>
                    <Text className="font-semibold" style={{ color: colors.text.primary }}>
                      Идэвхтэй цаг
                    </Text>
                    <Text className="text-xs text-gray-500">Хамгийн их ус хэрэглэдэг цаг</Text>
                  </View>
                </View>
                <View className="bg-white rounded-2xl p-4" style={{
                  shadowColor: colors.primary,
                  shadowOffset: { width: 0, height: 2 },
                  shadowOpacity: 0.1,
                  shadowRadius: 8,
                  elevation: 3
                }}>
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-gray-600">Өмнөх өдрийн хамгийн их хэрэглээ</Text>
                    <View className="bg-[#0ea5e915] px-3 py-1 rounded-full">
                      <Text className="text-sm font-medium" style={{ color: colors.primary }}>{insights.peakPercentage}%</Text>
                    </View>
                  </View>
                  <Text className="text-2xl font-bold mb-1" style={{ color: colors.primary }}>{insights.peakTime}</Text>
                  <Text className="text-sm text-gray-500 mb-2">Оройн цагт их хэрэглэдэг</Text>
                  <View className="h-1 bg-gray-100 rounded-full mt-2">
                    <View 
                      className="h-full rounded-full"
                      style={{
                        width: `${insights.peakPercentage}%`,
                        backgroundColor: colors.primary,
                      }}
                    />
                  </View>
                </View>
              </View>
  
              {/* Water Saving Tips */}
              <View>
                <View className="flex-row items-center mb-3">
                  <View className="bg-[#0ea5e915] p-2 rounded-full mr-2">
                    <Ionicons name="leaf" size={20} color={colors.primary} />
                  </View>
                  <View>
                    <Text className="font-semibold" style={{ color: colors.text.primary }}>
                      Хэмнэлтийн зөвлөмж
                    </Text>
                    <Text className="text-xs text-gray-500">Усыг хэмнэх арга замууд</Text>
                  </View>
                </View>
                <View className="space-y-3">
                  <View className="bg-white rounded-2xl p-4" style={{
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3
                  }}>
                    <View className="flex-row items-start">
                      <View className="bg-[#0ea5e915] p-2 rounded-full mr-3">
                        <Ionicons name="water" size={20} color={colors.primary} />
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold mb-1" style={{ color: colors.text.primary }}>
                          Шүршүүрт богино хугацаагаар орох
                        </Text>
                        <Text className="text-sm text-gray-600 mb-2">
                          5 минут орвол {insights.showerSavings}L ус хэмнэнэ
                        </Text>
                        <View className="flex-row items-center">
                          <View className="h-1 flex-1 bg-gray-100 rounded-full mr-2">
                            <View 
                              className="h-full rounded-full"
                              style={{
                                width: '60%',
                                backgroundColor: colors.primary,
                              }}
                            />
                          </View>
                          <Text className="text-xs text-gray-500">60% хэмнэлт</Text>
                        </View>
                      </View>
                    </View>
                  </View>
  
                  <View className="bg-white rounded-2xl p-4" style={{
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3
                  }}>
                    <View className="flex-row items-start">
                      <View className="bg-[#0ea5e915] p-2 rounded-full mr-3">
                        <Ionicons name="water" size={20} color={colors.primary} />
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold mb-1" style={{ color: colors.text.primary }}>
                          Угаалга дүүрэн хийх
                        </Text>
                        <Text className="text-sm text-gray-600 mb-2">
                          Нэг удаагийн угаалгаас {insights.laundrySavings}L ус хэмнэнэ
                        </Text>
                        <View className="flex-row items-center">
                          <View className="h-1 flex-1 bg-gray-100 rounded-full mr-2">
                            <View 
                              className="h-full rounded-full"
                              style={{
                                width: '40%',
                                backgroundColor: colors.primary,
                              }}
                            />
                          </View>
                          <Text className="text-xs text-gray-500">40% хэмнэлт</Text>
                        </View>
                      </View>
                    </View>
                  </View>
  
                  <View className="bg-white rounded-2xl p-4" style={{
                    shadowColor: colors.primary,
                    shadowOffset: { width: 0, height: 2 },
                    shadowOpacity: 0.1,
                    shadowRadius: 8,
                    elevation: 3
                  }}>
                    <View className="flex-row items-start">
                      <View className="bg-[#0ea5e915] p-2 rounded-full mr-3">
                        <Ionicons name="leaf" size={20} color={colors.primary} />
                      </View>
                      <View className="flex-1">
                        <Text className="font-semibold mb-1" style={{ color: colors.text.primary }}>
                          Ургамал услах цагийг сонгох
                        </Text>
                        <Text className="text-sm text-gray-600 mb-2">
                          Оройн цагт услах нь {insights.kitchenSavings}L ус хэмнэнэ
                        </Text>
                        <View className="flex-row items-center">
                          <View className="h-1 flex-1 bg-gray-100 rounded-full mr-2">
                            <View 
                              className="h-full rounded-full"
                              style={{
                                width: '25%',
                                backgroundColor: colors.primary,
                              }}
                            />
                          </View>
                          <Text className="text-xs text-gray-500">25% хэмнэлт</Text>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )}
        </View>
      </ScrollView>

      <SubscriptionModal 
        visible={showSubscription}
        onClose={() => setShowSubscription(false)}
        currentSubscription={subscriptionType}
      />
    </SafeAreaView>
  );
}
