import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Colors, Radii, Spacing, Fonts } from '../theme';

interface ResourceBadgeProps {
  nome: string;
  selected?: boolean;
  onClick?: () => void;
  size?: 'sm' | 'md';
  readonly?: boolean;
}

export default function ResourceBadge({
  nome,
  selected = false,
  onClick,
  size = 'sm',
  readonly = false,
}: ResourceBadgeProps) {
  const isSmall = size === 'sm';

  return (
    <TouchableOpacity
      onPress={onClick}
      disabled={readonly || !onClick}
      activeOpacity={readonly ? 1 : 0.75}
      style={[
        styles.badge,
        isSmall ? styles.sm : styles.md,
        selected ? styles.selected : styles.unselected,
      ]}
    >
      <Text
        style={[
          styles.text,
          isSmall ? styles.textSm : styles.textMd,
          selected ? styles.textSelected : styles.textUnselected,
        ]}
        numberOfLines={1}
      >
        {nome}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: Radii.lg,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sm: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 3,
  },
  md: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
  },
  selected: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  unselected: {
    backgroundColor: Colors.card,
    borderColor: Colors.border,
  },
  text: {
    fontWeight: Fonts.weights.semibold,
  },
  textSm: {
    fontSize: Fonts.sizes.xs,
  },
  textMd: {
    fontSize: Fonts.sizes.sm,
  },
  textSelected: {
    color: Colors.primaryForeground,
  },
  textUnselected: {
    color: Colors.foreground,
  },
});
