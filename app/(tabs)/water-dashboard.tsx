import { useGetReportQuery } from '@/src/graphql/graphql';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import NotificationModal, { Notification } from '../../components/NotificationModal';
import SkiaWaterWave from '../../components/SkiaWaterWave';
import WaterSavingCertificate from '../../components/WaterSavingCertificate';
import { useTheme } from '../../src/context/ThemeContext';

// Static data for water usage
const STATIC_WATER_DATA = {
  normalUsage: 135, 
};

const NOTIFICATIONS_KEY = 'water_notifications';

const exampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'Усны хэрэглээ хэвийн байна.',
    message: 'Таны усны хэрэглээ өчигдрийн яг одоогийн цагтай харьцаагаар 10% илүү байна.',
    type: 'info',
    timestamp: Date.now() - 3600000, // 1 hour ago
    gif: require('../../assets/notifGif/info.gif'),
    read: false
  },
  {
    id: '2',
    title: 'Ус хадгалсан',
    message: 'Та энэ долоо хоногт 250Л ус хадгалсан байна.',
    type: 'success',
    timestamp: Date.now() - 86400000, // 1 day ago
    gif: require('../../assets/notifGif/good.gif'),
    read: true
  },
  {
    id: '3',
    title: 'Шинэ зөвлөмж',
    message: 'Ус хадгалах 5 зөвлөмж, тохиргоо цэсэнд нэмэгдлээ',
    type: 'info',
    timestamp: Date.now() - 172800000, // 2 days ago
    gif: require('../../assets/notifGif/info.gif'),
    read: true
  },
  {
    id: '4',
    title: 'Усны хэрэглээ хэтэрсэн байна',
    message: 'Таны усны хэрэглээ хэвийн байхаас 20% илүү байна.',
    type: 'warning',
    timestamp: Date.now() - 202800000, // 2 days ago
    gif: require('../../assets/notifGif/stop.gif'),
    read: true
  }
];

const WaterDashboardScreen = () => {
  const { colors } = useTheme();
  const [isError, setIsError] = useState(false);
  const [showTipsModal, setShowTipsModal] = useState(true);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const now = new Date();

  const todayMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const tomorrowMidnight = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1);
  const {data, error} = useGetReportQuery({variables: {startDate: todayMidnight.getTime(), endDate: tomorrowMidnight.getTime()}, pollInterval: 2000});

  // Load notifications from AsyncStorage on mount
  useEffect(() => {
    const loadNotifications = async () => {
      const stored = await AsyncStorage.getItem(NOTIFICATIONS_KEY);
      if (stored) {
        setNotifications(JSON.parse(stored));
      } else {
        setNotifications(exampleNotifications);
        await AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(exampleNotifications));
      }
    };
    loadNotifications();
  }, []);

  // Save notifications to AsyncStorage whenever they change
  useEffect(() => {
    AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(notifications));
  }, [notifications]);

  // Add notification helper
  const addNotification = (notif: Omit<Notification, 'id'>) => {
    const newNotif = { ...notif, id: Date.now().toString() };
    setNotifications(prev => [...prev, newNotif]);
  };

  useEffect(() => {
    setShowTipsModal(true);
    if (
      data?.getReport?.usedWater &&
      data?.getReport?.usedWater > STATIC_WATER_DATA.normalUsage &&
      data?.getReport?.usedWater < STATIC_WATER_DATA.normalUsage * 1.2
    ) {
      addNotification({
        title: 'Усны хэрэглээ хэвйин хэрэглээнээс илүү байна.',
        message: 'Таны усны хэрэглээ хэвийн байхаас хэтэрсэн байна илүү байна.',
        gif: require('../../assets/notifGif/info.gif'),
        type: 'info',
        timestamp: Date.now(),
        read: false
      });
    }
    if (
      data?.getReport?.usedWater &&
      data?.getReport?.usedWater > STATIC_WATER_DATA.normalUsage * 1.2
    ) {
      addNotification({
        title: 'Усны хэрэглээ хэтэрсэн байна.',
        message: 'Таны усны хэрэглээ хэвийн байхаас хэтэрсэн байна илүү байна.',
        gif: require('../../assets/notifGif/stop.gif'),
        type: 'warning',
        timestamp: Date.now(),
        read: false
      });
    }
  }, [data]);

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

<TouchableOpacity 
        className="absolute top-20 right-14 z-10 p-2 rounded-full shadow-md"
        style={{ backgroundColor: colors.surface, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
        onPress={() => setShowTipsModal(true)}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          style={{ width: 24, height: 24 }}
          resizeMode="contain"
        />
      </TouchableOpacity> 
      {/* Notification Button */}
      <TouchableOpacity 
        className="absolute top-20 right-2 z-10 p-2 rounded-full shadow-md"
        style={{ backgroundColor: colors.surface, width: 40, height: 40, alignItems: 'center', justifyContent: 'center' }}
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
     
      {/* Water Wave Animation */}
      <View className="mb-4 h-full" style={{ backgroundColor: colors.background }}>
        <SkiaWaterWave
          currentUsage={data?.getReport?.usedWater || 0}
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
        savedAmount={12500}
        startDate={new Date(2024, 0, 1)} // Example start date
      />
    </SafeAreaView>
  );
};

export default WaterDashboardScreen;