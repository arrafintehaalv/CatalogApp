import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FavoriteStackParamList } from '../types/Navigation';
import ProductDetailsScreen from '../screens/Home/ProductDetailsScreen';
import FavoriteScreen from '../screens/Home/FavoriteScreen';

const Stack = createNativeStackNavigator<FavoriteStackParamList>();

export default function FavoriteStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Favorite"
        component={FavoriteScreen}
        options={{ title: 'Favorite' }}
      />
      <Stack.Screen
        name="ProductDetails"
        component={ProductDetailsScreen}
        options={{ title: 'Product Details' }}
      />
    </Stack.Navigator>
  );
}
