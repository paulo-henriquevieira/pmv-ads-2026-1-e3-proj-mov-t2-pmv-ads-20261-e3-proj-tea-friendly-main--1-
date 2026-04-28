import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import { Establishment, SortOption } from '../types';
import { FEATURES } from '../constants';
import { filterEstablishments } from '../services/establishmentService';
import { getUserFavorites, toggleFavorite } from '../services/reviewService';
import { useAuth } from '../contexts/AuthContext';
import EstablishmentCard from '../components/EstablishmentCard';
import ResourceBadge from '../components/ResourceBadge';
import { MainTabsParamList, RootStackParamList } from '../navigation';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, 'Home'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

const sortOptions: { value: SortOption; label: string; icon: keyof typeof Ionicons.glyphMap }[] = [
  { value: 'best-rated', label: 'Melhor avaliados', icon: 'trending-up' },
  { value: 'most-favorited', label: 'Mais favoritados', icon: 'heart' },
  { value: 'most-recent', label: 'Mais recentes', icon: 'time-outline' },
];

export default function HomeScreen({ navigation }: Props) {
  const [search, setSearch] = useState('');
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);
  const [sort, setSort] = useState<SortOption>('best-rated');
  const [establishments, setEstablishments] = useState<Establishment[]>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const loadData = useCallback(async () => {
    setLoading(true);
    const [ests, favs] = await Promise.all([
      filterEstablishments(search, selectedFeatures, sort),
      user ? getUserFavorites(user.id) : Promise.resolve([]),
    ]);
    setEstablishments(ests);
    setFavorites(favs);
    setLoading(false);
  }, [search, selectedFeatures, sort, user]);

  useFocusEffect(
    useCallback(() => {
      loadData();
    }, [loadData]),
  );

  const handleToggleFavorite = async (estId: string) => {
    if (!user) {
      Alert.alert('Login necessário', 'Faça login para favoritar estabelecimentos.', [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Entrar', onPress: () => navigation.navigate('Auth') },
      ]);
      return;
    }
    await toggleFavorite(user.id, estId);
    const favs = await getUserFavorites(user.id);
    setFavorites(favs);
  };

  const toggleFeature = (f: string) => {
    setSelectedFeatures(prev =>
      prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f],
    );
  };

  const getInitial = () => user?.name?.[0]?.toUpperCase() ?? 'U';

  return (
    <View style={styles.container}>
      {/* Hero */}
      <View style={styles.hero}>
        <SafeAreaView>
          <View style={styles.heroHeader}>
            <View style={styles.brandRow}>
              <View style={styles.logoBox}>
                <Text style={styles.logoEmoji}>🩵</Text>
              </View>
              <Text style={styles.brandName}>TEA Friendly</Text>
            </View>
            {user ? (
              <TouchableOpacity
                style={styles.avatarBtn}
                onPress={() => navigation.navigate('Profile')}
              >
                <View style={styles.avatarCircle}>
                  <Text style={styles.avatarText}>{getInitial()}</Text>
                </View>
                <Text style={styles.avatarName} numberOfLines={1}>
                  {user.name?.split(' ')[0]}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.loginBtn}
                onPress={() => navigation.navigate('Auth')}
              >
                <Text style={styles.loginBtnText}>Entrar</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.heroTitle}>
            Encontre lugares {'\n'}inclusivos para sua família
          </Text>
          {/* <Text style={styles.heroSubtitle}>
            Espaços seguros e acolhedores para pessoas com TEA
          </Text> */}

          {/* Search bar */}
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color={Colors.mutedForeground} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              onEndEditing={loadData}
              placeholder="Buscar" /*por nome, cidade ou bairro...*/
              placeholderTextColor={Colors.mutedForeground}
              returnKeyType="search"
              onSubmitEditing={loadData}
            />
            <TouchableOpacity
              style={[styles.filterIconBtn, showFilters && styles.filterIconBtnActive]}
              onPress={() => setShowFilters(v => !v)}
            >
              <Ionicons
                name="options-outline"
                size={18}
                color={showFilters ? Colors.primaryForeground : Colors.primary}
              />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </View>

      {/* Body */}
      <FlatList
        data={establishments}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <>
            {/* Sort chips */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              style={styles.sortRow}
              contentContainerStyle={{ gap: Spacing.sm, paddingRight: Spacing.base }}
            >
              {sortOptions.map(opt => (
                <TouchableOpacity
                  key={opt.value}
                  style={[styles.sortChip, sort === opt.value && styles.sortChipActive]}
                  onPress={() => setSort(opt.value)}
                >
                  <Ionicons
                    name={opt.icon}
                    size={14}
                    color={sort === opt.value ? Colors.primaryForeground : Colors.mutedForeground}
                  />
                  <Text
                    style={[
                      styles.sortChipText,
                      sort === opt.value && styles.sortChipTextActive,
                    ]}
                  >
                    {opt.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            {/* Feature filters */}
            {showFilters && (
              <View style={styles.filtersSection}>
                <Text style={styles.filterLabel}>Filtrar por recursos inclusivos:</Text>
                <View style={styles.filterBadges}>
                  {FEATURES.map(f => (
                    <ResourceBadge
                      key={f}
                      nome={f}
                      selected={selectedFeatures.includes(f)}
                      onClick={() => { toggleFeature(f); }}
                      size="md"
                    />
                  ))}
                </View>
                {selectedFeatures.length > 0 && (
                  <TouchableOpacity
                    onPress={() => setSelectedFeatures([])}
                    style={styles.clearFilters}
                  >
                    <Text style={styles.clearFiltersText}>Limpar filtros</Text>
                  </TouchableOpacity>
                )}
              </View>
            )}

            {/* Results count */}
            {!loading && (
              <Text style={styles.resultsCount}>
                {establishments.length} estabelecimento{establishments.length !== 1 ? 's' : ''} encontrado{establishments.length !== 1 ? 's' : ''}
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator
              style={{ marginTop: Spacing['3xl'] }}
              size="large"
              color={Colors.primary}
            />
          ) : (
            <View style={styles.emptyState}>
              <Ionicons name="search-outline" size={48} color={Colors.border} />
              <Text style={styles.emptyTitle}>Nenhum resultado</Text>
              <Text style={styles.emptySubtitle}>
                Tente outros filtros ou termos de busca
              </Text>
            </View>
          )
        }
        renderItem={({ item }) => (
          <EstablishmentCard
            id={item.id}
            nome={item.name}
            categoria={item.category}
            cidade={item.city}
            bairro={item.neighborhood}
            nota_media={item.ratingAvg}
            total_avaliacoes={item.ratingCount}
            total_favoritos={item.favoritesCount}
            distanceKm={item.distanceKm}
            isFavorited={favorites.includes(item.id)}
            onToggleFavorite={() => handleToggleFavorite(item.id)}
            recursos={item.features.slice(0, 4)}
            onPress={() => navigation.navigate('EstablishmentDetail', { id: item.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.background },
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing.xl,
  },
  heroHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.base,
    paddingTop: Spacing.sm,
  },
  brandRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  logoBox: {
    width: 40,
    height: 40,
    borderRadius: Radii.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoEmoji: { fontSize: 22 },
  brandName: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  avatarBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: Radii.full,
    paddingRight: Spacing.sm,
    paddingLeft: 4,
    paddingVertical: 4,
    gap: 6,
  },
  avatarCircle: {
    width: 28,
    height: 28,
    borderRadius: Radii.full,
    backgroundColor: 'rgba(255,255,255,0.25)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  avatarName: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    color: Colors.primaryForeground,
    maxWidth: 90,
  },
  loginBtn: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.base,
    paddingVertical: Spacing.xs,
  },
  loginBtnText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  heroTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.extrabold,
    color: Colors.primaryForeground,
    lineHeight: 32,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: 'rgba(255,255,255,0.8)',
    marginBottom: Spacing.base,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    height: 48,
    paddingLeft: Spacing.md,
    paddingRight: 6,
    ...Shadows.card,
  },
  searchIcon: { marginRight: Spacing.sm },
  searchInput: {
    flex: 1,
    fontSize: Fonts.sizes.base,
    color: Colors.foreground,
  },
  filterIconBtn: {
    width: 36,
    height: 36,
    borderRadius: Radii.md,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  filterIconBtnActive: {
    backgroundColor: Colors.primary,
  },
  listContent: {
    paddingHorizontal: Spacing.base,
    paddingBottom: Spacing['3xl'],
  },
  sortRow: {
    marginTop: Spacing.base,
    marginBottom: Spacing.sm,
    marginHorizontal: -Spacing.base,
    paddingLeft: Spacing.base,
  },
  sortChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    borderRadius: Radii.full,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs,
    backgroundColor: Colors.card,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  sortChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
    ...Shadows.soft,
  },
  sortChipText: {
    fontSize: Fonts.sizes.xs,
    fontWeight: Fonts.weights.semibold,
    color: Colors.mutedForeground,
  },
  sortChipTextActive: { color: Colors.primaryForeground },
  filtersSection: {
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    marginBottom: Spacing.sm,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterLabel: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    color: Colors.foreground,
    marginBottom: Spacing.sm,
  },
  filterBadges: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  clearFilters: { marginTop: Spacing.sm },
  clearFiltersText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.primary,
    fontWeight: Fonts.weights.semibold,
  },
  resultsCount: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: Spacing.sm,
  },
  emptyState: {
    alignItems: 'center',
    paddingTop: Spacing['3xl'],
    gap: Spacing.sm,
  },
  emptyTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  emptySubtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
});
