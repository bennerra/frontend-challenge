import { type FC, type PropsWithChildren } from 'react';

import * as styles from './style.module.scss';

export const AppLayout: FC<PropsWithChildren> = ({ children }) => {
  return <div className={styles.appLayout}>{children}</div>;
};
