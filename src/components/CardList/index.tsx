import { type PayloadActionCreator } from '@reduxjs/toolkit';

import { type FC } from 'react';

import * as styles from './style.module.scss';

import { type CardDataWithFavorite } from '@/types/cards';
import { Card } from '@/ui/Card';

type Props = {
  cards: CardDataWithFavorite[] | null;
  isLoading: boolean;
  error: string | null;
  message?: string;
  changeIsFavorite: PayloadActionCreator<string>;
};

export const CardList: FC<Props> = ({
  cards,
  error,
  isLoading,
  message,
  changeIsFavorite,
}) => {
  if (isLoading) {
    return <div className={styles.cardList__message}>Загрузка...</div>;
  }

  if (error) {
    return (
      <div className={styles.cardList__message}>Что-то пошло не так :(</div>
    );
  }

  if (!isLoading && !error && !cards?.length) {
    return <div className={styles.cardList__message}>{message}</div>;
  }

  return (
    <>
      {cards && (
        <div className={styles.cardList}>
          {cards.map((item, index) => (
            <Card
              index={index}
              changeIsFavorite={changeIsFavorite}
              key={item.id}
              card={item}
            />
          ))}
        </div>
      )}
    </>
  );
};
