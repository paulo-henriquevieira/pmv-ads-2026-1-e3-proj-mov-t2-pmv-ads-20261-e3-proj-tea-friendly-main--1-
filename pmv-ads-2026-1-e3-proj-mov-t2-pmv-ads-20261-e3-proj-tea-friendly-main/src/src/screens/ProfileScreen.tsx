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
import { CompositeNavigationProp } from '@react-navigation/native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import { MainTabsParamList, RootStackParamList } from '../navigation';

type Props = {
  navigation: CompositeNavigationProp<
    BottomTabNavigationProp<MainTabsParamList, 'Profile'>,
    NativeStackNavigationProp<RootStackParamList>
  >;
};

export default function ProfileScreen({ navigation }: Props) {
  const { user, signOut, updateProfile } = useAuth();
  const [nome, setNome] = useState(user?.name ?? '');
  const [cidade, setCidade] = useState(user?.city ?? '');
  const [saving, setSaving] = useState(false);

  if (!user) {
    return (
      <SafeAreaView style={styles.safe}>
        <View style={styles.loginRequired}>
          <Ionicons name="person-outline" size={56} color={Colors.border} />
          <Text style={styles.loginTitle}>Meu perfil</Text>
          <Text style={styles.loginSubtitle}>
            Faça login para acessar e editar seu perfil.
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

  const handleSave = async () => {
    setSaving(true);
    await updateProfile({ name: nome.trim(), city: cidade.trim() });
    setSaving(false);
    Alert.alert('Sucesso', 'Perfil atualizado!');
  };

  const handleSignOut = () => {
    Alert.alert('Sair', 'Deseja sair da sua conta?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await signOut();
          navigation.navigate('Landing');
        },
      },
    ]);
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
          showsVerticalScrollIndicator={false}
        >
          {/* Avatar + info */}
          <View style={styles.avatarSection}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>
                {nome ? nome[0].toUpperCase() : 'U'}
              </Text>
            </View>
            <View>
              <Text style={styles.profileName}>{nome || 'Seu perfil'}</Text>
              <Text style={styles.profileEmail}>{user.email}</Text>
            </View>
          </View>

          {/* Form */}
          <View style={styles.form}>
            <View style={styles.field}>
              <Text style={styles.label}>Nome</Text>
              <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
                placeholder="Seu nome"
                placeholderTextColor={Colors.mutedForeground}
                autoCapitalize="words"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Cidade</Text>
              <TextInput
                style={styles.input}
                value={cidade}
                onChangeText={setCidade}
                placeholder="Sua cidade"
                placeholderTextColor={Colors.mutedForeground}
                autoCapitalize="words"
              />
            </View>

            <TouchableOpacity
              style={[styles.saveBtn, saving && styles.saveBtnDisabled]}
              onPress={handleSave}
              disabled={saving}
              activeOpacity={0.85}
            >
              <Text style={styles.saveBtnText}>
                {saving ? 'Salvando...' : 'Salvar perfil'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Register establishment link */}
          <TouchableOpacity
            style={styles.registerLink}
            onPress={() => navigation.navigate('RegisterEstablishment')}
          >
            <Ionicons name="storefront-outline" size={18} color={Colors.primary} />
            <Text style={styles.registerLinkText}>Cadastrar estabelecimento</Text>
          </TouchableOpacity>

          {/* Sign out */}
          <View style={styles.signOutSection}>
            <TouchableOpacity style={styles.signOutBtn} onPress={handleSignOut}>
              <Ionicons name="log-out-outline" size={18} color={Colors.destructive} />
              <Text style={styles.signOutText}>Sair da conta</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: Colors.background },
  container: { flex: 1 },
  content: { padding: Spacing.base, paddingBottom: Spacing['3xl'] },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.base,
    marginBottom: Spacing['2xl'],
    paddingTop: Spacing.sm,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: Radii.xl,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.soft,
  },
  avatarText: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  profileName: {
    fontSize: Fonts.sizes.xl,
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
  },
  profileEmail: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    marginTop: 2,
  },
  form: { gap: Spacing.base },
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
  saveBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: Radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    ...Shadows.soft,
  },
  saveBtnDisabled: { opacity: 0.6 },
  saveBtnText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  registerLink: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    marginTop: Spacing.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  registerLinkText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.semibold,
    color: Colors.primary,
  },
  signOutSection: {
    marginTop: Spacing.xl,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
    paddingTop: Spacing.xl,
  },
  signOutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    backgroundColor: Colors.card,
    borderRadius: Radii.lg,
    padding: Spacing.base,
    borderWidth: 1,
    borderColor: Colors.destructive + '40',
  },
  signOutText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.semibold,
    color: Colors.destructive,
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
