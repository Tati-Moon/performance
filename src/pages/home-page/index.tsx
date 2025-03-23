import React, { useState, useContext, useMemo, useCallback } from 'react';
import logoIcon from '../../assets/icons/logo.png';
import Search from '../../components/home-page/search';
import ThemeToggle from '../../components/shared/themeToggle';
import { ThemeContext } from '../../context/themeContext';
import classNames from 'classnames';
import styles from './index.module.scss';
import CardList from '../../components/home-page/card-list';
import { useFetchAllCountriesQuery } from '../../services/countriesAPI';

const HomePage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const { theme } = useContext(ThemeContext);
  const isLight = theme === 'light';
  const { data: countries, error, isLoading } = useFetchAllCountriesQuery();

  const filteredCountries = useMemo(() => {
    if (!countries) return [];
    return countries.filter((country) => {
      const matchesSearch = country.name.common
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRegion = selectedRegion
        ? country.region === selectedRegion
        : true;
      return matchesSearch && matchesRegion;
    });
  }, [countries, searchTerm, selectedRegion]);

  const [sortBy, setSortBy] = useState<'name' | 'population'>('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');

  const sortedCountries = useMemo(() => {
    return [...filteredCountries].sort((a, b) => {
      if (sortBy === 'name') {
        return sortOrder === 'asc'
          ? a.name.common.localeCompare(b.name.common)
          : b.name.common.localeCompare(a.name.common);
      } else {
        return sortOrder === 'asc'
          ? a.population - b.population
          : b.population - a.population;
      }
    });
  }, [filteredCountries, sortBy, sortOrder]);

  const handleSearch = useCallback((term: string) => {
    setSearchTerm(term); // Убрано сохранение в localStorage
  }, []);

  const handleRegionChange = useCallback((region: string) => {
    setSelectedRegion(region);
  }, []);

  const handleSortChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const [sortBy, sortOrder] = e.target.value.split('-');
      setSortBy(sortBy as 'name' | 'population');
      setSortOrder(sortOrder as 'asc' | 'desc');
    },
    []
  );

  return (
    <>
      <div
        className={classNames(styles.topMenu, {
          [styles.topMenu_light]: isLight,
        })}
      >
        <div className={styles.logo}>
          <img src={logoIcon} alt="logo" className={styles.logoIcon} />
        </div>
        <div className={styles.toggle}>
          <div className={styles.themeToggle}>
            <ThemeToggle />
          </div>
        </div>
        <Search onSearch={handleSearch} />
        <div className={styles.filterContainer}>
          <select
            value={selectedRegion}
            onChange={(e) => handleRegionChange(e.target.value)}
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
        <div className={styles.sortContainer}>
          <select
            value={`${sortBy}-${sortOrder}`}
            onChange={handleSortChange}
            className={styles.sortSelect}
          >
            <option value="name-asc">Sort by Name (A-Z)</option>
            <option value="name-desc">Sort by Name (Z-A)</option>
            <option value="population-asc">
              Sort by Population (Low to High)
            </option>
            <option value="population-desc">
              Sort by Population (High to Low)
            </option>
          </select>
        </div>
      </div>
      <h1>Country Search</h1>

      <div className={styles.homePage}>
        <div className={styles.leftSection}>
          <CardList
            results={sortedCountries}
            loading={isLoading}
            error={error ? 'Failed to fetch data.' : null}
          />
        </div>
      </div>
    </>
  );
};

export default HomePage;