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
  HomeMain: undefined;
  ProductDetails: { productId: number };
};
