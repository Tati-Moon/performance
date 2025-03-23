import React, { useContext } from 'react';
import styles from './index.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import classNames from 'classnames';

interface SortProps {
  sortBy: 'name' | 'population';
  sortOrder: 'asc' | 'desc';
  onSortChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const Sort: React.FC<SortProps> = ({ sortBy, sortOrder, onSortChange }) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  return (
    <div
      className={classNames(styles.sortContainer, {
        [styles.sortContainer_light]: isLight,
      })}
    >
      <select
        value={`${sortBy}-${sortOrder}`}
        onChange={onSortChange}
        className={styles.sortSelect}
      >
        <option value="name-asc">Sort by Name (A-Z)</option>
        <option value="name-desc">Sort by Name (Z-A)</option>
        <option value="population-asc">Sort by Population (Low to High)</option>
        <option value="population-desc">
          Sort by Population (High to Low)
        </option>
      </select>
    </div>
  );
};

export default Sort;
