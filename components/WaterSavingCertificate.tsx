import { Ionicons } from '@expo/vector-icons';
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
          className="w-4/5 h-[500px] rounded-3xl items-center overflow-hidden"
          style={{ backgroundColor: colors.surface }}
        > 
          <View className="w-full h-[240px]">
            <Video
              source={require('../public/video/fish1.mov')}
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
              <Ionicons name="ribbon" size={48} color={colors.accent.blue} />
              <Text 
                className="text-3xl font-bold mt-4 text-center"
                style={{ color: colors.text.primary }}
              >
                Баяр хүргэе!
              </Text>
              <Text 
                className="text-xl mt-2 text-center"
                style={{ color: colors.text.secondary }}
              >
                {formatDate(startDate)}-с хойш
              </Text>
              <Text 
                className="text-4xl font-bold mt-2 text-center"
                style={{ color: colors.accent.blue }}
              >
                {savedAmount.toLocaleString()}Л
              </Text>
              <Text 
                className="text-lg mt-1 text-center"
                style={{ color: colors.text.secondary }}
              >
                ус хадгалж байна.
              </Text>
            </View>

            <View className="mt-6 w-full">
              <TouchableOpacity 
                onPress={onClose}
                className="bg-blue-500 px-8 py-3 rounded-full items-center"
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