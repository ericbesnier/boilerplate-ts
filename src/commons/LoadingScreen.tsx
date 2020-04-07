import React from 'react';
import {
  ActivityIndicator,
  View,
  Text,
  ActivityIndicatorProps,
} from 'react-native';

const LoadingScreen = (props: Props) => {
  const size = props.size || 'large';
  const color = props.color || 'gray';
  const message = props.message || '';
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator size={size} color={color} />
      <Text
        style={{
          fontSize: 16,
          fontWeight: 'bold',
          marginTop: 10,
        }}>
        Veuillez attendre, svp...
      </Text>
      <Text
        style={{
          fontSize: 14,
          marginTop: 5,
        }}>
        {message}
      </Text>
    </View>
  );
};

type Props = ActivityIndicatorProps & {
  message: string;
};

export default LoadingScreen;
