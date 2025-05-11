import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/ThemeContext';

interface TipCard {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  savings: string;
  category: 'daily' | 'kitchen' | 'bathroom' | 'laundry';
}

const waterSavingTips: TipCard[] = [
  {
    icon: 'water-outline',
    title: 'Шүршүүрт орох',
    description: 'Шүршүүрт 5-10 минут орж, ус хаах үед саван угаах',
    savings: '100-150 литр',
    category: 'bathroom'
  },
  {
    icon: 'brush-outline',
    title: 'Шүд угаах',
    description: 'Шүд угаах үед ус хаах, аяга ашиглан ус цэвэрлэх',
    savings: '10-15 литр',
    category: 'bathroom'
  },
  {
    icon: 'restaurant-outline',
    title: 'Аяга таваг угаах',
    description: 'Аяга таваг угаахын өмнө үлдэгдэл хоолыг цэвэрлэх, ус хаах',
    savings: '20-30 литр',
    category: 'kitchen'
  },
  {
    icon: 'cafe-outline',
    title: 'Цэвэр ус хадгалах',
    description: 'Хөргөгчөөр цэвэр ус хадгалах, хүйтэн ус ашиглах',
    savings: '5-10 литр',
    category: 'kitchen'
  },
  {
    icon: 'leaf-outline',
    title: 'Цэцэг услах',
    description: 'Цэцэг услахдаа үлдэгдэл ус ашиглах, өглөө эрт услах',
    savings: '2-3 литр',
    category: 'daily'
  },
  {
    icon: 'car-outline',
    title: 'Машин угаах',
    description: 'Машин угаахдаа сав ашиглах, ус хаах',
    savings: '150-200 литр',
    category: 'daily'
  },
  {
    icon: 'shirt-outline',
    title: 'Хувцас угаах',
    description: 'Хувцас угаахдаа бүрэн ачаалалттай угаах',
    savings: '50-100 литр',
    category: 'laundry'
  }
];

const TipCard: React.FC<{ tip: TipCard }> = ({ tip }) => {
  const { colors } = useTheme();
  
  return (
    <View className="p-4 rounded-2xl mb-4" style={{ backgroundColor: colors.primary + '15' }}>
      <View className="flex-row items-start">
        <View 
          className="w-12 h-12 rounded-full items-center justify-center mr-4"
          style={{ backgroundColor: colors.primary + '20' }}
        >
          <Ionicons name={tip.icon} size={24} color={colors.primary} />
        </View>
        <View className="flex-1">
          <Text 
            className="text-lg font-semibold mb-1"
            style={{ color: colors.text.primary }}
          >
            {tip.title}
          </Text>
          <Text 
            className="text-base mb-2"
            style={{ color: colors.text.secondary }}
          >
            {tip.description}
          </Text>
          <View className="flex-row items-center">
            <Ionicons name="water" size={16} color={colors.primary} />
            <Text 
              className="ml-1 font-medium"
              style={{ color: colors.primary }}
            >
              {tip.savings} хэмнэх
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default function WaterSavingGuideScreen() {
  const { colors } = useTheme();
  const router = useRouter();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.background }}>
      <View className="flex-1">
        {/* Header */}
        <View className="px-6 py-4 border-b" style={{ borderColor: colors.border }}>
          <View className="flex-row items-center">
            <TouchableOpacity 
              onPress={() => router.back()}
              className="p-2 rounded-full mr-4"
              style={{ backgroundColor: colors.primary + '15' }}
            >
              <Ionicons name="arrow-back" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text 
              className="text-2xl font-bold"
              style={{ color: colors.text.primary }}
            >
              Ус хэмнэх зөвлөмж
            </Text>
          </View>
        </View>

        <ScrollView className="flex-1 px-6 py-4">
          <View className="mb-6">
            <Text 
              className="text-lg mb-2"
              style={{ color: colors.text.secondary }}
            >
              Өдөр бүр хийх үйлдлүүд
            </Text>
            {waterSavingTips
              .filter(tip => tip.category === 'daily')
              .map((tip, index) => (
                <TipCard key={index} tip={tip} />
              ))}
          </View>

          <View className="mb-6">
            <Text 
              className="text-lg mb-2"
              style={{ color: colors.text.secondary }}
            >
              Гал тогооны зөвлөмж
            </Text>
            {waterSavingTips
              .filter(tip => tip.category === 'kitchen')
              .map((tip, index) => (
                <TipCard key={index} tip={tip} />
              ))}
          </View>

          <View className="mb-6">
            <Text 
              className="text-lg mb-2"
              style={{ color: colors.text.secondary }}
            >
              Угаалгын өрөөний зөвлөмж
            </Text>
            {waterSavingTips
              .filter(tip => tip.category === 'bathroom')
              .map((tip, index) => (
                <TipCard key={index} tip={tip} />
              ))}
          </View>

          <View className="mb-6">
            <Text 
              className="text-lg mb-2"
              style={{ color: colors.text.secondary }}
            >
              Хувцас угаах зөвлөмж
            </Text>
            {waterSavingTips
              .filter(tip => tip.category === 'laundry')
              .map((tip, index) => (
                <TipCard key={index} tip={tip} />
              ))}
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
} 