import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import { FEATURES } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'ProfileSetup'>;
};

const TOTAL_STEPS = 3;

export default function ProfileSetupScreen({ navigation }: Props) {
  const { user, updateProfile } = useAuth();
  const [step, setStep] = useState(1);
  const [nome, setNome] = useState(user?.name ?? '');
  const [cidade, setCidade] = useState(user?.city ?? '');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([]);

  const togglePref = (f: string) =>
    setSelectedPrefs(prev =>
      prev.includes(f) ? prev.filter(p => p !== f) : [...prev, f],
    );

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
    else navigation.goBack();
  };

  const goNext = () => setStep(s => s + 1);

  const handleFinish = async () => {
    await updateProfile({ name: nome.trim(), city: cidade.trim() });
    navigation.replace('MainTabs');
  };

  return (
    <SafeAreaView style={styles.safe}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          style={styles.container}
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          {/* Back */}
          <TouchableOpacity style={styles.backBtn} onPress={handleBack}>
            <Ionicons name="arrow-back" size={18} color={Colors.mutedForeground} />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          {/* Progress */}
          <View style={styles.progress}>
            {Array.from({ length: TOTAL_STEPS }, (_, i) => i + 1).map(s => (
              <View
                key={s}
                style={[styles.progressBar, s <= step && styles.progressBarActive]}
              />
            ))}
          </View>

          {/* Step 1 — Nome */}
          {step === 1 && (
            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <View style={styles.stepIcon}>
                  <Ionicons name="person-outline" size={24} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.stepTitle}>Seus dados</Text>
                  <Text style={styles.stepSubtitle}>Como devemos te chamar?</Text>
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Nome completo</Text>
                <TextInput
                  style={styles.input}
                  value={nome}
                  onChangeText={setNome}
                  placeholder="Seu nome"
                  placeholderTextColor={Colors.mutedForeground}
                  autoCapitalize="words"
                  returnKeyType="next"
                />
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>E-mail</Text>
                <TextInput
                  style={[styles.input, styles.disabled]}
                  value={user?.email ?? ''}
                  editable={false}
                />
              </View>

              <TouchableOpacity
                style={styles.nextBtn}
                onPress={() => {
                  if (!nome.trim()) { Alert.alert('Erro', 'Preencha seu nome'); return; }
                  goNext();
                }}
                activeOpacity={0.85}
              >
                <Text style={styles.nextBtnText}>Continuar</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 2 — Cidade */}
          {step === 2 && (
            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <View style={styles.stepIcon}>
                  <Ionicons name="location-outline" size={24} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.stepTitle}>Sua localização</Text>
                  <Text style={styles.stepSubtitle}>Para encontrar lugares perto de você</Text>
                </View>
              </View>

              <View style={styles.field}>
                <Text style={styles.label}>Cidade</Text>
                <TextInput
                  style={styles.input}
                  value={cidade}
                  onChangeText={setCidade}
                  placeholder="Ex: São Paulo"
                  placeholderTextColor={Colors.mutedForeground}
                  autoCapitalize="words"
                  returnKeyType="done"
                />
              </View>

              <TouchableOpacity style={styles.nextBtn} onPress={goNext} activeOpacity={0.85}>
                <Text style={styles.nextBtnText}>Continuar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skipBtn} onPress={goNext}>
                <Text style={styles.skipText}>Pular esta etapa</Text>
              </TouchableOpacity>
            </View>
          )}

          {/* Step 3 — Preferences */}
          {step === 3 && (
            <View style={styles.stepContent}>
              <View style={styles.stepHeader}>
                <View style={styles.stepIcon}>
                  <Ionicons name="heart-outline" size={24} color={Colors.primary} />
                </View>
                <View>
                  <Text style={styles.stepTitle}>Preferências</Text>
                  <Text style={styles.stepSubtitle}>Quais recursos são importantes para você?</Text>
                </View>
              </View>

              <View style={styles.prefGrid}>
                {FEATURES.map(f => (
                  <TouchableOpacity
                    key={f}
                    style={[
                      styles.prefChip,
                      selectedPrefs.includes(f) && styles.prefChipActive,
                    ]}
                    onPress={() => togglePref(f)}
                  >
                    <Text
                      style={[
                        styles.prefChipText,
                        selectedPrefs.includes(f) && styles.prefChipTextActive,
                      ]}
                    >
                      {f}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>

              <TouchableOpacity
                style={styles.nextBtn}
                onPress={handleFinish}
                activeOpacity={0.85}
              >
                <Text style={styles.nextBtnText}>Concluir perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.skipBtn} onPress={handleFinish}>
                <Text style={styles.skipText}>Pular e ir para o app</Text>
              </TouchableOpacity>
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { padding: Spacing.base, paddingBottom: Spacing['3xl'] },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.xl,
  },
  backText: { fontSize: Fonts.sizes.sm, color: Colors.mutedForeground },
  progress: {
    flexDirection: 'row',
    gap: 6,
    marginBottom: Spacing['2xl'],
  },
  progressBar: {
    flex: 1,
    height: 6,
    borderRadius: Radii.full,
    backgroundColor: Colors.muted,
  },
  progressBarActive: { backgroundColor: Colors.primary },
  stepContent: { gap: Spacing.lg },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    marginBottom: Spacing.sm,
  },
  stepIcon: {
    width: 48,
    height: 48,
    borderRadius: Radii.xl,
    backgroundColor: Colors.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
  },
  stepTitle: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  stepSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginTop: 2,
  },
  field: { gap: 6 },
  label: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.semibold,
    color: Colors.foreground,
  },
  input: {
    height: 48,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: Spacing.base,
    fontSize: Fonts.sizes.base,
    color: Colors.foreground,
    ...Shadows.soft,
  },
  disabled: { opacity: 0.5 },
  nextBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: Radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.soft,
  },
  nextBtnText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  skipBtn: { alignItems: 'center' },
  skipText: { fontSize: Fonts.sizes.sm, color: Colors.mutedForeground },
  prefGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
  },
  prefChip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  prefChipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  prefChipText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.foreground,
  },
  prefChipTextActive: { color: Colors.primaryForeground },
});
