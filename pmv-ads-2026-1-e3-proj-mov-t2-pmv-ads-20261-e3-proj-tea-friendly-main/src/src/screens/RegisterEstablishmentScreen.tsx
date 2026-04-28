import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import { FEATURES, CATEGORIES } from '../constants';
import { useAuth } from '../contexts/AuthContext';
import { addEstablishment } from '../services/establishmentService';
import { generateId } from '../utils';
import { Establishment } from '../types';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'RegisterEstablishment'>;
};

export default function RegisterEstablishmentScreen({ navigation }: Props) {
  const { user } = useAuth();

  const [nome, setNome] = useState('');
  const [categoria, setCategoria] = useState('');
  const [descricao, setDescricao] = useState('');

  const [cep, setCep] = useState('');
  const [endereco, setEndereco] = useState('');
  const [bairro, setBairro] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');

  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [observacoes, setObservacoes] = useState('');

  const [telefone, setTelefone] = useState('');
  const [whatsapp, setWhatsapp] = useState('');
  const [website, setWebsite] = useState('');
  const [instagram, setInstagram] = useState('');
  const [horario, setHorario] = useState('');

  const [loading, setLoading] = useState(false);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loginRequired}>
          <Ionicons name="storefront-outline" size={56} color={Colors.border} />
          <Text style={styles.loginTitle}>Cadastrar estabelecimento</Text>
          <Text style={styles.loginSubtitle}>
            Faça login para cadastrar seu estabelecimento.
          </Text>
          <TouchableOpacity
            style={styles.loginBtn}
            onPress={() => navigation.navigate('Auth')}
          >
            <Text style={styles.loginBtnText}>Fazer login</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  const toggleFeature = (f: string) =>
    setSelectedFeatures(prev =>
      prev.includes(f) ? prev.filter(p => p !== f) : [...prev, f],
    );

  const handleSubmit = async () => {
    if (!nome.trim()) { Alert.alert('Erro', 'Preencha o nome do estabelecimento'); return; }
    if (!categoria) { Alert.alert('Erro', 'Selecione uma categoria'); return; }
    if (!descricao.trim()) { Alert.alert('Erro', 'Adicione uma descrição'); return; }
    if (!cidade.trim()) { Alert.alert('Erro', 'Preencha a cidade'); return; }
    if (!bairro.trim()) { Alert.alert('Erro', 'Preencha o bairro'); return; }
    if (selectedFeatures.length === 0) {
      Alert.alert('Erro', 'Selecione ao menos um recurso inclusivo');
      return;
    }

    const newEst: Establishment = {
      id: generateId(),
      name: nome.trim(),
      category: categoria,
      city: cidade.trim(),
      neighborhood: bairro.trim(),
      description: descricao.trim(),
      features: selectedFeatures,
      distanceKm: +(Math.random() * 7 + 0.5).toFixed(1),
      ratingAvg: 0,
      ratingCount: 0,
      favoritesCount: 0,
      status: 'PENDING',
      createdAt: new Date().toISOString(),
      address: endereco.trim() || undefined,
      phone: telefone.trim() || undefined,
      whatsapp: whatsapp.trim() || undefined,
      website: website.trim() || undefined,
      instagram: instagram.trim() || undefined,
      hours: horario.trim() || undefined,
      notes: observacoes.trim() || undefined,
    };

    setLoading(true);
    await addEstablishment(newEst);
    setLoading(false);
    Alert.alert(
      'Enviado!',
      'Estabelecimento enviado para aprovação!',
      [{ text: 'OK', onPress: () => navigation.navigate('MainTabs') }],
    );
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
          {/* Header */}
          <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="arrow-back" size={18} color={Colors.mutedForeground} />
            <Text style={styles.backText}>Voltar</Text>
          </TouchableOpacity>

          <View style={styles.pageHeader}>
            <View style={styles.pageIcon}>
              <Ionicons name="storefront-outline" size={28} color={Colors.primary} />
            </View>
            <Text style={styles.pageTitle}>Cadastrar estabelecimento</Text>
            <Text style={styles.pageSubtitle}>
              Preencha as informações abaixo. Campos com * são obrigatórios.
            </Text>
          </View>

          {/* Seção 1 — Dados principais */}
          <SectionHeader icon="storefront-outline" title="Dados do estabelecimento" />

          <Field label="Nome do estabelecimento *">
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={setNome}
              placeholder="Ex: Restaurante Sabor Calmo"
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="words"
            />
          </Field>

          <View>
            <Text style={styles.label}>Categoria *</Text>
            <View style={styles.chipGrid}>
              {CATEGORIES.map(c => (
                <TouchableOpacity
                  key={c}
                  style={[styles.chip, categoria === c && styles.chipActive]}
                  onPress={() => setCategoria(c)}
                >
                  <Text style={[styles.chipText, categoria === c && styles.chipTextActive]}>
                    {c}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          <Field label="Descrição *">
            <TextInput
              style={[styles.input, styles.textArea]}
              value={descricao}
              onChangeText={setDescricao}
              placeholder="Descreva o ambiente, diferenciais e o que torna este lugar acolhedor para pessoas com TEA..."
              placeholderTextColor={Colors.mutedForeground}
              multiline
              numberOfLines={5}
              textAlignVertical="top"
              maxLength={1000}
            />
            <Text style={styles.charCount}>{descricao.length}/1000</Text>
          </Field>

          {/* Seção 2 — Localização */}
          <SectionHeader icon="location-outline" title="Localização" />

          <Field label="CEP">
            <TextInput
              style={styles.input}
              value={cep}
              onChangeText={setCep}
              placeholder="00000-000"
              placeholderTextColor={Colors.mutedForeground}
              keyboardType="numeric"
            />
          </Field>

          <Field label="Endereço completo">
            <TextInput
              style={styles.input}
              value={endereco}
              onChangeText={setEndereco}
              placeholder="Rua, número, complemento"
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="words"
            />
          </Field>

          <View style={styles.twoCol}>
            <View style={{ flex: 1 }}>
              <Field label="Bairro *">
                <TextInput
                  style={styles.input}
                  value={bairro}
                  onChangeText={setBairro}
                  placeholder="Ex: Pinheiros"
                  placeholderTextColor={Colors.mutedForeground}
                  autoCapitalize="words"
                />
              </Field>
            </View>
            <View style={{ flex: 1 }}>
              <Field label="Cidade *">
                <TextInput
                  style={styles.input}
                  value={cidade}
                  onChangeText={setCidade}
                  placeholder="Ex: São Paulo"
                  placeholderTextColor={Colors.mutedForeground}
                  autoCapitalize="words"
                />
              </Field>
            </View>
          </View>

          <Field label="Estado">
            <TextInput
              style={styles.input}
              value={estado}
              onChangeText={setEstado}
              placeholder="Ex: SP"
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="characters"
              maxLength={2}
            />
          </Field>

          {/* Seção 3 — Características TEA */}
          <SectionHeader icon="document-text-outline" title="Características TEA Friendly" />

          <Text style={styles.featureLabel}>
            Marque os recursos inclusivos disponíveis: *
          </Text>
          <View style={styles.chipGrid}>
            {FEATURES.map(f => (
              <TouchableOpacity
                key={f}
                style={[styles.chip, selectedFeatures.includes(f) && styles.chipActive]}
                onPress={() => toggleFeature(f)}
              >
                <Text
                  style={[
                    styles.chipText,
                    selectedFeatures.includes(f) && styles.chipTextActive,
                  ]}
                >
                  {f}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <Field label="Observações sobre acessibilidade">
            <TextInput
              style={[styles.input, styles.textArea]}
              value={observacoes}
              onChangeText={setObservacoes}
              placeholder="Descreva adaptações específicas, treinamento da equipe, iluminação ajustável..."
              placeholderTextColor={Colors.mutedForeground}
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </Field>

          {/* Seção 4 — Contato */}
          <SectionHeader icon="call-outline" title="Contato" />

          <View style={styles.twoCol}>
            <View style={{ flex: 1 }}>
              <Field label="Telefone">
                <TextInput
                  style={styles.input}
                  value={telefone}
                  onChangeText={setTelefone}
                  placeholder="(11) 9999-9999"
                  placeholderTextColor={Colors.mutedForeground}
                  keyboardType="phone-pad"
                />
              </Field>
            </View>
            <View style={{ flex: 1 }}>
              <Field label="WhatsApp">
                <TextInput
                  style={styles.input}
                  value={whatsapp}
                  onChangeText={setWhatsapp}
                  placeholder="(11) 99999-9999"
                  placeholderTextColor={Colors.mutedForeground}
                  keyboardType="phone-pad"
                />
              </Field>
            </View>
          </View>

          <Field label="Website">
            <TextInput
              style={styles.input}
              value={website}
              onChangeText={setWebsite}
              placeholder="https://..."
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="none"
              keyboardType="url"
            />
          </Field>

          <Field label="Instagram">
            <TextInput
              style={styles.input}
              value={instagram}
              onChangeText={setInstagram}
              placeholder="@perfil"
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="none"
            />
          </Field>

          <Field label="Horário de funcionamento">
            <TextInput
              style={styles.input}
              value={horario}
              onChangeText={setHorario}
              placeholder="Seg-Sex 9h-18h"
              placeholderTextColor={Colors.mutedForeground}
              autoCapitalize="none"
            />
          </Field>

          {/* Submit */}
          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitDisabled]}
            onPress={handleSubmit}
            disabled={loading}
            activeOpacity={0.85}
          >
            <Text style={styles.submitBtnText}>
              {loading ? 'Enviando...' : 'Enviar para aprovação'}
            </Text>
          </TouchableOpacity>
          <Text style={styles.submissionNote}>
            O estabelecimento ficará pendente até ser aprovado pela moderação.
          </Text>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

function SectionHeader({ icon, title }: { icon: React.ComponentProps<typeof Ionicons>['name']; title: string }) {
  return (
    <View style={styles.sectionHeader}>
      <View style={styles.sectionIcon}>
        <Ionicons name={icon} size={20} color={Colors.primary} />
      </View>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <View style={styles.field}>
      <Text style={styles.label}>{label}</Text>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { padding: Spacing.base, paddingBottom: Spacing['3xl'], gap: Spacing.base },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: Spacing.sm,
  },
  backText: { fontSize: Fonts.sizes.sm, color: Colors.mutedForeground },
  pageHeader: {
    alignItems: 'center',
    marginBottom: Spacing.base,
    gap: Spacing.sm,
  },
  pageIcon: {
    width: 60,
    height: 60,
    borderRadius: Radii.xl,
    backgroundColor: Colors.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  pageTitle: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    textAlign: 'center',
  },
  pageSubtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    textAlign: 'center',
    lineHeight: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    marginTop: Spacing.sm,
    paddingBottom: Spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  sectionIcon: {
    width: 36,
    height: 36,
    borderRadius: Radii.lg,
    backgroundColor: Colors.primary + '18',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionTitle: {
    fontSize: Fonts.sizes.lg,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
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
  textArea: {
    height: undefined,
    minHeight: 80,
    paddingTop: Spacing.sm,
    paddingBottom: Spacing.sm,
  },
  charCount: {
    fontSize: Fonts.sizes.xs,
    color: Colors.mutedForeground,
    textAlign: 'right',
  },
  chipGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.sm,
    marginTop: 6,
  },
  chip: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: Radii.lg,
    borderWidth: 1,
    borderColor: Colors.border,
    backgroundColor: Colors.card,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.medium,
    color: Colors.foreground,
  },
  chipTextActive: { color: Colors.primaryForeground },
  twoCol: { flexDirection: 'row', gap: Spacing.sm },
  featureLabel: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
  submitBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: Radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.base,
    ...Shadows.soft,
  },
  submitDisabled: { opacity: 0.6 },
  submitBtnText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  submissionNote: {
    fontSize: Fonts.sizes.xs,
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
