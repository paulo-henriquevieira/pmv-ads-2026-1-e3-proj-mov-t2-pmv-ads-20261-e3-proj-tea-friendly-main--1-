export interface User {
  id: string;
  name: string;
  email: string;
  city: string;
  createdAt: string;
}

export interface Establishment {
  id: string;
  name: string;
  category: string;
  city: string;
  neighborhood: string;
  description: string;
  features: string[];
  distanceKm: number;
  ratingAvg: number;
  ratingCount: number;
  favoritesCount: number;
  status: 'APPROVED' | 'PENDING' | 'REJECTED';
  createdAt: string;
  address?: string;
  phone?: string;
  whatsapp?: string;
  website?: string;
  instagram?: string;
  hours?: string;
  notes?: string;
  photos?: string[];
}

export interface Review {
  id: string;
  establishmentId: string;
  userId: string;
  userName: string;
  stars: number;
  comment: string;
  createdAt: string;
}

export interface Favorite {
  userId: string;
  establishmentId: string;
}

export type SortOption = 'best-rated' | 'most-favorited' | 'most-recent';
