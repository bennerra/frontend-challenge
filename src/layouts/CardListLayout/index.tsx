import { type FC, type PropsWithChildren } from 'react';

import * as styles from './style.module.scss';

export const CardListLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.cardListLayout}>{children}</div>;
};
