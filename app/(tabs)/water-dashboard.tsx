import { useGetReportQuery } from '@/src/graphql/graphql';
import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationModal, { Notification } from '../../components/NotificationModal';
import SkiaWaterWave from '../../components/SkiaWaterWave';
import WaterSavingCertificate from '../../components/WaterSavingCertificate';
import { useTheme } from '../../src/context/ThemeContext';

// Static data for water usage
const STATIC_WATER_DATA = {
  normalUsage: 140, 
};

// Example notifications (this would come from your API)
const exampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Усны хэрэглээ их байна',
    message: 'Таны усны хэрэглээ хэвийн хэмжээнээс 20% илүү байна.',
    type: 'warning',
    timestamp: Date.now() - 3600000, // 1 hour ago
    read: false
  },
  {
    id: '2',
    title: 'Ус хадгалсан',
    message: 'Та энэ долоо хоногт 500Л ус хадгалсан байна.',
    type: 'success',
    timestamp: Date.now() - 86400000, // 1 day ago
    read: true
  },
  {
    id: '3',
    title: 'Шинэ зөвлөмж',
    message: 'Ус хадгалах 5 зөвлөмж',
    type: 'info',
    timestamp: Date.now() - 172800000, // 2 days ago
    read: true
  }
];

const WaterDashboardScreen = () => {
  const { colors } = useTheme();
  const [isError, setIsError] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>(exampleNotifications);
  const now = new Date();

  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const {data, error} = useGetReportQuery({variables: {startDate: todayMidnight.getTime(), endDate: tomorrowMidnight.getTime()}, pollInterval: 2000});

  // Show modal when component mounts
  useEffect(() => {
    setShowTipsModal(true);
  }, []);

  // Mark notification as read
  const markAsRead = (id: string) => {
    setNotifications(prev => 
      prev.map(notif => 
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  // Get unread count
  const unreadCount = notifications.filter(n => !n.read).length;

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
      {/* Notification Button */}
      <TouchableOpacity 
        className="absolute top-20 right-20 z-10 p-2 rounded-full"
        style={{ backgroundColor: colors.surface }}
        onPress={() => setShowNotifications(true)}
      >
        <View>
          <Ionicons name="notifications" size={24} color={colors.accent.blue}/>
          {unreadCount > 0 && (
            <View className="absolute -top-1 -right-1 bg-red-500 rounded-full w-5 h-5 items-center justify-center">
              <Text className="text-white text-xs">{unreadCount}</Text>
            </View>
          )}
        </View>
      </TouchableOpacity>

      {/* Water Button */}
      <TouchableOpacity 
        className="absolute top-20 right-4 z-10 p-2 rounded-full"
        style={{ backgroundColor: colors.surface }}
        onPress={() => setShowTipsModal(true)}
      >
        <Ionicons name="water" size={48} color={colors.accent.blue}/>
      </TouchableOpacity>

      {/* Water Wave Animation */}
      <View className="mb-4 h-full" style={{ backgroundColor: colors.background }}>
        <SkiaWaterWave
          currentUsage={100}
          normalUsage={STATIC_WATER_DATA.normalUsage}
        />
      </View>

      {/* Notification Modal */}
      <NotificationModal
        visible={showNotifications}
        onClose={() => setShowNotifications(false)}
        notifications={notifications}
        onMarkAsRead={markAsRead}
      />

      {/* Water Saving Certificate */}
      <WaterSavingCertificate
        visible={showTipsModal}
        onClose={() => setShowTipsModal(false)}
        savedAmount={2000}
        startDate={new Date(2024, 0, 1)} // Example start date
      />
    </SafeAreaView>
  );
};

export default WaterDashboardScreen;