import AsyncStorage from '@react-native-async-storage/async-storage';
import { Review, Favorite } from '../types';
import { STORAGE_KEYS } from '../constants';
import { generateId } from '../utils';
import { updateEstablishment } from './establishmentService';

// --- Reviews ---

export async function getReviews(establishmentId: string): Promise<Review[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.REVIEWS);
  const all: Review[] = raw ? JSON.parse(raw) : [];
  return all
    .filter(r => r.establishmentId === establishmentId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export async function getUserReview(
  establishmentId: string,
  userId: string,
): Promise<Review | undefined> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.REVIEWS);
  const all: Review[] = raw ? JSON.parse(raw) : [];
  return all.find(r => r.establishmentId === establishmentId && r.userId === userId);
}

export async function submitReview(
  review: Omit<Review, 'id' | 'createdAt'>,
): Promise<Review> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.REVIEWS);
  const all: Review[] = raw ? JSON.parse(raw) : [];
  const existingIdx = all.findIndex(
    r => r.establishmentId === review.establishmentId && r.userId === review.userId,
  );

  const entry: Review = {
    ...review,
    id: existingIdx >= 0 ? all[existingIdx].id : generateId(),
    createdAt: existingIdx >= 0 ? all[existingIdx].createdAt : new Date().toISOString(),
  };

  if (existingIdx >= 0) {
    all[existingIdx] = entry;
  } else {
    all.push(entry);
  }

  await AsyncStorage.setItem(STORAGE_KEYS.REVIEWS, JSON.stringify(all));
  await recalcStats(review.establishmentId);
  return entry;
}

async function recalcStats(establishmentId: string): Promise<void> {
  const reviews = await getReviews(establishmentId);
  const ratingCount = reviews.length;
  const ratingAvg =
    ratingCount > 0
      ? Math.round(
          (reviews.reduce((s, r) => s + r.stars, 0) / ratingCount) * 10,
        ) / 10
      : 0;
  await updateEstablishment(establishmentId, { ratingAvg, ratingCount });
}

// --- Favorites ---

async function getFavoritesAll(): Promise<Favorite[]> {
  const raw = await AsyncStorage.getItem(STORAGE_KEYS.FAVORITES);
  return raw ? JSON.parse(raw) : [];
}

export async function getUserFavorites(userId: string): Promise<string[]> {
  const all = await getFavoritesAll();
  return all.filter(f => f.userId === userId).map(f => f.establishmentId);
}

export async function isFavorited(
  userId: string,
  establishmentId: string,
): Promise<boolean> {
  const all = await getFavoritesAll();
  return all.some(f => f.userId === userId && f.establishmentId === establishmentId);
}

export async function toggleFavorite(
  userId: string,
  establishmentId: string,
): Promise<boolean> {
  const all = await getFavoritesAll();
  const idx = all.findIndex(
    f => f.userId === userId && f.establishmentId === establishmentId,
  );

  let nowFav: boolean;
  if (idx >= 0) {
    all.splice(idx, 1);
    nowFav = false;
  } else {
    all.push({ userId, establishmentId });
    nowFav = true;
  }

  await AsyncStorage.setItem(STORAGE_KEYS.FAVORITES, JSON.stringify(all));

  const count = all.filter(f => f.establishmentId === establishmentId).length;
  await updateEstablishment(establishmentId, { favoritesCount: count });

  return nowFav;
}
