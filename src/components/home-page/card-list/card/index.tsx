import React, { useContext } from 'react';
import styles from './index.module.scss';
import { ICountryDetail } from '../../../../models/ICountryDetail';
import { ThemeContext } from '../../../../context/themeContext';
import classNames from 'classnames';

interface CardProps {
  name: string;
  details: ICountryDetail;
  isVisited: boolean;
  onClick: () => void;
}

const Card: React.FC<CardProps> = ({ name, details, isVisited, onClick }) => {
  const themeContext = useContext(ThemeContext);
  const { theme } = themeContext;
  const isLight = theme === 'light';

  return (
    <div
      className={classNames(styles.cardContainer, {
        [styles.cardContainer_light]: isLight,
        [styles.visited]: isVisited,
      })}
      onClick={onClick}
    >
      <div className={styles.cardContent}>
        <div className={styles.flagContainer}>
          <img
            src={details.flags.svg}
            alt={`Flag of ${name}`}
            className={styles.flagImage}
          />
        </div>

        <div className={styles.cardHeader}>
          <h4 className={styles.cardName}>{name}</h4>
          {isVisited && <span className={styles.visitedBadge}>✅ Visited</span>}
        </div>

        <div className={styles.cardDetails}>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Population:</span>
            <span className={styles.detailValue}>
              {details.population?.toLocaleString()}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Region:</span>
            <span className={styles.detailValue}>{details.region}</span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Capital:</span>
            <span className={styles.detailValue}>
              {details.capital?.join(', ')}
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Area:</span>
            <span className={styles.detailValue}>
              {details.area?.toLocaleString()} km²
            </span>
          </div>
          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Currency:</span>
            <span className={styles.detailValue}>
              {details.currencies
                ? Object.values(details.currencies)
                    .map((currency) => `${currency.name} (${currency.symbol})`)
                    .join(', ')
                : 'N/A'}
            </span>
          </div>
          <div className={styles.mapLink}>
            <a
              href={details.maps.googleMaps}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.mapButton}
            >
              View on Google Maps
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
