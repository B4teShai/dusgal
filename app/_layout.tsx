import { ApolloProvider } from '@apollo/client';
import { Stack } from 'expo-router';
import React from 'react';
import { useColorScheme } from 'react-native';
import { AuthProvider } from '../src/context/AuthContext';
import { ThemeProvider } from '../src/context/ThemeContext';
import { client } from '../src/lib/apollo-client';

export default function RootLayout() {
  const colorScheme = useColorScheme();

  return (
    <ApolloProvider client={client}>
      <ThemeProvider>
        <AuthProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          />
        </AuthProvider>
      </ThemeProvider>
    </ApolloProvider>
  );
}
