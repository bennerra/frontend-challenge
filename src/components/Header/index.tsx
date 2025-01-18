import { NavLink } from 'react-router';

import * as styles from './style.module.scss';

import { Container } from '@/layouts/Container';

const Links = [
  {
    name: 'Все котики',
    link: '/',
  },
  {
    name: 'Любимые котики',
    link: '/',
  },
];

export const Header = () => {
  return (
    <header className={styles.header}>
      <Container>
        <nav className={styles.header__nav}>
          {Links.map((item) => (
            <NavLink
              key={item.name}
              className={styles.header__link}
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
