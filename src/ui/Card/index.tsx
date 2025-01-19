import { type PayloadActionCreator } from '@reduxjs/toolkit';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import { type FC } from 'react';

import * as styles from './style.module.scss';

import { Messages } from '@/ui/Card/constants';
import { addMessage } from '@/store/modules/common/messges/actions';
import type { AppDispatch } from '@/store';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/utils/favoritesIndexedDb';
import { type CardDataWithFavorite } from '@/components/CardList/types';
import { useResize } from '@/hooks/useResize';
import FavoriteEmpty from '@/assets/favorite-empty.svg';
import FavoriteFilled from '@/assets/favorite-filled.svg';

type Props = {
  card: CardDataWithFavorite;
  changeIsFavorite: PayloadActionCreator<string>;
};

const cx = classNames.bind(styles);

export const Card: FC<Props> = ({ card, changeIsFavorite }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isScreenSm } = useResize();

  const onClick = () => {
    dispatch(changeIsFavorite(card.id));

    if (card.isFavorite) {
      removeFromFavorites(card.id).then(() =>
        dispatch(addMessage(Messages.REMOVE_MESSAGE)),
      );
    }

    if (!card.isFavorite) {
      addToFavorites(card).then(() =>
        dispatch(addMessage(Messages.ADD_MESSAGE)),
      );
    }
  };

  return (
    <div className={styles.card}>
      <img
        className={styles.card__image}
        loading="lazy"
        src={card.url}
        alt="Cat card"
      />
      <div
        onClick={onClick}
        className={cx('card__favorite', { mobile: isScreenSm })}
      >
        {card.isFavorite ? <FavoriteFilled /> : <FavoriteEmpty />}
      </div>
    </div>
  );
};
