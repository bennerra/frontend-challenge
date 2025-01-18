import { type FC, type PropsWithChildren } from 'react';

import * as styles from './style.module.scss';

export const Container: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};
