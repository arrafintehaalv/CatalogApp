import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const Star = ({
  size = 20,
  color = '#FFD700',
}: {
  size?: number;
  color?: string;
}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <Path d="M12 .587l3.668 7.568L24 9.75l-6 5.85L19.335 24 12 19.897 4.665 24 6 15.6 0 9.75l8.332-1.595z" />
  </Svg>
);
