import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import StarRating from './StarRating';
import ResourceBadge from './ResourceBadge';

interface EstablishmentCardProps {
  id: string;
  nome: string;
  categoria: string;
  cidade: string;
  bairro: string;
  nota_media: number;
  total_avaliacoes: number;
  total_favoritos: number;
  distanceKm: number;
  isFavorited: boolean;
  onToggleFavorite: () => void;
  recursos: string[];
  onPress: () => void;
}

export default function EstablishmentCard({
  nome,
  categoria,
  cidade,
  bairro,
  nota_media,
  total_avaliacoes,
  total_favoritos,
  distanceKm,
  isFavorited,
  onToggleFavorite,
  recursos,
  onPress,
}: EstablishmentCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.85}>
      {/* Gradient top accent bar */}
      <View style={styles.accentBar} />

      <View style={styles.content}>
        {/* Header row */}
        <View style={styles.headerRow}>
          <View style={styles.categoryBadge}>
            <Text style={styles.categoryText}>{categoria}</Text>
          </View>
          <TouchableOpacity
            onPress={onToggleFavorite}
            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
            activeOpacity={0.7}
          >
            <Ionicons
              name={isFavorited ? 'heart' : 'heart-outline'}
              size={22}
              color={isFavorited ? Colors.secondary : Colors.mutedForeground}
            />
          </TouchableOpacity>
        </View>

        {/* Name */}
        <Text style={styles.name} numberOfLines={2}>
          {nome}
        </Text>

        {/* Location */}
        <View style={styles.locationRow}>
          <Ionicons name="location-outline" size={13} color={Colors.mutedForeground} />
          <Text style={styles.locationText}>
            {bairro}, {cidade}
          </Text>
          <Text style={styles.distanceText}> · {distanceKm.toFixed(1)} km</Text>
        </View>

        {/* Stats */}
        <View style={styles.statsRow}>
          <StarRating rating={nota_media} size="sm" readonly />
          <Text style={styles.ratingText}>
            {nota_media > 0 ? nota_media.toFixed(1) : '—'}
          </Text>
          <Text style={styles.reviewCount}>({total_avaliacoes})</Text>
          <View style={styles.separator} />
          <Ionicons name="heart" size={13} color={Colors.secondary} />
          <Text style={styles.favCount}>{total_favoritos}</Text>
        </View>

        {/* Feature badges */}
        {recursos.length > 0 && (
          <View style={styles.badgesRow}>
            {recursos.slice(0, 3).map(r => (
              <ResourceBadge key={r} nome={r} selected size="sm" readonly />
            ))}
            {recursos.length > 3 && (
              <Text style={styles.moreBadges}>+{recursos.length - 3}</Text>
            )}
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    overflow: 'hidden',
    marginBottom: Spacing.md,
    ...Shadows.card,
  },
  accentBar: {
    height: 4,
    backgroundColor: Colors.primary,
    // In production, use LinearGradient from expo-linear-gradient
  },
  content: {
    padding: Spacing.base,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  categoryBadge: {
    backgroundColor: Colors.muted,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  categoryText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.semibold,
    color: Colors.mutedForeground,
  },
  name: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
    lineHeight: 22,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  locationText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginLeft: 3,
  },
  distanceText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
    gap: 4,
  },
  ratingText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginLeft: 4,
  },
  reviewCount: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
  separator: {
    width: 1,
    height: 12,
    backgroundColor: Colors.border,
    marginHorizontal: Spacing.xs,
  },
  favCount: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginLeft: 3,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: Spacing.xs,
  },
  moreBadges: {
    fontSize: Fonts.sizes.xs,
    color: Colors.mutedForeground,
    alignSelf: 'center',
    marginLeft: 2,
  },
});
