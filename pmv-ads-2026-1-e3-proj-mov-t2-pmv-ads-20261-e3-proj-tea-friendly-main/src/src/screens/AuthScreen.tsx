import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Colors, Fonts, Spacing, Radii, Shadows } from '../theme';
import { useAuth } from '../contexts/AuthContext';
import { RootStackParamList } from '../navigation';

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Auth'>;
};

export default function AuthScreen({ navigation }: Props) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { signIn, signUp } = useAuth();

  const handleSubmit = async () => {
    if (isSignUp) {
      if (!nome.trim()) { Alert.alert('Erro', 'Preencha seu nome'); return; }
      if (!email.trim()) { Alert.alert('Erro', 'Preencha o e-mail'); return; }
      if (password.length < 6) { Alert.alert('Erro', 'Senha deve ter ao menos 6 caracteres'); return; }
      setLoading(true);
      const { error } = await signUp(nome.trim(), email.trim(), password);
      setLoading(false);
      if (error) { Alert.alert('Erro', error); return; }
      navigation.replace('ProfileSetup');
    } else {
      if (!email.trim()) { Alert.alert('Erro', 'Preencha o e-mail'); return; }
      if (!password) { Alert.alert('Erro', 'Preencha a senha'); return; }
      setLoading(true);
      const { error } = await signIn(email.trim(), password);
      setLoading(false);
      if (error) { Alert.alert('Erro', error); return; }
      navigation.replace('MainTabs');
    }
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
          <View style={styles.logoSection}>
            <View style={styles.logoBox}>
              <Text style={styles.logoEmoji}>🩵</Text>
            </View>
            <Text style={styles.title}>{isSignUp ? 'Criar conta' : 'Entrar'}</Text>
            <Text style={styles.subtitle}>
              {isSignUp
                ? 'Junte-se à comunidade TEA Friendly'
                : 'Bem-vindo(a) de volta!'}
            </Text>
          </View>

          <View style={styles.form}>
            {isSignUp && (
              <View style={styles.field}>
                <Text style={styles.label}>Nome</Text>
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
            )}

            <View style={styles.field}>
              <Text style={styles.label}>E-mail</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="seu@email.com"
                placeholderTextColor={Colors.mutedForeground}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            <View style={styles.field}>
              <Text style={styles.label}>Senha</Text>
              <View style={styles.passwordWrap}>
                <TextInput
                  style={[styles.input, styles.passwordInput]}
                  value={password}
                  onChangeText={setPassword}
                  placeholder="••••••••"
                  placeholderTextColor={Colors.mutedForeground}
                  secureTextEntry={!showPassword}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />
                <TouchableOpacity
                  style={styles.eyeBtn}
                  onPress={() => setShowPassword(v => !v)}
                >
                  <Ionicons
                    name={showPassword ? 'eye-off-outline' : 'eye-outline'}
                    size={20}
                    color={Colors.mutedForeground}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <TouchableOpacity
              style={[styles.submitBtn, loading && styles.submitDisabled]}
              onPress={handleSubmit}
              disabled={loading}
              activeOpacity={0.85}
            >
              {loading ? (
                <ActivityIndicator color={Colors.primaryForeground} />
              ) : (
                <Text style={styles.submitText}>
                  {isSignUp ? 'Criar conta' : 'Entrar'}
                </Text>
              )}
            </TouchableOpacity>
          </View>

          <View style={styles.toggleRow}>
            <Text style={styles.togglePrompt}>
              {isSignUp ? 'Já tem conta?' : 'Não tem conta?'}
            </Text>
            <TouchableOpacity onPress={() => setIsSignUp(v => !v)}>
              <Text style={styles.toggleLink}>
                {isSignUp ? 'Fazer login' : 'Criar conta'}
              </Text>
            </TouchableOpacity>
          </View>

          {!isSignUp && (
            <TouchableOpacity
              style={styles.skipRow}
              onPress={() => navigation.replace('MainTabs')}
            >
              <Text style={styles.skipText}>Não quero me cadastrar</Text>
            </TouchableOpacity>
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
  logoSection: {
    alignItems: 'center',
    marginBottom: Spacing['2xl'],
  },
  logoBox: {
    width: 72,
    height: 72,
    borderRadius: Radii.xl,
    backgroundColor: Colors.primary + '20',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.base,
  },
  logoEmoji: { fontSize: 40 },
  title: {
    fontSize: Fonts.sizes['2xl'],
    fontWeight: Fonts.weights.bold,
    color: Colors.foreground,
    marginBottom: 4,
  },
  subtitle: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
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
  passwordWrap: {
    position: 'relative',
  },
  passwordInput: {
    paddingRight: 48,
  },
  eyeBtn: {
    position: 'absolute',
    right: Spacing.base,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  submitBtn: {
    height: 52,
    backgroundColor: Colors.primary,
    borderRadius: Radii.lg,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: Spacing.sm,
    ...Shadows.soft,
  },
  submitDisabled: { opacity: 0.6 },
  submitText: {
    fontSize: Fonts.sizes.base,
    fontWeight: Fonts.weights.bold,
    color: Colors.primaryForeground,
  },
  toggleRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: Spacing.xl,
    gap: 6,
  },
  togglePrompt: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
  },
  toggleLink: {
    fontSize: Fonts.sizes.sm,
    fontWeight: Fonts.weights.bold,
    color: Colors.primary,
  },
  skipRow: {
    alignItems: 'center',
    marginTop: Spacing.base,
  },
  skipText: {
    fontSize: Fonts.sizes.sm,
    color: Colors.mutedForeground,
    textDecorationLine: 'underline',
  },
});
