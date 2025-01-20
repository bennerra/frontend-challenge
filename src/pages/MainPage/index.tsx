import { useDispatch, useSelector } from 'react-redux';

import { type FC, useEffect, useState } from 'react';

import { CardVirtualList } from '@/components/CardVirtualList';
import { CardListLayout } from '@/layouts/CardListLayout';
import { MessagesLayout } from '@/layouts/MessagesLayout';
import { changeIsFavorite } from '@/store/modules/cards/actions';
import {
  selectCards,
  selectCardsError,
  selectCardsIsLoading,
} from '@/store/modules/cards/selectors';
import { getCardList } from '@/store/modules/cards/async-actions';
import { type AppDispatch } from '@/store';
import { Header } from '@/components/Header';

export const MainPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectCards);
  const isLoading = useSelector(selectCardsIsLoading);
  const error = useSelector(selectCardsError);
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getCardList(page));
  }, [dispatch, page]);

  return (
    <MessagesLayout>
      <Header />
      <CardListLayout>
        <CardVirtualList
          changeIsFavorite={changeIsFavorite}
          isLoading={isLoading}
          error={error}
          cards={cards}
          setPage={setPage}
        />
      </CardListLayout>
    </MessagesLayout>
  );
};
