import { type PayloadActionCreator } from '@reduxjs/toolkit';
import AutoSizer from 'react-virtualized-auto-sizer';
import { FixedSizeList as List } from 'react-window';

import {
  type CSSProperties,
  type Dispatch,
  type FC,
  memo,
  type Ref,
  type SetStateAction,
  useCallback,
  useState,
} from 'react';

import * as styles from './style.module.scss';

import { ColumnsBreakpoints } from '@/components/CardVirtualList/constants';
import { type EScreenSize } from '@/common/e-screen-size';
import { useResize } from '@/hooks/useResize';
import { type CardDataWithFavorite } from '@/types/cards';
import { Card } from '@/ui/Card';

type Props = {
  loader?: Ref<HTMLDivElement>;
  loaderValue?: HTMLDivElement | null;
  cards: CardDataWithFavorite[] | null;
  isLoading: boolean;
  error: string | null;
  message?: string;
  changeIsFavorite: PayloadActionCreator<string>;
  cardHeight?: number | null;
  setPage: Dispatch<SetStateAction<number>>;
};

const DEFAULT_CARD_WIDTH = 225;
const DEFAULT_COLUMNS_QUANTITY = 225;

export const CardVirtualList: FC<Props> = ({
  cards,
  error,
  isLoading,
  message,
  changeIsFavorite,
  setPage,
}) => {
  const [cardHeight, setCardHeight] = useState<number | null>(null);
  const incrementPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, [setPage]);
  const { screenSize } = useResize();
  const columnsQuantity =
    ColumnsBreakpoints[screenSize as EScreenSize] || DEFAULT_COLUMNS_QUANTITY;

  const Row = memo(
    ({ index, style }: { index: number; style: CSSProperties }) => {
      let rowCards;
      if (cards) {
        rowCards = cards.slice(
          index * columnsQuantity,
          index * columnsQuantity + columnsQuantity,
        );
      }

      return (
        <>
          {rowCards && (
            <div className={styles.cardList__row} style={style}>
              {rowCards.map((item) => (
                <Card
                  setCardHeight={index === 0 ? setCardHeight : null}
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
    },
  );
  Row.displayName = 'Row';

  if (isLoading && !cards?.length) {
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

  const countRows = Math.ceil((cards?.length || 0) / 5);

  return (
    <>
      {cards && (
        <>
          <AutoSizer>
            {({ height, width }) => (
              <div className={styles.cardList__container}>
                <List
                  className={styles.cardList}
                  height={height}
                  itemCount={countRows}
                  itemSize={cardHeight || DEFAULT_CARD_WIDTH}
                  width={width}
                  onItemsRendered={(info) => {
                    if (!isLoading && info.overscanStopIndex >= countRows - 2) {
                      incrementPage();
                    }
                  }}
                >
                  {Row}
                </List>
                {isLoading && <div>Загрузка...</div>}
              </div>
            )}
          </AutoSizer>
        </>
      )}
    </>
  );
};
