import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/Home/MapScreen';
import HomeStack from './HomeStack';
import { Home, Heart, Map } from '../components/svg';
import FavoriteStack from './FavoriteStack';

export type TabParamList = {
  Home: undefined;
  Favorite: undefined;
  Map: undefined;
};

const Tab = createBottomTabNavigator<TabParamList>();

function renderTabBarIcon(
  routeName: keyof TabParamList,
  color: string,
  size: number,
) {
  switch (routeName) {
    case 'Home':
      return <Home color={color} size={size} />;
    case 'Favorite':
      return <Heart color={color} size={size} />;
    case 'Map':
      return <Map color={color} size={size} />;
    default:
      return null;
  }
}

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) =>
          renderTabBarIcon(route.name as keyof TabParamList, color, size),
        tabBarActiveTintColor: '#1d4ed8',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Favorite"
        component={FavoriteStack}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{ headerShown: true }}
      />
    </Tab.Navigator>
  );
}
