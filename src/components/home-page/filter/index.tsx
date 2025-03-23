import React, { useContext } from 'react';
import styles from './index.module.scss';
import { ThemeContext } from '../../../context/themeContext';
import classNames from 'classnames';

interface FilterProps {
  selectedRegion: string;
  onRegionChange: (region: string) => void;
}

const Filter: React.FC<FilterProps> = ({ selectedRegion, onRegionChange }) => {
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';

  return (
    <div
      className={classNames(styles.filterContainer, {
        [styles.filterContainer_light]: isLight,
      })}
    >
      <select
        value={selectedRegion}
        onChange={(e) => onRegionChange(e.target.value)}
        className={styles.filterSelect}
      >
        <option value="">All Regions</option>
        <option value="Africa">Africa</option>
        <option value="Americas">Americas</option>
        <option value="Asia">Asia</option>
        <option value="Europe">Europe</option>
        <option value="Oceania">Oceania</option>
      </select>
    </div>
  );
};

export default Filter;
