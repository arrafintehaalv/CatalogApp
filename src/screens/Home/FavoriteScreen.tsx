import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../app/store';
import { Product } from '../../types/Product';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../types/Navigation';
import ProductList from '../../components/home/ProductList';

type FavoriteScreenProps = {
  navigation: NativeStackNavigationProp<HomeStackParamList, 'ProductDetails'>;
};

export default function FavoriteScreen({ navigation }: FavoriteScreenProps) {
  const favorites = useSelector(
    (state: RootState) => state.favourites.items,
  ) as Product[];

  const handlePress = useCallback(
    (item: Product) => {
      navigation.navigate('ProductDetails', { productId: item.id });
    },
    [navigation],
  );

  return <ProductList products={favorites} onPressItem={handlePress} />;
}
