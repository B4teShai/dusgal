import { Ionicons } from '@expo/vector-icons';
import React, { useRef, useState } from 'react';
import { Dimensions, FlatList, Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTheme } from '../src/context/ThemeContext';

const { width } = Dimensions.get('window');
const CARD_WIDTH = width - 48;
const CARD_SPACING = 16;

const subscriptionPlans = [
  {
    name: 'Pro',
    price: '5,900₮',
    period: 'сараар',
    features: [
      'Дэлгэрэнгүй хэрэглээний шинжилгээ',
      'Хувийн зөвлөмж',
      'Хэрэглээний ангилал',
      'Дэвшилтэт мэдээлэл харуулах',
      'Хувийн зөвлөгөө',
      'Тэргүүлэх тусламж',
    ],
    icon: 'star-outline',
    color: '#0EA5E9',
    popular: true,
  },
  {
    name: 'Үнэгүй',
    price: '0₮',
    period: '',
    features: [
      'Үндсэн усны хэрэглээний мэдээлэл',
      'Энгийн график, диаграмм',
      'Үндсэн статистик мэдээлэл',
      'Усны тоолуур төхөөрөмжийн дэмжлэг',
    ],
    icon: 'water-outline',
    color: '#9CA3AF',
  },
];

const paymentHistory = [
  {
    month: '2024-03',
    amount: 45000,
    status: 'Төлөгдсөн',
    date: '2024-03-15',
    usage: 12.5, // m³
  },
  {
    month: '2024-02',
    amount: 38000,
    status: 'Төлөгдсөн',
    date: '2024-02-14',
    usage: 10.2,
  },
  {
    month: '2024-01',
    amount: 42000,
    status: 'Төлөгдсөн',
    date: '2024-01-16',
    usage: 11.8,
  },
];

interface SubscriptionModalProps {
  visible: boolean;
  onClose: () => void;
  currentSubscription: 'pro' | 'free';
}

export default function SubscriptionModal({ visible, onClose, currentSubscription }: SubscriptionModalProps) {
  const { colors } = useTheme();
  const [activeIndex, setActiveIndex] = useState(currentSubscription === 'pro' ? 0 : 1);
  const flatListRef = useRef<FlatList>(null);

  const renderPlanCard = ({ item: plan, index }: { item: typeof subscriptionPlans[0], index: number }) => (
    <View
      style={{
        width: CARD_WIDTH,
        marginRight: index === subscriptionPlans.length - 1 ? 0 : CARD_SPACING,
      }}
    >
      <TouchableOpacity
        className={`rounded-3xl p-6 ${
          plan.popular ? 'border-2 border-[#0EA5E9]' : 'border border-gray-200'
        }`}
        style={{ backgroundColor: colors.background }}
      >
        {plan.popular && (
          <View className="absolute -top-3 left-1/2 transform -translate-x-1/2">
            <View className="bg-[#0EA5E9] px-4 py-1 rounded-full">
              <Text className="text-white text-sm font-medium p-1">Хамгийн хамгийн</Text>
            </View>
          </View>
        )}
        
        <View className="flex-row items-center justify-between mb-4">
          <View className="flex-row items-center space-x-3">
            <View
              className="w-12 h-12 rounded-full items-center justify-center"
              style={{ backgroundColor: plan.color + '15' }}
            >
              <Ionicons name={plan.icon as keyof typeof Ionicons.glyphMap} size={24} color={plan.color} />
            </View>
            <View>
              <Text
                className="text-xl font-bold"
                style={{ color: colors.text.primary }}
              >
                {plan.name}
              </Text>
              <Text
                className="text-sm"
                style={{ color: colors.text.secondary }}
              >
                {plan.period}
              </Text>
            </View>
          </View>
          <Text
            className="text-2xl font-bold"
            style={{ color: colors.text.primary }}
          >
            {plan.price}
          </Text>
        </View>

        <View className="space-y-3">
          {plan.features.map((feature, featureIndex) => (
            <View key={featureIndex} className="flex-row items-center space-x-3">
              <Ionicons
                name="checkmark-circle"
                size={20}
                color={plan.color}
              />
              <Text
                className="text-base"
                style={{ color: colors.text.primary }}
              >
                {feature}
              </Text>
            </View>
          ))}
        </View>

        <TouchableOpacity
          className={`mt-6 py-3 rounded-full ${
            plan.popular
              ? 'bg-[#0EA5E9]'
              : 'bg-gray-100'
          }`}
        >
          <Text
            className={`text-center font-semibold ${
              plan.popular
                ? 'text-white'
                : 'text-gray-600'
            }`}
          >
            {plan.name === 'Үнэгүй' 
              ? (currentSubscription === 'free' ? 'Одоогийн төлөвлөгөө' : 'Үнэгүй болгох')
              : (currentSubscription === 'pro' ? 'Одоогийн төлөвлөгөө' : 'Pro болгох')}
          </Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
      style={{ padding: 10 }}
    >
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <SafeAreaView style={{ flex: 1 }}>
          {/* Close Button - Fixed Position */}
          <View className="absolute right-6 top-14 z-50">
            <TouchableOpacity
              onPress={onClose}
              className="w-10 h-10 items-center justify-center rounded-full bg-gray-100"
              style={{ 
                elevation: 5, 
                shadowColor: '#000', 
                shadowOffset: { width: 0, height: 2 }, 
                shadowOpacity: 0.25, 
                shadowRadius: 3.84,
              }}
              activeOpacity={0.7}
            >
              <Ionicons name="close" size={24} color={colors.text.secondary} />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1">
            <View className="px-6 pt-16 pb-8">
              {/* Header */}
              <View className="mb-8">
                <Text
                  className="text-3xl font-bold mb-2"
                  style={{ color: colors.text.primary }}
                >
                  Төлбөр
                </Text>
                <Text
                  className="text-base text-gray-500"
                  style={{ color: colors.text.secondary }}
                >
                  Өөрийн хэрэгцээнд тохирсон төлөвлөгөөг сонгоно уу
                </Text>
              </View>

              {/* Current Bill Status */}
              {currentSubscription === 'pro' && (
              <View className="mb-8 p-6 rounded-3xl" style={{ backgroundColor: colors.primary + '15' }}>
                <Text
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.text.primary }}
                >
                  Одоогийн төлбөр
                </Text>
                <View className="flex-row justify-between items-center mb-4">
                  <View>
                    <Text
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      Энэ сарын хэрэглээ
                    </Text>
                    <Text
                      className="text-2xl font-bold"
                      style={{ color: colors.text.primary }}
                    >
                      15.2 м³
                    </Text>
                  </View>
                  <View className="items-end">
                    <Text
                      className="text-sm"
                      style={{ color: colors.text.secondary }}
                    >
                      Төлөх дүн
                    </Text>
                    <Text
                      className="text-2xl font-bold"
                      style={{ color: colors.primary }}
                    >
                      52,000₮
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  className="bg-[#0EA5E9] py-3 rounded-full"
                >
                  <Text className="text-white text-center font-semibold">
                    Төлбөр төлөх
                  </Text>
                </TouchableOpacity>
              </View>
              )}
{/* Payment History */}
<View className="mb-8">
                <Text
                  className="text-lg font-semibold mb-4"
                  style={{ color: colors.text.primary }}
                >
                  Төлбөрийн түүх
                </Text>
                {currentSubscription === 'pro' ? (
                  <View className="space-y-4">
                  {paymentHistory.map((payment, index) => (
                    <View
                      key={index}
                      className="flex-row justify-between items-center p-4 rounded-2xl border border-gray-200"
                    >
                      <View>
                        <Text
                          className="text-base font-medium mb-1"
                          style={{ color: colors.text.primary }}
                        >
                          {payment.month}
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: colors.text.secondary }}
                        >
                          {payment.usage} м³
                        </Text>
                      </View>
                      <View className="items-end">
                        <Text
                          className="text-base font-medium mb-1"
                          style={{ color: colors.text.primary }}
                        >
                          {payment.amount.toLocaleString()}₮
                        </Text>
                        <Text
                          className="text-sm"
                          style={{ color: colors.text.secondary }}
                        >
                          {payment.date}
                        </Text>
                      </View>
                    </View>
                  ))}
                </View>
              ) : (
                <View>
                  <Text>Төлбөрийн түүх үүсээгүй байна</Text>
                </View>
              )}
              </View>

              {/* Subscription Plans Carousel */}
              <View className="mb-8">
                <FlatList
                  ref={flatListRef}
                  data={subscriptionPlans}
                  renderItem={renderPlanCard}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  snapToInterval={CARD_WIDTH + CARD_SPACING}
                  decelerationRate="fast"
                  onMomentumScrollEnd={(event) => {
                    const index = Math.round(
                      event.nativeEvent.contentOffset.x / (CARD_WIDTH + CARD_SPACING)
                    );
                    setActiveIndex(index);
                  }}
                  contentContainerStyle={{
                    paddingRight: 24,
                  }}
                />
                
                {/* Pagination Dots */}
                <View className="flex-row justify-center items-center mt-4 space-x-2">
                  {subscriptionPlans.map((_, index) => (
                    <View
                      key={index}
                      className={`w-2 h-2 rounded-full ${
                        index === activeIndex ? 'bg-[#0EA5E9]' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </View>
              </View>

              {/* Additional Info */}
              <View className="mt-4 space-y-4">
                <Text
                  className="text-lg font-semibold"
                  style={{ color: colors.text.primary }}
                >
                  Pro болох давуу талууд
                </Text>
                <View className="space-y-3">
                  <View className="flex-row items-start space-x-3">
                    <Ionicons
                      name="analytics"
                      size={24}
                      color={colors.primary}
                    />
                    <View className="flex-1">
                      <Text
                        className="text-base font-medium mb-1"
                        style={{ color: colors.text.primary }}
                      >
                        Дэвшилтэт шинжилгээ
                      </Text>
                      <Text
                        className="text-sm"
                        style={{ color: colors.text.secondary }}
                      >
                        Усны хэрэглээний дэлгэрэнгүй мэдээлэл, хувийн зөвлөмж авах боломжтой.
                      </Text>
                    </View>
                  </View>
                  <View className="flex-row items-start space-x-3">
                    <Ionicons
                      name="trending-up"
                      size={24}
                      color={colors.primary}
                    />
                    <View className="flex-1">
                      <Text
                        className="text-base font-medium mb-1"
                        style={{ color: colors.text.primary }}
                      >
                        Хэрэглээний ангилал
                      </Text>
                      <Text
                        className="text-sm"
                        style={{ color: colors.text.secondary }}
                      >
                        Усны хэрэглээг автоматаар ангилж, сайжруулах талбаруудыг тодорхойлох.
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </View>
    </Modal>
  );
} 