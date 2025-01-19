import { useDispatch, useSelector } from 'react-redux';

import { type FC, useEffect } from 'react';

import { MessagesLayout } from '@/layouts/MessagesLayout';
import { changeIsFavoriteList } from '@/store/modules/favoriteCards/actions';
import { CardList } from '@/components/CardList';
import { Container } from '@/layouts/Container';
import {
  selectFavoriteCards,
  selectFavoriteCardsError,
  selectFavoriteCardsIsChanged,
  selectFavoriteCardsIsLoading,
} from '@/store/modules/favoriteCards/selectors';
import { getCardFavoriteList } from '@/store/modules/favoriteCards/async-actions';
import { type AppDispatch } from '@/store';
import { AppLayout } from '@/layouts/AppLayout';
import { Header } from '@/components/Header';

const EMPTY_CARDS_LIST_MESSAGE = 'Вы ещё не сохранили ни одного котика';

export const FavoritesPage: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cards = useSelector(selectFavoriteCards);
  const isLoading = useSelector(selectFavoriteCardsIsLoading);
  const error = useSelector(selectFavoriteCardsError);
  const isChanged = useSelector(selectFavoriteCardsIsChanged);

  useEffect(() => {
    dispatch(getCardFavoriteList());
  }, [dispatch, isChanged]);

  return (
    <MessagesLayout>
      <AppLayout>
        <Header />
        <Container>
          <CardList
            changeIsFavorite={changeIsFavoriteList}
            message={EMPTY_CARDS_LIST_MESSAGE}
            cards={cards}
            isLoading={isLoading}
            error={error}
          />
        </Container>
      </AppLayout>
    </MessagesLayout>
  );
};
