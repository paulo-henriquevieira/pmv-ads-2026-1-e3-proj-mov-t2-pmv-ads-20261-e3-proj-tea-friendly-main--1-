import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../theme';

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  size?: 'sm' | 'md' | 'lg';
  readonly?: boolean;
}

const sizeMap = { sm: 14, md: 20, lg: 28 };

export default function StarRating({
  rating,
  onChange,
  size = 'md',
  readonly = false,
}: StarRatingProps) {
  const iconSize = sizeMap[size];

  return (
    <View style={styles.row}>
      {[1, 2, 3, 4, 5].map(star => {
        const filled = star <= rating;
        return (
          <TouchableOpacity
            key={star}
            onPress={() => !readonly && onChange?.(star)}
            disabled={readonly}
            activeOpacity={readonly ? 1 : 0.7}
            hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
          >
            <Ionicons
              name={filled ? 'star' : 'star-outline'}
              size={iconSize}
              color={filled ? Colors.accent : Colors.border}
              style={{ marginRight: 2 }}
            />
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
