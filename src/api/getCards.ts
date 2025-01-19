import { apiInstance } from '@/api/apiInstance';
import { type CardData } from '@/components/CardList/types';
import { ApiRoutes } from '@/constants/apiRoutes';

export const getCards = async () => {
  try {
    const response = await apiInstance(`${ApiRoutes.CARDS}search?limit=10`, {
      method: 'get',
    });
    if (response && response.data) {
      return response.data.map((item: CardData) => {
        return { isFavorite: false, ...item };
      });
    }
  } catch (e) {
    return e.message;
  }
};
