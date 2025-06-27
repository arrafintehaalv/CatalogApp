export type RootStackParamList = {
  Login: undefined;
  Home: undefined; // The TabNavigator
};

export type TabParamList = {
  Home: undefined;
  Favorite: undefined;
  Map: undefined;
};

export type HomeStackParamList = {
  Home: undefined;
  ProductDetails: { productId: number };
};

export type FavoriteStackParamList = {
  Favorite: undefined;
  ProductDetails: { productId: number };
};
