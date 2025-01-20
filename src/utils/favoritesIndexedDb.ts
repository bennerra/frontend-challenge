import { type CardDataWithFavorite } from '@/types/cards';

const DB_NAME = 'FavoritesDB';
const DB_VERSION = 2;
const STORE_NAME = 'favorites';

const openDB = (): Promise<IDBDatabase> =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result;
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };

    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error);
  });

export const addToFavorites = async (card: CardDataWithFavorite) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<void>((resolve, reject) => {
    const request = store.add({ ...card, isFavorite: true });
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const removeFromFavorites = async (id: string) => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readwrite');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<void>((resolve, reject) => {
    const request = store.delete(id);
    request.onsuccess = () => resolve();
    request.onerror = () => reject(request.error);
  });
};

export const getFavorites = async () => {
  const db = await openDB();
  const transaction = db.transaction(STORE_NAME, 'readonly');
  const store = transaction.objectStore(STORE_NAME);

  return new Promise<CardDataWithFavorite[]>((resolve, reject) => {
    const request = store.getAll();
    request.onsuccess = () => resolve(request.result as CardDataWithFavorite[]);
    request.onerror = () => reject(request.error);
  });
};
