import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import Animated, {
    Easing,
    useAnimatedStyle,
    useSharedValue,
    withRepeat,
    withSequence,
    withTiming,
} from 'react-native-reanimated';
import { useTheme } from '../src/context/ThemeContext';

interface WaterWaveAnimationProps {
  currentUsage: number;
  normalUsage: number;
  maxUsage: number;
}

export default function WaterWaveAnimation({ currentUsage, normalUsage, maxUsage }: WaterWaveAnimationProps) {
  const { colors } = useTheme();
  const waveHeight = useSharedValue(0);
  const waveOffset = useSharedValue(0);

  // Calculate the wave color based on usage
  const getWaveColor = () => {
    if (currentUsage <= normalUsage) {
      return colors.accent.blue;
    } else if (currentUsage <= maxUsage) {
      return '#8B4513'; // Brown color for above normal
    } else {
      return '#ef4444'; // Red color for high usage
    }
  };

  // Calculate the wave height based on usage
  const calculateWaveHeight = () => {
    const percentage = (currentUsage / maxUsage) * 100;
    return Math.min(percentage, 100);
  };

  useEffect(() => {
    // Animate wave height
    waveHeight.value = withTiming(calculateWaveHeight(), {
      duration: 1000,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    // Animate wave offset for continuous wave effect
    waveOffset.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 2000, easing: Easing.linear }),
        withTiming(0, { duration: 2000, easing: Easing.linear })
      ),
      -1,
      true
    );
  }, [currentUsage, normalUsage, maxUsage]);

  const waveStyle = useAnimatedStyle(() => {
    return {
      height: `${waveHeight.value}%`,
      transform: [
        {
          translateX: waveOffset.value * 20,
        },
      ],
    };
  });

  return (
    <View style={styles.container}>
      {/* Normal usage indicator line */}
      <View
        style={[
          styles.normalLine,
          {
            bottom: `${(normalUsage / maxUsage) * 100}%`,
            backgroundColor: colors.accent.green,
          },
        ]}
      />
      
      {/* Animated wave */}
      <Animated.View
        style={[
          styles.wave,
          waveStyle,
          {
            backgroundColor: getWaveColor(),
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 200,
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
  },
  wave: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  normalLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    height: 2,
    zIndex: 1,
  },
}); 