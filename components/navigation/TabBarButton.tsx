import { Pressable, StyleSheet } from 'react-native';
import React, { useEffect, useMemo } from 'react';
import Icon, { IconName } from '../Icon';
import Animated, {
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

const AnimatedIcon = Animated.createAnimatedComponent(Icon);

type TabBarButtonProps = {
  label: string;
  active: boolean;
  onPress: () => void;
};

export default function TabBarButton({
  label,
  active,
  onPress,
}: TabBarButtonProps) {
  const activeValue = useSharedValue(0);

  useEffect(() => {
    activeValue.value = active ? withTiming(1) : withTiming(0);
  }, [active]);

  const iconName: IconName = useMemo(() => {
    switch (label) {
      case 'Home':
        return 'home';
      case 'Scan':
        return 'viewfinder-circle';
      case 'File':
        return 'receipt-percent';
      case 'Card':
        return 'credit-card';
      case 'Profile':
        return 'user-circle';
      default:
        return 'home';
    }
  }, [label]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      color: interpolateColor(
        activeValue.value,
        [0, 1],
        ['#A6A6A6', '#FFFFFF']
      ),
    };
  });

  return (
    <Pressable style={styles.button} onPress={onPress}>
      <AnimatedIcon name={iconName} size={24} style={animatedStyle} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
