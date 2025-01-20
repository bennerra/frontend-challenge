import { type PayloadActionCreator } from '@reduxjs/toolkit';
import classNames from 'classnames/bind';
import { useDispatch } from 'react-redux';

import {
  type Dispatch,
  type FC,
  memo,
  type SetStateAction,
  useEffect,
  useRef,
} from 'react';

import * as styles from './style.module.scss';

import { type CardDataWithFavorite } from '@/types/cards';
import FavoriteEmpty from '@/assets/favorite-empty.svg';
import FavoriteFilled from '@/assets/favorite-filled.svg';
import { useResize } from '@/hooks/useResize';
import type { AppDispatch } from '@/store';
import { addMessage } from '@/store/modules/common/messges/actions';
import { Messages } from '@/ui/Card/constants';
import {
  addToFavorites,
  removeFromFavorites,
} from '@/utils/favoritesIndexedDb';

type Props = {
  card: CardDataWithFavorite;
  index: number;
  changeIsFavorite: PayloadActionCreator<string>;
  setCardHeight?: Dispatch<SetStateAction<number | null>> | null;
};

const GAP_VALUE = 52;
const GAP_VALUE_SM = 20;

const cx = classNames.bind(styles);

export const Card: FC<Props> = memo(
  ({ card, index, changeIsFavorite, setCardHeight }: Props) => {
    const dispatch = useDispatch<AppDispatch>();
    const { isScreenSm } = useResize();
    const cardRef = useRef<HTMLDivElement>(null);
    const gap = isScreenSm ? GAP_VALUE_SM : GAP_VALUE;

    useEffect(() => {
      if (setCardHeight && cardRef.current) {
        setCardHeight(cardRef.current.offsetHeight + gap);
      }
    }, [gap, setCardHeight]);

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
      <div ref={cardRef} id={`card${index}`} className={styles.card}>
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
  },
);
Card.displayName = 'Row';
