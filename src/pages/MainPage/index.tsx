import { useDispatch, useSelector } from 'react-redux';

import { type FC, useEffect } from 'react';

import { MessagesLayout } from '@/layouts/MessagesLayout';
import { changeIsFavorite } from '@/store/modules/cards/actions';
import { Container } from '@/layouts/Container';
import {
  selectCards,
  selectCardsError,
  selectCardsIsLoading,
} from '@/store/modules/cards/selectors';
import { getCardList } from '@/store/modules/cards/async-actions';
import { type AppDispatch } from '@/store';
import { CardList } from '@/components/CardList';
import { Header } from '@/components/Header';

export const MainPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectCards);
  const isLoading = useSelector(selectCardsIsLoading);
  const error = useSelector(selectCardsError);

  useEffect(() => {
    dispatch(getCardList());
  }, [dispatch]);

  return (
    <MessagesLayout>
      <Header />
      <Container>
        <CardList
          changeIsFavorite={changeIsFavorite}
          isLoading={isLoading}
          error={error}
          cards={cards}
        />
      </Container>
    </MessagesLayout>
  );
};
