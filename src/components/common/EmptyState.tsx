import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type EmptyStateProps = {
  message: string;
};

export default function EmptyState({ message }: EmptyStateProps) {
  return (
    <View style={styles.center}>
      <Text style={styles.message}>{message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  message: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
  },
});
