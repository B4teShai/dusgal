import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Switch, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SettingsScreen() {
  const [notifications, setNotifications] = React.useState(true);
  const [darkMode, setDarkMode] = React.useState(false);
  const [dataSync, setDataSync] = React.useState(true);

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="px-4 py-6">
        <Text className="text-3xl font-bold text-blue-600">Settings</Text>
        <Text className="text-gray-600 mt-2">Customize your water tracking experience</Text>
      </View>

      <View className="px-4">
        {/* Notification Settings */}
        <View className="bg-gray-50 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="notifications-outline" size={24} color="#4b5563" />
              <Text className="text-gray-800 ml-3">Notifications</Text>
            </View>
            <Switch
              value={notifications}
              onValueChange={setNotifications}
              trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
              thumbColor={notifications ? '#2563eb' : '#9ca3af'}
            />
          </View>
        </View>

        {/* Dark Mode */}
        <View className="bg-gray-50 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="moon-outline" size={24} color="#4b5563" />
              <Text className="text-gray-800 ml-3">Dark Mode</Text>
            </View>
            <Switch
              value={darkMode}
              onValueChange={setDarkMode}
              trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
              thumbColor={darkMode ? '#2563eb' : '#9ca3af'}
            />
          </View>
        </View>

        {/* Data Sync */}
        <View className="bg-gray-50 rounded-xl p-4 mb-4">
          <View className="flex-row items-center justify-between">
            <View className="flex-row items-center">
              <Ionicons name="sync-outline" size={24} color="#4b5563" />
              <Text className="text-gray-800 ml-3">Auto Sync Data</Text>
            </View>
            <Switch
              value={dataSync}
              onValueChange={setDataSync}
              trackColor={{ false: '#d1d5db', true: '#93c5fd' }}
              thumbColor={dataSync ? '#2563eb' : '#9ca3af'}
            />
          </View>
        </View>

        {/* About Section */}
        <TouchableOpacity className="bg-gray-50 rounded-xl p-4 mb-4">
          <View className="flex-row items-center">
            <Ionicons name="information-circle-outline" size={24} color="#4b5563" />
            <Text className="text-gray-800 ml-3">About</Text>
          </View>
        </TouchableOpacity>

        {/* Help & Support */}
        <TouchableOpacity className="bg-gray-50 rounded-xl p-4">
          <View className="flex-row items-center">
            <Ionicons name="help-circle-outline" size={24} color="#4b5563" />
            <Text className="text-gray-800 ml-3">Help & Support</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
} 