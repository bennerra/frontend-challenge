import { useDispatch, useSelector } from 'react-redux';

import { type FC, type PropsWithChildren, useEffect, useRef } from 'react';

import * as styles from './styles.module.scss';

import { removeMessage } from '@/store/modules/common/messges/actions';
import { type AppDispatch } from '@/store';
import { selectMessage } from '@/store/modules/common/messges/selectors';

export const MessagesLayout: FC<PropsWithChildren> = ({ children }) => {
  const message = useSelector(selectMessage);
  const dispatch = useDispatch<AppDispatch>();
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (message) {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => dispatch(removeMessage()), 3000);
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [dispatch, message]);

  return (
    <div className={styles.messagesLayout}>
      {message && (
        <div className={styles.messagesLayout__message}>{message}</div>
      )}
      {children}
    </div>
  );
};
