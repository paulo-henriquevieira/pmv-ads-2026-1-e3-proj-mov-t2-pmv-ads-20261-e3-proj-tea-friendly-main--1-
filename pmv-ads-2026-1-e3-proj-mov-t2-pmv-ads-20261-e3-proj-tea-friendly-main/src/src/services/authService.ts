import AsyncStorage from '@react-native-async-storage/async-storage';
import { User } from '../types';
import { STORAGE_KEYS } from '../constants';
import { generateId } from '../utils';

async function getUsers(): Promise<User[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.USERS);
  return raw ? JSON.parse(raw) : [];
}

async function saveUsers(users: User[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

export async function getCurrentUser(): Promise<User | null> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  return raw ? JSON.parse(raw) : null;
}

export async function signUp(
  name: string,
  email: string,
  _password: string,
): Promise<{ user?: User; error?: string }> {
  const users = await getUsers();
  if (users.find(u => u.email === email)) {
    return { error: 'E-mail já cadastrado' };
  }
  const user: User = {
    id: generateId(),
    name,
    email,
    city: '',
    createdAt: new Date().toISOString(),
  };
  users.push(user);
  await saveUsers(users);
  await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return { user };
}

export async function signIn(
  email: string,
  _password: string,
): Promise<{ user?: User; error?: string }> {
  const users = await getUsers();
  const user = users.find(u => u.email === email);
  if (!user) return { error: 'E-mail ou senha incorretos' };
  await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  return { user };
}

export async function signOut(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
}

export async function updateProfile(
  currentUser: User,
  updates: Partial<User>,
): Promise<User | null> {
  const users = await getUsers();
  const idx = users.findIndex(u => u.id === currentUser.id);
  if (idx === -1) return null;
  const updated = { ...users[idx], ...updates };
  users[idx] = updated;
  await saveUsers(users);
  await AsyncStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(updated));
  return updated;
}
