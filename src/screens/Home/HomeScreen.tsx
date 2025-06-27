import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useGetProductsQuery } from '../../api/api';
import ProductList from '../../components/home/ProductList';
import { Product } from '../../types/Product';
import { HomeStackParamList } from '../../types/Navigation';

const PAGE_SIZE = 10;

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp<HomeStackParamList>>();

  const [skip, setSkip] = useState(0);
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingMore, setLoadingMore] = useState(false);

  const { data, error, isLoading, isFetching } = useGetProductsQuery({
    limit: PAGE_SIZE,
    skip,
  });

  const handleLoadMore = () => {
    if (!loadingMore && !isFetching && data && products.length < data.total) {
      setLoadingMore(true);
      setSkip(prev => prev + PAGE_SIZE);
    }
  };

  useEffect(() => {
    if (data?.products) {
      if (skip === 0) {
        setProducts(data.products);
      } else {
        setProducts(prev => {
          const ids = new Set(prev.map(p => p.id));
          const newItems = data.products.filter(p => !ids.has(p.id));
          return [...prev, ...newItems];
        });
      }
    }
  }, [data, skip]);

  useEffect(() => {
    if (!isFetching) {
      setLoadingMore(false);
    }
  }, [isFetching]);

  const handlePress = useCallback(
    (item: Product) => {
      navigation.navigate('ProductDetails', { productId: item.id });
    },
    [navigation],
  );

  if (isLoading && skip === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1d4ed8" />
      </View>
    );
  }

  if (error && skip === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load products</Text>
      </View>
    );
  }

  return (
    <>
      <ProductList
        products={products}
        onPressItem={handlePress}
        onEndReached={handleLoadMore}
        isFetching={isFetching}
      />
      {isFetching && skip > 0 && (
        <View style={styles.loadingMore}>
          <ActivityIndicator size="small" color="#1d4ed8" />
        </View>
      )}
    </>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  loadingMore: {
    paddingVertical: 16,
    alignItems: 'center',
  },
});
