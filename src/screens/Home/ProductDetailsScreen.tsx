import React, { useLayoutEffect } from 'react';
import { View, Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { RouteProp, useRoute, useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../types/Navigation';
import { useGetProductByIdQuery } from '../../api/api';
import { Star } from '../../components/svg/Star';

type ProductDetailsRouteProp = RouteProp<HomeStackParamList, 'ProductDetails'>;

export default function ProductDetailsScreen() {
  const { params } = useRoute<ProductDetailsRouteProp>();
  const { productId } = params;
  const navigation = useNavigation();

  const { data: product, isLoading, error } = useGetProductByIdQuery(productId);

  useLayoutEffect(() => {
    const parent = navigation.getParent && navigation.getParent();
    parent?.setOptions({ tabBarStyle: { display: 'none' } });

    return () => {
      parent?.setOptions({ tabBarStyle: undefined });
    };
  }, [navigation]);

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#1d4ed8" />
      </View>
    );
  }

  if (error || !product) {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>Failed to load product.</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={product.reviews}
      keyExtractor={(_, idx) => idx.toString()}
      estimatedItemSize={100}
      contentContainerStyle={styles.container}
      renderItem={({ item: review }) => (
        <View style={styles.review}>
          <View style={styles.reviewHeader}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={16}
                color={index < review.rating ? '#FFD700' : '#ddd'}
              />
            ))}
          </View>
          <Text style={styles.reviewComment}>"{review.comment}"</Text>
          <Text style={styles.reviewer}>- {review.reviewerName}</Text>
        </View>
      )}
      ListHeaderComponent={
        <>
          <Image source={{ uri: product.thumbnail }} style={styles.thumbnail} />
          <View style={styles.header}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Details</Text>
            <Text style={styles.detailItem}>Brand: {product.brand}</Text>
            <Text style={styles.detailItem}>Category: {product.category}</Text>
            <Text style={styles.detailItem}>SKU: {product.sku}</Text>
            <Text style={styles.detailItem}>Stock: {product.stock}</Text>
            <Text style={styles.detailItem}>Weight: {product.weight}g</Text>
            <Text style={styles.detailItem}>
              Dimensions: {product.dimensions.width} ×{' '}
              {product.dimensions.height} × {product.dimensions.depth} cm
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Shipping</Text>
            <Text style={styles.detailItem}>{product.shippingInformation}</Text>
            <Text style={styles.detailItem}>
              Availability: {product.availabilityStatus}
            </Text>
            <Text style={styles.detailItem}>
              Warranty: {product.warrantyInformation}
            </Text>
            <Text style={styles.detailItem}>
              Return Policy: {product.returnPolicy}
            </Text>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Reviews</Text>
            {product.reviews.length === 0 && (
              <Text style={styles.detailItem}>No reviews yet.</Text>
            )}
          </View>
        </>
      }
    />
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
  container: {
    padding: 16,
    backgroundColor: '#fff',
  },
  thumbnail: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
    borderRadius: 12,
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    flex: 1,
    flexWrap: 'wrap',
  },
  price: {
    fontSize: 20,
    color: '#1d4ed8',
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginVertical: 12,
    color: '#444',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 8,
  },
  detailItem: {
    fontSize: 15,
    color: '#555',
    marginBottom: 4,
  },
  review: {
    backgroundColor: '#f9f9f9',
    padding: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  reviewRating: {
    fontSize: 14,
    fontWeight: '600',
  },
  reviewComment: {
    fontStyle: 'italic',
    color: '#333',
  },
  reviewer: {
    marginTop: 4,
    fontSize: 13,
    color: '#777',
  },
});
