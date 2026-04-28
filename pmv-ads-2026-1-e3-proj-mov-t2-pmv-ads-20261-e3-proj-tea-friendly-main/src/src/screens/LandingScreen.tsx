import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  Image,
  SafeAreaView,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Landing'>;
};

const steps = [
  {
    icon: 'search' as const,
    title: 'Busque',
    desc: 'Encontre estabelecimentos inclusivos por nome, cidade ou recursos.',
  },
  {
    icon: 'star' as const,
    title: 'Avalie',
    desc: 'Dê estrelas e compartilhe sua experiência com a comunidade.',
  },
  {
    icon: 'heart' as const,
    title: 'Favorite',
    desc: 'Salve seus lugares preferidos para acessar rapidamente.',
  },
];

export default function LandingScreen({ navigation }: Props) {
  const insets = useSafeAreaInsets();
  return (
    <ScrollView
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: insets.bottom }}
    >
      {/* Hero */}
      <View style={styles.hero}>
        <SafeAreaView>
          <View style={styles.logoRow}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>🩵</Text>
            </View>
            <Text style={styles.appName}>TEA Friendly</Text>
          </View>

          <Text style={styles.heroTitle}>
            Encontre ambientes{'\n'}TEA Friendly perto de você
          </Text>

          <Text style={styles.heroSubtitle}>
            Espaços seguros e acolhedores para pessoas com Transtorno do Espectro Autista e suas
            famílias.
          </Text>

          <TouchableOpacity
            style={styles.ctaButton}
            onPress={() => navigation.navigate('MainTabs')}
            activeOpacity={0.85}
          >
            <Text style={styles.ctaText}>Começar agora</Text>
            <Ionicons name="arrow-forward" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </SafeAreaView>
      </View>

      {/* Steps */}
      <View style={styles.stepsSection}>
        <Text style={styles.stepsTitle}>Como funciona</Text>
        {steps.map((s, i) => (
          <View key={s.title} style={styles.stepRow}>
            <View style={styles.stepIcon}>
              <Ionicons name={s.icon} size={22} color={Colors.primaryForeground} />
            </View>
            <View style={styles.stepContent}>
              <Text style={styles.stepTitle}>{s.title}</Text>
              <Text style={styles.stepDesc}>{s.desc}</Text>
            </View>
          </View>
        ))}
      </View>

      {/* CTA section */}
      <View style={styles.ctaSection}>
        <Text style={styles.ctaSectionTitle}>Pronto para começar?</Text>
        <Text style={styles.ctaSectionSubtitle}>
          Explore estabelecimentos inclusivos já cadastrados.
        </Text>
        <TouchableOpacity
          style={styles.exploreBt}
          onPress={() => navigation.navigate('MainTabs')}
          activeOpacity={0.85}
        >
          <Text style={styles.exploreBtText}>Explorar agora</Text>
          <Ionicons name="arrow-forward" size={16} color={Colors.primaryForeground} />
        </TouchableOpacity>
      </View>

      {/* Register CTA */}
      <TouchableOpacity
        style={styles.registerLink}
        onPress={() => navigation.navigate('RegisterEstablishment')}
        activeOpacity={0.7}
      >
        <Ionicons name="storefront-outline" size={16} color={Colors.primary} />
        <Text style={styles.registerLinkText}>
          Sou um estabelecimento e quero me cadastrar
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  hero: {
    backgroundColor: Colors.primary,
    paddingHorizontal: Spacing.base,
    paddingTop: Spacing['2xl'],
    paddingBottom: Spacing['3xl'],
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.lg,
  },
  logoBox: {
    width: 52,
    height: 52,
    borderRadius: Radii.lg,
    backgroundColor: 'rgba(255,255,255,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.sm,
    ...Shadows.soft,
  },
  logoEmoji: {
    fontSize: 28,
  },
  appName: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  heroTitle: {
    fontSize: Fonts.sizes['3xl'],
    fontWeight: Fonts.weights.extrabold,
    color: Colors.primaryForeground,
    textAlign: 'center',
    lineHeight: 38,
    marginBottom: Spacing.md,
  },
  heroSubtitle: {
    fontSize: Fonts.sizes.base,
    color: 'rgba(255,255,255,0.85)',
    textAlign: 'center',
    lineHeight: 22,
    marginBottom: Spacing.xl,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.card,
    borderRadius: Radii.xl,
    height: 56,
    gap: Spacing.sm,
    ...Shadows.elevated,
  },
  ctaText: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.primary,
  },
  stepsSection: {
    padding: Spacing.xl,
  },
  stepsTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    textAlign: 'center',
    marginBottom: Spacing.xl,
  },
  stepRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: Spacing.xl,
    gap: Spacing.base,
  },
  stepIcon: {
    width: 52,
    height: 52,
    borderRadius: Radii.xl,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    ...Shadows.soft,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    lineHeight: 20,
  },
  ctaSection: {
    backgroundColor: Colors.muted,
    padding: Spacing.xl,
    alignItems: 'center',
  },
  ctaSectionTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: Spacing.xs,
  },
  ctaSectionSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginBottom: Spacing.lg,
    textAlign: 'center',
  },
  exploreBt: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.primary,
    borderRadius: Radii.lg,
    height: 48,
    paddingHorizontal: Spacing.xl,
    gap: Spacing.sm,
    ...Shadows.soft,
  },
  exploreBtText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.xl,
    gap: Spacing.xs,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  registerLinkText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    color: Colors.primary,
  },
});
