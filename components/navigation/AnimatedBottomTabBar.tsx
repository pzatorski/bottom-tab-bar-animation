import { View, useWindowDimensions, StyleSheet } from 'react-native';
import React from 'react';
import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import Animated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';
import TabBarButton from './TabBarButton';

const TAB_BAR_HEIGHT = 80;
const TAB_BAR_MARGIN = 10;
const ICON_SIZE = 24;

export default function AnimatedBottomTabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps) {
  const { width } = useWindowDimensions();
  const tabBarWidth = width - 2 * TAB_BAR_MARGIN;
  const tabBarItemWidth = tabBarWidth / state.routes.length;
  const backgroundSize = tabBarItemWidth - ICON_SIZE;

  const animatedTabContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        { translateX: withTiming(tabBarItemWidth * state.index) },
      ],
    };
  });

  return (
    <View style={[styles.container, { width: tabBarWidth }]}>
      <Animated.View
        style={[
          styles.tabContainer,
          { width: tabBarItemWidth },
          animatedTabContainerStyle,
        ]}
      >
        <View
          style={[
            styles.tabItem,
            { height: backgroundSize, width: backgroundSize },
          ]}
        />
      </Animated.View>

      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        return (
          <View key={route.key} style={styles.buttonContainer}>
            <TabBarButton
              label={label.toString()}
              active={isFocused}
              onPress={onPress}
            />
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'absolute',
    bottom: 40,
    flexDirection: 'row',
    height: TAB_BAR_HEIGHT,
    borderRadius: 9999,
    overflow: 'hidden',
    backgroundColor: '#202020',
    alignItems: 'center',
    marginHorizontal: TAB_BAR_MARGIN,
  },
  tabContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabItem: {
    backgroundColor: '#363636',
    borderRadius: 9999,
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
});
