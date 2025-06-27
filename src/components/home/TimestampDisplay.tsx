import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Platform } from 'react-native';
import timestampModule, {
  timestampEmitter,
} from '../../native/TimestampModule';
import { TimestampUtils } from '../../utils/date';

const { width } = Dimensions.get('window');

interface TimestampData {
  timestamp: number;
  localTime: string;
  formattedTime: string;
}

export const TimestampDisplay: React.FC = () => {
  const [timestampData, setTimestampData] = useState<TimestampData | null>(
    null,
  );
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    // Get initial timestamp
    const getInitialTimestamp = async () => {
      try {
        const result = await timestampModule.getCurrentTimestamp();
        updateTimestampData(result.timestamp);
      } catch (error) {
        console.error('Error getting initial timestamp:', error);
      }
    };

    getInitialTimestamp();

    // Start the interval
    timestampModule.startTimestampInterval();
    setIsActive(true);

    // Listen for timestamp updates
    const subscription = timestampEmitter.addListener(
      'TimestampUpdate',
      (data: { timestamp: number }) => {
        updateTimestampData(data.timestamp);
      },
    );

    return () => {
      timestampModule.stopTimestampInterval();
      subscription.remove();
      setIsActive(false);
    };
  }, []);

  const updateTimestampData = (timestamp: number) => {
    setTimestampData({
      timestamp,
      localTime: TimestampUtils.toLocalTime(timestamp),
      formattedTime: TimestampUtils.toFormattedLocalTime(timestamp),
    });
  };

  if (!timestampData) {
    return (
      <View style={styles.container}>
        <Text style={styles.loadingText}>Loading timestamp...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.timestampCard}>
        <View style={styles.statusContainer}>
          <View
            style={[
              styles.statusDot,
              { backgroundColor: isActive ? '#4CAF50' : '#F44336' },
            ]}
          />
        </View>
        <Text style={styles.localTime}>{timestampData.formattedTime}</Text>
        <Text style={styles.timezone}>
          Timezone: {TimestampUtils.getTimezoneOffset()}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 40,
    right: 20,
    zIndex: 1000,
    elevation: 1000,
  },
  timestampCard: {
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 12,
    padding: 16,
    minWidth: width * 0.8,
    maxWidth: width * 0.9,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textAlign: 'center',
  },
  timestamp: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Courier' : 'monospace',
    marginBottom: 4,
    textAlign: 'center',
  },
  localTime: {
    color: '#FFFFFF',
    fontSize: 14,
    marginBottom: 4,
    textAlign: 'center',
  },
  timezone: {
    color: '#CCCCCC',
    fontSize: 12,
    marginBottom: 8,
    textAlign: 'center',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    color: '#CCCCCC',
    fontSize: 12,
  },
  loadingText: {
    color: '#FFFFFF',
    fontSize: 14,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    padding: 12,
    borderRadius: 8,
  },
});
