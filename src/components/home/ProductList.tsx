import React, { useCallback } from 'react';
import { StyleSheet } from 'react-native';
import { FlashList, ListRenderItem } from '@shopify/flash-list';
import { Product } from '../../types/Product';
import ProductCard from './ProductCard';

type ProductListProps = {
  products: Product[];
  onPressItem: (item: Product) => void;
  onEndReached: () => void;
  isFetching: boolean;
};

const ProductList = ({
  products,
  onPressItem,
  onEndReached,
}: ProductListProps) => {
  const renderItem: ListRenderItem<Product> = useCallback(
    ({ item }) => <ProductCard item={item} onPress={() => onPressItem(item)} />,
    [onPressItem],
  );

  return (
    <FlashList
      data={products}
      renderItem={renderItem}
      keyExtractor={item => item.id.toString()}
      contentContainerStyle={styles.list}
      showsVerticalScrollIndicator={false}
      onEndReached={onEndReached}
      onEndReachedThreshold={0.5}
      estimatedItemSize={250}
    />
  );
};

export default ProductList;

const styles = StyleSheet.create({
  list: {
    paddingVertical: 16,
    marginHorizontal: 20,
  },
});
