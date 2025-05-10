import {
    Canvas,
    Path,
    Skia
} from '@shopify/react-native-skia';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../src/context/ThemeContext';

interface SkiaWaterWaveProps {
  currentUsage: number;
  normalUsage: number;
}

export default function SkiaWaterWave({ currentUsage, normalUsage }: SkiaWaterWaveProps) {
  const { colors } = useTheme();
  const [phase1, setPhase1] = useState(0);
  const [phase2, setPhase2] = useState(0);
  const [phase3, setPhase3] = useState(0);
  const { width: screenWidth, height: screenHeight } = Dimensions.get('window');
  const width = Math.max(screenWidth, 1);
  const height = Math.max(screenHeight, 1);
  const maxUsage = normalUsage / 7 * 10;

  // Calculate the wave colors based on usage
  const getWaveColors = () => {
    if (currentUsage <= normalUsage) {
      return {
        primary: colors.primary + '20',
        secondary: colors.primary + '60',
        tertiary: colors.primary + '40',
        quaternary: colors.primary + '60',
      };
    } else if (currentUsage <= maxUsage) {
      return {
        primary: '#4A90E2',  // Blue
        secondary: '#4A90E280',
        tertiary: '#4A90E240',
        quaternary: '#4A90E220',
      };
    } else {
      return {
        primary: '#1A365D',  // Dark blue
        secondary: '#1A365D80',
        tertiary: '#1A365D40',
        quaternary: '#1A365D20',
      };
    }
  };

  // Calculate the wave height based on usage
  const calculateWaveHeight = () => {
    const percentage = (currentUsage / maxUsage) * 100; // Calculate percentage relative to maxUsage
    return Math.min(Math.max(percentage, 0), 100); // Ensure percentage is between 0 and 100
  };

  // Animation loop
  useEffect(() => {
    const interval = setInterval(() => {
      setPhase1(prev => (prev + 0.1) % (Math.PI * 2));
      setPhase2(prev => (prev + 0.15) % (Math.PI * 2));
      setPhase3(prev => (prev + 0.2) % (Math.PI * 2));
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const waveColors = getWaveColors();
  const waveHeight = calculateWaveHeight();
  const baseY = height - (height * waveHeight) / 100;

  // Create multiple wave paths with different properties
  const createWavePath = (phase: number, amplitude: number, frequency: number, offset: number) => {
    const path = Skia.Path.Make();
    const waveY = baseY + offset;
    
    path.moveTo(0, waveY);

    for (let x = 0; x <= width; x += 5) {
      const y = waveY + Math.sin((x / width) * Math.PI * frequency + phase) * amplitude;
      path.lineTo(x, y);
    }

    path.lineTo(width, height);
    path.lineTo(0, height);
    path.close();

    return path;
  };

  // Create four different wave paths
  const path1 = createWavePath(phase1, 12, 1.5, 0);    // Larger amplitude, slower frequency
  const path2 = createWavePath(phase2, 8, 3, 5);      // Medium amplitude, medium frequency
  const path3 = createWavePath(phase3, 5, 4.5, 10);    // Smaller amplitude, faster frequency

  return (
    <View style={[styles.container, { height }, { backgroundColor: colors.background }]}>
      <Canvas style={StyleSheet.absoluteFill}>
        <Path
          path={path3}
          color={waveColors.primary}
          style="fill"
        />
        <Path
          path={path2}
          color={waveColors.secondary}
          style="fill"
        />
        <Path
          path={path1}
          color={waveColors.tertiary}
          style="fill"
        />
      </Canvas>
      {/* Measurement scale */}
      <View style={styles.scaleContainer}>
        {[0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1].reverse().map((multiplier) => {
          const value = Math.round(maxUsage * multiplier);
          return (
            <View key={value} style={styles.scaleItem}>
              <View style={[
                styles.scaleLine,
                multiplier % 0.5 === 0 ? styles.scaleLineMajor : styles.scaleLineDotted,
                { backgroundColor: value <= currentUsage ? '#FFFFFF' : '#666' }
              ]} />
              <Text style={[
                styles.scaleText,
                { fontSize: 12 },
                { color: value <= currentUsage ? '#FFFFFF' : colors.text.secondary },
                multiplier % 0.5 === 0 && styles.scaleTextMajor
              ]}>
                {value}L
              </Text>
            </View>
          );
        })}
      </View>
      {/* Normal usage indicator line */}
      <View
        style={[
          styles.normalLine,
          {
            bottom: `${(normalUsage / maxUsage) * 100}%`,
            backgroundColor: currentUsage >= normalUsage ? 'white' : colors.primary,
            width: 100,
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  normalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    zIndex: 1,
  },
  normalLabel: {
    position: 'absolute',
    right: 10,
    transform: [{ translateY: -10 }],
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 4,
    zIndex: 2,
  },
  normalLabelText: {
    fontSize: 12,
    fontWeight: '500',
  },
  scaleContainer: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    width: 50,
    justifyContent: 'space-between',
    paddingVertical: 10,
    zIndex: 2,
  },
  scaleItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scaleLine: {
    width: 8,
    height: 1,
    backgroundColor: '#666',
    marginRight: 5,
  },
  scaleLineMajor: {
    width: 12,
    height: 2,
    backgroundColor: '#444',
  },
  scaleLineDotted: {
    width: 12,
    height: 1,
    backgroundColor: 'transparent',
    borderStyle: 'dashed',
    borderWidth: 1,
    borderColor: '#666',
  },
  scaleText: {
    fontSize: 9,
  },
  scaleTextMajor: {
    fontSize: 10,
    fontWeight: '500',
  },
});