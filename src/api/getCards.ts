import { apiInstance } from '@/api/apiInstance';
import { ApiRoutes } from '@/constants/apiRoutes';
import { type CardData } from '@/types/cards';

const LIMIT_CARDS = 40;

export const getCards = async (page: number) => {
  try {
    const response = await apiInstance(
      `${ApiRoutes.CARDS}search?limit=${LIMIT_CARDS}&page=${page}`,
      {
        method: 'get',
      },
    );
    if (response && response.data) {
      return response.data.map((item: CardData) => {
        return { isFavorite: false, ...item };
      });
    }
  } catch (e) {
    return e.message;
  }
};
