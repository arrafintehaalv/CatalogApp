import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Product } from '../../types/Product';
import {
  addFavourite,
  removeFavourite,
} from '../../features/favourites/favouritesSlice';
import { Heart } from '../svg';
import { useAppDispatch, useAppSelector } from '../../app/hooks';

type ProductCardProps = {
  item: Product;
  onPress: () => void;
};

export default function ProductCard({ item, onPress }: ProductCardProps) {
  const dispatch = useAppDispatch();
  const favourites = useAppSelector(state => state.favourites.items);

  const isFavourite = favourites.some(p => p.id === item.id);

  const toggleFavourite = () => {
    if (isFavourite) {
      dispatch(removeFavourite(item.id));
    } else {
      dispatch(addFavourite(item));
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={0.85}
    >
      <Image source={{ uri: item.thumbnail }} style={styles.image} />
      <View style={styles.cardBody}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.brand}>{item.brand}</Text>
        <View style={styles.bottomRow}>
          <Text style={styles.price}>${item.price}</Text>
          <TouchableOpacity
            onPress={toggleFavourite}
            style={styles.heartButton}
          >
            {isFavourite ? (
              <Heart size={20} color="#e11d48" />
            ) : (
              <Heart size={20} color="#999" />
            )}
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 16,
    width: '90%',
    alignSelf: 'center',
    elevation: 3,
  },
  image: {
    width: '100%',
    height: 180,
    resizeMode: 'cover',
  },
  cardBody: {
    padding: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
  },
  brand: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  bottomRow: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1d4ed8',
  },
  heartButton: {
    padding: 4,
  },
});
