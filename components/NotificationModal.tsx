import { Ionicons } from '@expo/vector-icons';
import React, { useEffect, useRef, useState } from 'react';
import { Animated, Image, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'warning' | 'info' | 'success';
  gif: any;
  timestamp: number;
  read: boolean;
}

interface NotificationModalProps {
  visible: boolean;
  onClose: () => void;
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
}

const formatTime = (timestamp: number) => {
  const now = Date.now();
  const diff = now - timestamp;
  
  if (diff < 3600000) { // Less than 1 hour
    const minutes = Math.floor(diff / 60000);
    return `${minutes}м`;
  } else if (diff < 86400000) { // Less than 1 day
    const hours = Math.floor(diff / 3600000);
    return `${hours}ц`;
  } else {
    const days = Math.floor(diff / 86400000);
    return `${days}х`;
  }
};

const getNotificationColor = (type: Notification['type']) => {
  switch (type) {
    case 'warning':
      return '#FF4444';
    case 'success':
      return '#4CAF50';
    case 'info':
      return '#2196F3';
  }
};

export default function NotificationModal({ 
  visible, 
  onClose, 
  notifications, 
  onMarkAsRead 
}: NotificationModalProps) {
  const { colors } = useTheme();
  const slideAnim = useRef(new Animated.Value(300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [selectedNotification, setSelectedNotification] = useState<Notification | null>(null);
  const detailSlideAnim = useRef(new Animated.Value(300)).current;

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }),
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
    } else {
      Animated.parallel([
        Animated.spring(slideAnim, {
          toValue: 300,
          useNativeDriver: true,
          tension: 50,
          friction: 7
        }),
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true
        })
      ]).start();
      setSelectedNotification(null);
    }
  }, [visible]);

  useEffect(() => {
    if (selectedNotification) {
      Animated.spring(detailSlideAnim, {
        toValue: 0,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }).start();
    } else {
      Animated.spring(detailSlideAnim, {
        toValue: 300,
        useNativeDriver: true,
        tension: 50,
        friction: 7
      }).start();
    }
  }, [selectedNotification]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const handleNotificationPress = (notification: Notification) => {
    setSelectedNotification(notification);
    onMarkAsRead(notification.id);
  };

  const renderDetailView = () => {
    if (!selectedNotification) return null;
    const notificationColor = getNotificationColor(selectedNotification.type);

    return (
      <Animated.View 
        className="absolute inset-0"
        style={{ 
          transform: [{ translateX: detailSlideAnim }],
          backgroundColor: colors.surface,
          height: '100%',
          width: '100%'
        }}
      >
        <View className="p-3 border-b flex-row items-center" 
          style={{ borderColor: colors.border }}>
          <TouchableOpacity 
            onPress={() => setSelectedNotification(null)}
            className="p-1.5 rounded-full mr-2"
            style={{ backgroundColor: colors.background }}
          >
            <Ionicons name="arrow-back" size={16} color={colors.text.primary} />
          </TouchableOpacity>
          <Text className="text-base font-medium" style={{ color: colors.text.primary }}>
            Дэлгэрэнгүй
          </Text>
        </View>

        <ScrollView className="flex-1" style={{ maxHeight: 384 }}>
          <View className="p-3">
            <View className="flex-row items-center mb-3">
              <View className="w-8 h-8 rounded-full items-center justify-center mr-3"
                style={{ backgroundColor: `${notificationColor}20` }}>
                {selectedNotification.type === 'warning' && (
                  <Ionicons name="warning" size={18} color={notificationColor} />
                )}
                {selectedNotification.type === 'success' && (
                  <Ionicons name="checkmark-circle" size={18} color={notificationColor} />
                )}
                {selectedNotification.type === 'info' && (
                  <Ionicons name="information-circle" size={18} color={notificationColor} />
                )}
              </View>
              <View>
                <Text className="text-base font-medium" style={{ color: colors.text.primary }}>
                  {selectedNotification.title}
                </Text>
                <Text className="text-xs" style={{ color: colors.text.secondary }}>
                  {formatTime(selectedNotification.timestamp)}
                </Text>
              </View>
            </View>

            <View className="p-3 rounded-lg mb-3" 
              style={{ backgroundColor: `${notificationColor}10` }}>
              <Text className="text-sm" style={{ color: colors.text.primary }}>
                {selectedNotification.message}
              </Text>
            </View>

            {selectedNotification.gif && (
              <View className="items-center mb-3">
                <Image
                  source={selectedNotification.gif}
                  style={{ width: 200, height: 200, borderRadius: 12 }}
                  resizeMode="contain"
                />
              </View>
            )}

            {selectedNotification.type === 'warning' && (
              <View className="p-2 rounded-lg bg-red-50">
                <Text className="text-xs text-red-600">
                  Энэ мэдэгдэл нь чухал мэдээлэл агуулж байна.
                </Text>
              </View>
            )}
          </View>
        </ScrollView>
      </Animated.View>
    );
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="none"
      onRequestClose={onClose}
    >
      <Animated.View 
        className="flex-1"
        style={{ 
          backgroundColor: 'rgba(0,0,0,0.5)',
          opacity: fadeAnim
        }}
      >
        <Animated.View 
          className="absolute top-20 right-4 w-72 rounded-2xl overflow-hidden"
          style={{ 
            backgroundColor: colors.surface,
            transform: [{ translateX: slideAnim }],
            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
          }}
        >
          <View className="p-3 border-b flex-row justify-between items-center" 
            style={{ borderColor: colors.border }}>
            <View className="flex-row items-center">
              <Ionicons name="notifications" size={20} color={colors.accent.blue} />
              {unreadCount > 0 && (
                <View className="bg-blue-500 rounded-full px-2 py-0.5 ml-2">
                  <Text className="text-white text-xs font-semibold">
                    {unreadCount}
                  </Text>
                </View>
              )}
            </View>
            <TouchableOpacity 
              onPress={onClose}
              className="p-1.5 rounded-full"
              style={{ backgroundColor: colors.background }}
            >
              <Ionicons name="close" size={16} color={colors.text.primary} />
            </TouchableOpacity>
          </View>
          
          <ScrollView className="max-h-96">
            {notifications.length === 0 ? (
              <View className="p-6 items-center">
                <View className="w-12 h-12 rounded-full items-center justify-center mb-3"
                  style={{ backgroundColor: colors.background }}>
                  <Ionicons name="notifications-off" size={24} color={colors.text.secondary} />
                </View>
                <Text className="text-base" style={{ color: colors.text.secondary }}>
                  Мэдэгдэл байхгүй
                </Text>
              </View>
            ) : (
              notifications.map((notification) => {
                const notificationColor = getNotificationColor(notification.type);
                return (
                  <TouchableOpacity
                    key={notification.id}
                    className={`p-3 border-b ${!notification.read ? 'bg-blue-50' : ''}`}
                    style={{ 
                      borderColor: colors.border,
                      borderLeftWidth: 3,
                      borderLeftColor: notificationColor
                    }}
                    onPress={() => handleNotificationPress(notification)}
                  >
                    <View className="flex-row items-start">
                      <View className="w-8 h-8 rounded-full items-center justify-center mr-3"
                        style={{ backgroundColor: `${notificationColor}20` }}>
                        {notification.type === 'warning' && (
                          <Ionicons name="warning" size={18} color={notificationColor} />
                        )}
                        {notification.type === 'success' && (
                          <Ionicons name="checkmark-circle" size={18} color={notificationColor} />
                        )}
                        {notification.type === 'info' && (
                          <Ionicons name="information-circle" size={18} color={notificationColor} />
                        )}
                      </View>
                      <View className="flex-1">
                        <Text className="text-base font-medium mb-0.5" 
                          style={{ color: colors.text.primary }}>
                          {notification.title}
                        </Text>
                        <Text className="text-xs" style={{ color: colors.text.secondary }}>
                          {formatTime(notification.timestamp)}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                );
              })
            )}
          </ScrollView>

          {renderDetailView()}
        </Animated.View>
      </Animated.View>
    </Modal>
  );
} 