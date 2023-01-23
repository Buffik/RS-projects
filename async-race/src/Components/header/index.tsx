import React, { useMemo } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './styles.module.scss';

export default function Header() {
  const activeStyles = useMemo(
    () => (bool: boolean) => (bool
      ? styles.header__navigation__link__active
      : styles.header__navigation__link),
    [],
  );

  return (
    <div className={styles.header}>
      <nav className={styles.header__navigation}>
        <NavLink
          className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
          to="/"
        >
          Garage
        </NavLink>
        <NavLink
          className={({ isActive }: { isActive: boolean }) => activeStyles(isActive)}
          to="/winners"
        >
          Winners
        </NavLink>
      </nav>
    </div>
  );
}
