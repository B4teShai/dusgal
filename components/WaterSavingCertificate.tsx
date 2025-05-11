import { ResizeMode, Video } from 'expo-av';
import React from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';

interface WaterSavingCertificateProps {
  visible: boolean;
  onClose: () => void;
  savedAmount: number;
  startDate: Date;
}

export default function WaterSavingCertificate({
  visible,
  onClose,
  savedAmount,
  startDate
}: WaterSavingCertificateProps) {
  const { colors } = useTheme();

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('mn-MN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // Add tier calculation
  const getTier = (amount: number) => {
    if (amount < 1000) return { name: 'Newbie', icon: '🌱', video: require('../public/video/fish1.mov') };
    if (amount < 10000) return { name: 'Eco Hero', icon: '🌊', video: require('../public/video/fish2.mov') };
    return { name: 'Water Legend', icon: '👑', video: require('../public/video/fish1.mov') };
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity 
        className="flex-1 items-center justify-center bg-black/50"
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity 
          activeOpacity={1} 
          onPress={(e) => e.stopPropagation()}
          className="w-4/5 h-[430px] rounded-3xl items-center overflow-hidden"
          style={{ backgroundColor: colors.surface }}
        > 
          <View className="w-full h-[240px]">
            <Video
              source={getTier(savedAmount).video}
              className="w-full h-full"
              resizeMode={ResizeMode.CONTAIN}
              isLooping
              shouldPlay
              isMuted
            />
          </View>
          
          <View className="absolute bottom-0 w-full items-center p-7" 
            style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}>
            <View className="items-center">
              <View className="flex-row items-center bg-blue-500/20 px-4 py-2 rounded-full">
                <Text className="text-2xl mr-2">{getTier(savedAmount).icon}</Text>
                <Text 
                  className="text-xl font-bold text-center"
                  style={{ color: colors.accent.blue }}
                >
                  {getTier(savedAmount).name}
                </Text>
              </View>
              <Text 
                className="text-3xl font-bold mt-4 text-center"
                style={{ color: colors.accent.blue }}
              >
                {savedAmount.toLocaleString()}L
              </Text>
              <Text 
                className="text-md mt-2 text-center"
                style={{ color: colors.text.secondary }}
              >
                ус хадгалж чадсан байна.
              </Text>
            </View>

            <View className="mt-6 w-full">
              <TouchableOpacity 
                onPress={onClose}
                className="bg-blue-500 px-4 py-3 rounded-full items-center flex-row justify-center"
              >
                <Text className="text-white font-semibold">Хаах</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
} 