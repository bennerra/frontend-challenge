import classNames from 'classnames/bind';
import { NavLink, useLocation } from 'react-router';

import * as styles from './style.module.scss';

import { AppRoutes } from '@/constants/paths';
import { Container } from '@/layouts/Container';

const Links = [
  {
    name: 'Все котики',
    link: AppRoutes.MAIN,
  },
  {
    name: 'Любимые котики',
    link: AppRoutes.FAVORITES,
  },
];

const cx = classNames.bind(styles);

export const Header = () => {
  const { pathname } = useLocation();

  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.header__nav}>
          {Links.map((item) => (
            <NavLink
              key={item.name}
              className={cx('header__link', {
                isActive: pathname === item.link,
              })}
              to={item.link}
            >
              {item.name}
            </NavLink>
          ))}
        </nav>
      </Container>
    </header>
  );
};
