import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  ActivityIndicator,
  Linking,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RouteProp } from '@react-navigation/native';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import { Establishment, Review } from '../types';
import { getEstablishment } from '../services/establishmentService';
import {
  getReviews,
  getUserReview,
  submitReview,
  isFavorited,
  toggleFavorite,
} from '../services/reviewService';
import { useAuth } from '../contexts/AuthContext';
import StarRating from '../components/StarRating';
import ResourceBadge from '../components/ResourceBadge';
import { RootStackParamList } from '../navigation';
import { formatDate, getInitial } from '../utils';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'EstablishmentDetail'>;
  route: RouteProp<RootStackParamList, 'EstablishmentDetail'>;
};

export default function EstablishmentDetailScreen({ navigation, route }: Props) {
  const { id } = route.params;
  const { user } = useAuth();

  const [est, setEst] = useState<Establishment | undefined>(undefined);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [favored, setFavored] = useState(false);
  const [loading, setLoading] = useState(true);

  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewStars, setReviewStars] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [existingReview, setExistingReview] = useState<Review | undefined>(undefined);

  const loadData = useCallback(async () => {
    const [freshEst, freshReviews, favState, userRev] = await Promise.all([
      getEstablishment(id),
      getReviews(id),
      user ? isFavorited(user.id, id) : Promise.resolve(false),
      user ? getUserReview(id, user.id) : Promise.resolve(undefined),
    ]);
    setEst(freshEst);
    setReviews(freshReviews);
    setFavored(favState);
    setExistingReview(userRev);
    setLoading(false);
  }, [id, user]);

  useFocusEffect(
    useCallback(() => {
      setLoading(true);
      loadData();
    }, [loadData]),
  );

  const handleToggleFavorite = async () => {
    if (!user) {
      navigation.navigate('Auth');
      return;
    }
    await toggleFavorite(user.id, id);
    setFavored(v => !v);
    loadData();
  };

  const handleSubmitReview = async () => {
    if (!user) { navigation.navigate('Auth'); return; }
    await submitReview({
      establishmentId: id,
      userId: user.id,
      userName: user.name,
      stars: reviewStars,
      comment: reviewComment,
    });
    Alert.alert('Sucesso', existingReview ? 'Avaliação atualizada!' : 'Avaliação enviada!');
    setShowReviewForm(false);
    loadData();
  };

  const openReviewForm = () => {
    if (existingReview) {
      setReviewStars(existingReview.stars);
      setReviewComment(existingReview.comment);
    }
    setShowReviewForm(true);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!est) {
    return (
      <View style={styles.centered}>
        <Text style={styles.notFoundText}>Estabelecimento não encontrado</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.backLink}>Voltar</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.hero}>
          <SafeAreaView>
            <View style={styles.heroActions}>
              <TouchableOpacity
                style={styles.heroBtn}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="arrow-back" size={20} color={Colors.primaryForeground} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.heroBtn} onPress={handleToggleFavorite}>
                <Ionicons
                  name={favored ? 'heart' : 'heart-outline'}
                  size={20}
                  color={Colors.primaryForeground}
                />
              </TouchableOpacity>
            </View>

            <View style={styles.categoryBadge}>
              <Text style={styles.categoryText}>{est.category}</Text>
            </View>
            <Text style={styles.estName}>{est.name}</Text>
            <View style={styles.locationRow}>
              <Ionicons name="location-outline" size={14} color="rgba(255,255,255,0.8)" />
              <Text style={styles.locationText}>
                {est.neighborhood}, {est.city} · {est.distanceKm.toFixed(1)} km
              </Text>
            </View>
          </SafeAreaView>
        </View>

        <View style={styles.body}>
          {/* Stats */}
          <View style={styles.statsRow}>
            <View style={styles.statCard}>
              <View style={styles.statInner}>
                <Ionicons name="star" size={20} color={Colors.accent} />
                <Text style={styles.statValue}>
                  {est.ratingAvg > 0 ? est.ratingAvg.toFixed(1) : '—'}
                </Text>
              </View>
              <Text style={styles.statLabel}>{est.ratingCount} avaliações</Text>
            </View>
            <View style={styles.statCard}>
              <View style={styles.statInner}>
                <Ionicons name="heart" size={20} color={Colors.secondary} />
                <Text style={styles.statValue}>{est.favoritesCount}</Text>
              </View>
              <Text style={styles.statLabel}>favoritos</Text>
            </View>
          </View>

          {/* Description */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Sobre</Text>
            <Text style={styles.description}>{est.description}</Text>
          </View>

          {/* Inclusive features */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recursos inclusivos</Text>
            <View style={styles.badgesWrap}>
              {est.features.map(f => (
                <ResourceBadge key={f} nome={f} selected size="md" readonly />
              ))}
            </View>
          </View>

          {/* Info */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Informações</Text>
            <View style={styles.infoList}>
              {est.hours && (
                <View style={styles.infoRow}>
                  <Ionicons name="time-outline" size={16} color={Colors.primary} />
                  <Text style={styles.infoText}>{est.hours}</Text>
                </View>
              )}
              {est.phone && (
                <TouchableOpacity
                  style={styles.infoRow}
                  onPress={() => Linking.openURL(`tel:${est.phone}`)}
                >
                  <Ionicons name="call-outline" size={16} color={Colors.primary} />
                  <Text style={[styles.infoText, styles.infoLink]}>{est.phone}</Text>
                </TouchableOpacity>
              )}
              {est.whatsapp && (
                <TouchableOpacity
                  style={styles.infoRow}
                  onPress={() =>
                    Linking.openURL(
                      `https://wa.me/${est.whatsapp!.replace(/\D/g, '')}`,
                    )
                  }
                >
                  <Ionicons name="logo-whatsapp" size={16} color={Colors.primary} />
                  <Text style={[styles.infoText, styles.infoLink]}>{est.whatsapp}</Text>
                </TouchableOpacity>
              )}
              {est.website && (
                <TouchableOpacity
                  style={styles.infoRow}
                  onPress={() => Linking.openURL(est.website!)}
                >
                  <Ionicons name="globe-outline" size={16} color={Colors.primary} />
                  <Text style={[styles.infoText, styles.infoLink]}>{est.website}</Text>
                </TouchableOpacity>
              )}
              {est.address && (
                <View style={styles.infoRow}>
                  <Ionicons name="location-outline" size={16} color={Colors.primary} />
                  <Text style={styles.infoText}>{est.address}</Text>
                </View>
              )}
              {est.instagram && (
                <View style={styles.infoRow}>
                  <Ionicons name="logo-instagram" size={16} color={Colors.primary} />
                  <Text style={styles.infoText}>{est.instagram}</Text>
                </View>
              )}
            </View>
          </View>

          {/* Reviews */}
          <View style={styles.section}>
            <View style={styles.reviewHeader}>
              <Text style={styles.sectionTitle}>Avaliações ({reviews.length})</Text>
              {user ? (
                <TouchableOpacity
                  style={styles.reviewBtn}
                  onPress={openReviewForm}
                >
                  <Ionicons name="chatbubble-outline" size={14} color={Colors.primary} />
                  <Text style={styles.reviewBtnText}>
                    {existingReview ? 'Editar' : 'Avaliar'}
                  </Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity
                  style={styles.reviewBtn}
                  onPress={() => navigation.navigate('Auth')}
                >
                  <Text style={styles.reviewBtnText}>Login para avaliar</Text>
                </TouchableOpacity>
              )}
            </View>

            {/* Review form */}
            {showReviewForm && (
              <View style={styles.reviewForm}>
                <Text style={styles.reviewFormTitle}>Sua avaliação</Text>
                <StarRating
                  rating={reviewStars}
                  onChange={setReviewStars}
                  size="lg"
                />
                <TextInput
                  style={styles.commentInput}
                  value={reviewComment}
                  onChangeText={setReviewComment}
                  placeholder="Conte sua experiência..."
                  placeholderTextColor={Colors.mutedForeground}
                  multiline
                  numberOfLines={3}
                  textAlignVertical="top"
                />
                <View style={styles.formActions}>
                  <TouchableOpacity
                    style={styles.submitReviewBtn}
                    onPress={handleSubmitReview}
                  >
                    <Text style={styles.submitReviewText}>
                      {existingReview ? 'Atualizar' : 'Enviar'}
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.cancelReviewBtn}
                    onPress={() => setShowReviewForm(false)}
                  >
                    <Text style={styles.cancelReviewText}>Cancelar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            )}

            {/* Review list */}
            {reviews.length === 0 ? (
              <Text style={styles.noReviews}>
                Nenhuma avaliação ainda. Seja o primeiro!
              </Text>
            ) : (
              reviews.map(r => (
                <View key={r.id} style={styles.reviewCard}>
                  <View style={styles.reviewCardHeader}>
                    <View style={styles.reviewAvatarRow}>
                      <View style={styles.reviewAvatar}>
                        <Text style={styles.reviewAvatarText}>
                          {getInitial(r.userName)}
                        </Text>
                      </View>
                      <View>
                        <Text style={styles.reviewerName}>{r.userName}</Text>
                        <StarRating rating={r.stars} size="sm" readonly />
                      </View>
                    </View>
                    <Text style={styles.reviewDate}>{formatDate(r.createdAt)}</Text>
                  </View>
                  {r.comment ? (
                    <Text style={styles.reviewComment}>{r.comment}</Text>
                  ) : null}
                </View>
              ))
            )}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  notFoundText: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  backLink: { fontSize: Fonts.sizes.sm, color: Colors.primary, fontWeight: Fonts.weights.bold },

  // Hero
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  heroActions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
    paddingTop: Spacing.sm,
  },
  heroBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  categoryBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: 3,
    marginBottom: Spacing.xs,
  },
  categoryText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.semibold,
    color: Colors.primaryForeground,
  },
  estName: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
    lineHeight: 30,
    marginBottom: Spacing.xs,
  },
  locationRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  locationText: {
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
  },

  // Body
  body: { padding: Spacing.base },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.md,
    marginBottom: Spacing.lg,
    marginTop: -Spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    alignItems: 'center',
    ...Shadows.card,
  },
  statInner: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  statValue: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  statLabel: {
    fontSize: Fonts.sizes.xs,
    color: Colors.mutedForeground,
    marginTop: 2,
  },
  section: { marginBottom: Spacing.xl },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  description: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    lineHeight: 22,
  },
  badgesWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  infoList: { gap: Spacing.sm },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.sm,
  },
  infoText: {
    flex: 1,
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
  infoLink: { color: Colors.primary },

  // Reviews
  reviewHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
  },
  reviewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 6,
  },
  reviewBtnText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primary,
    fontWeight: Fonts.weights.semibold,
  },
  reviewForm: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.border,
    marginBottom: Spacing.base,
    gap: Spacing.sm,
    ...Shadows.soft,
  },
  reviewFormTitle: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    color: Colors.foreground,
  },
  commentInput: {
    backgroundColor: Colors.muted,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    fontSize: Fonts.sizes.sm,
    color: Colors.foreground,
    minHeight: 80,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  formActions: { flexDirection: 'row', gap: Spacing.sm },
  submitReviewBtn: {
    flex: 1,
    height: 44,
    backgroundColor: Colors.primary,
    borderRadius: Radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
  },
  submitReviewText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  cancelReviewBtn: {
    height: 44,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.base,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cancelReviewText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    fontWeight: Fonts.weights.medium,
  },
  noReviews: {
    textAlign: 'center',
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    paddingVertical: Spacing.base,
  },
  reviewCard: {
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reviewCardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  reviewAvatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: Radii.full,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  reviewAvatarText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  reviewerName: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    color: Colors.foreground,
  },
  reviewDate: {
    fontSize: Fonts.sizes.xs,
    color: Colors.mutedForeground,
  },
  reviewComment: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    lineHeight: 20,
    marginTop: Spacing.xs,
  },
});
