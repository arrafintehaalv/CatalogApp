import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { Product } from '../../types/Product';

const { width } = Dimensions.get('window');
const cardWidth = width * 0.9;

type ProductCardProps = {
  item: Product;
  onPress: () => void;
};

const ProductCard = React.memo(({ item, onPress }: ProductCardProps) => (
  <TouchableOpacity activeOpacity={0.85} onPress={onPress} style={styles.card}>
    <Image source={{ uri: item.thumbnail }} style={styles.image} />
    <View style={styles.cardBody}>
      <Text style={styles.title}>{item.title}</Text>
      <Text style={styles.brand}>{item.brand}</Text>
      <View style={styles.priceWrapper}>
        <Text style={styles.price}>${item.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
));

export default ProductCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    width: cardWidth,
    marginBottom: 16,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
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
    color: '#111',
  },
  brand: {
    fontSize: 14,
    color: '#777',
    marginTop: 4,
  },
  priceWrapper: {
    marginTop: 10,
    backgroundColor: '#1d4ed8',
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  price: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },
});
