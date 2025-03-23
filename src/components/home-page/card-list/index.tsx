import React from 'react';
import Card from './card';
import styles from './index.module.scss';
import loadGif from '../../../assets/icons/load.gif';
import { ICountryDetail } from '../../../models/ICountryDetail';

interface CardListProps {
  results: Array<ICountryDetail>;
  loading: boolean;
  error: string | null;
}

const CardList: React.FC<CardListProps> = ({ results, loading, error }) => {
  if (loading) {
    return (
      <div className={styles.loading}>
        <img src={loadGif} alt="Loading" className={styles.loadGif} />
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.error}>
        Oops! Something went wrong. Please check your internet connection.
        <br />
        Try refreshing the page or checking your connection.
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className={styles.error}>
        No results found. Please try a different search query.
        <br />
        If the issue persists, check your internet connection and refresh the
        page.
      </div>
    );
  }

  return (
    <div>
      <div className={styles.cardList}>
        {results.map((item) => (
          <Card key={item.cca3} name={item.name.common} details={item} />
        ))}
      </div>
    </div>
  );
};

export default CardList;
