import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Fonts, Spacing, Radii } from '../theme';
import { Establishment } from '../types';
import { getEstablishments } from '../services/establishmentService';
import { getUserFavorites, toggleFavorite } from '../services/reviewService';
import { useAuth } from '../contexts/AuthContext';
import EstablishmentCard from '../components/EstablishmentCard';
import { MainTabsParamList, RootStackParamList } from '../navigation';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, 'Favorites'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

export default function FavoritesScreen({ navigation }: Props) {
  const { user } = useAuth();
  const [favorited, setFavorited] = useState<Establishment[]>([]);
  const [loading, setLoading] = useState(true);

  useFocusEffect(
    useCallback(() => {
      if (!user) {
        setFavorited([]);
        setLoading(false);
        return;
      }
      (async () => {
        setLoading(true);
        const [favIds, all] = await Promise.all([
          getUserFavorites(user.id),
          getEstablishments(),
        ]);
        setFavorited(all.filter(e => favIds.includes(e.id)));
        setLoading(false);
      })();
    }, [user]),
  );

  const handleToggle = async (estId: string) => {
    if (!user) return;
    await toggleFavorite(user.id, estId);
    setFavorited(prev => prev.filter(e => e.id !== estId));
  };

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loginRequired}>
          <Ionicons name="heart-outline" size={56} color={Colors.border} />
          <Text style={styles.loginTitle}>Seus favoritos</Text>
          <Text style={styles.loginSubtitle}>
            Faça login para ver e salvar seus estabelecimentos favoritos.
          </Text>
          <View
            style={styles.loginBtn}
            // LoginBtn handled via tab press — user can navigate to Profile tab then auth
          >
            <Text
              style={styles.loginBtnText}
              onPress={() => navigation.navigate('Auth')}
            >
              Fazer login
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <FlatList
        data={favorited}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.title}>Meus Favoritos</Text>
            <Text style={styles.subtitle}>Lugares que você salvou</Text>
          </View>
        }
        ListEmptyComponent={
          !loading ? (
            <View style={styles.emptyState}>
              <Ionicons name="heart-outline" size={56} color={Colors.border} />
              <Text style={styles.emptyTitle}>Nenhum favorito ainda</Text>
              <Text style={styles.emptySubtitle}>
                Explore e salve os lugares que você gosta!
              </Text>
            </View>
          ) : null
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
            isFavorited={true}
            onToggleFavorite={() => handleToggle(item.id)}
            recursos={item.features.slice(0, 4)}
            onPress={() => navigation.navigate('EstablishmentDetail', { id: item.id })}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  listContent: { padding: Spacing.base, paddingBottom: Spacing['3xl'] },
  header: { marginBottom: Spacing.lg },
  title: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  subtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginTop: 4,
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
    textAlign: 'center',
  },
  loginRequired: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    gap: Spacing.base,
  },
  loginTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  loginSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 20,
  },
  loginBtn: {
    backgroundColor: Colors.primary,
    borderRadius: Radii.lg,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    marginTop: Spacing.sm,
  },
  loginBtnText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
});
