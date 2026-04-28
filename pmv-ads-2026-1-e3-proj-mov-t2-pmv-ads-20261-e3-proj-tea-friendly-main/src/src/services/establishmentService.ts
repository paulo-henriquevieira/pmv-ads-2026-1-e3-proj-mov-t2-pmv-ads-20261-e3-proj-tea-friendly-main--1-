import AsyncStorage from '@react-native-async-storage/async-storage';
import { Establishment, SortOption } from '../types';
import { STORAGE_KEYS } from '../constants';

const DATA_VERSION = '2';
const VERSION_KEY = 'tea_data_version';

async function initStorage(): Promise<void> {
  const version = await AsyncStorage.getItem(VERSION_KEY);
  if (version !== DATA_VERSION) {
    await AsyncStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify([]));
    await AsyncStorage.setItem(VERSION_KEY, DATA_VERSION);
  }
}

export async function getEstablishments(): Promise<Establishment[]> {
  await initStorage();
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.ESTABLISHMENTS);
  const all: Establishment[] = raw ? JSON.parse(raw) : [];
  return all.filter(e => e.status === 'APPROVED');
}

export async function getEstablishment(id: string): Promise<Establishment | undefined> {
  await initStorage();
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.ESTABLISHMENTS);
  const all: Establishment[] = raw ? JSON.parse(raw) : [];
  return all.find(e => e.id === id);
}

export async function saveEstablishments(ests: Establishment[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEYS.ESTABLISHMENTS, JSON.stringify(ests));
}

export async function updateEstablishment(
  id: string,
  updates: Partial<Establishment>,
): Promise<void> {
  await initStorage();
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.ESTABLISHMENTS);
  const all: Establishment[] = raw ? JSON.parse(raw) : [];
  const idx = all.findIndex(e => e.id === id);
  if (idx !== -1) {
    all[idx] = { ...all[idx], ...updates };
    await saveEstablishments(all);
  }
}

export async function filterEstablishments(
  search: string,
  features: string[],
  sort: SortOption,
): Promise<Establishment[]> {
  let results = await getEstablishments();

  if (search.trim()) {
    const q = search.toLowerCase();
    results = results.filter(
      e =>
        e.name.toLowerCase().includes(q) ||
        e.city.toLowerCase().includes(q) ||
        e.neighborhood.toLowerCase().includes(q),
    );
  }

  if (features.length > 0) {
    results = results.filter(e => features.every(f => e.features.includes(f)));
  }

  switch (sort) {
    case 'best-rated':
      results.sort((a, b) => b.ratingAvg - a.ratingAvg);
      break;
    case 'most-favorited':
      results.sort((a, b) => b.favoritesCount - a.favoritesCount);
      break;
    case 'most-recent':
      results.sort(
        (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
      );
      break;
  }

  return results;
}

export async function addEstablishment(est: Establishment): Promise<void> {
  await initStorage();
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.ESTABLISHMENTS);
  const all: Establishment[] = raw ? JSON.parse(raw) : [];
  all.push(est);
  await saveEstablishments(all);
}
