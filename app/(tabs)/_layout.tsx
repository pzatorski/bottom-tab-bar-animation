import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, View, useColorScheme } from 'react-native';

import Colors from '../../constants/Colors';
import AnimatedBottomTabBar from '../../components/navigation/AnimatedBottomTabBar';
import TabBarButton from '../../components/navigation/TabBarButton';
import Icon from '../../components/Icon';

/**
 * You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
 */
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return (
    <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />
  );
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      tabBar={(props) => <AnimatedBottomTabBar {...props} />}
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          headerRight: () => (
            <Link href="/modal" asChild>
              <Pressable hitSlop={6}>
                {({ pressed }) => (
                  <View
                    style={{
                      marginRight: 16,
                      opacity: pressed ? 0.5 : 1,
                    }}
                  >
                    <Icon
                      name="information-circle"
                      size={24}
                      color={Colors[colorScheme ?? 'light'].text}
                    />
                  </View>
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="file"
        options={{
          title: 'File',
        }}
      />
      <Tabs.Screen
        name="scan"
        options={{
          title: 'Scan',
        }}
      />
      <Tabs.Screen
        name="card"
        options={{
          title: 'Card',
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
        }}
      />
    </Tabs>
  );
}
