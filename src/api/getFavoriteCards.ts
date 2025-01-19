import { getFavorites } from '@/utils/favoritesIndexedDb';

export const getFavoriteCards = async () => {
  try {
    return await getFavorites();
  } catch (e) {
    return e;
  }
};
