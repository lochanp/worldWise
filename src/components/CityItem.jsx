import { Link } from 'react-router-dom';
import styles from './CityItem.module.css';
import { useCitiesContext } from '../context/CitiesContext';

const formatDate = date =>
  new Intl.DateTimeFormat('en', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).format(new Date(date));

const CityItem = ({ city }) => {
  const context = useCitiesContext();

  const handleDeleteCity = e => {
    e.preventDefault();
    context.deleteCity(city.id);
  };

  return (
    <li>
      <Link
        to={`${city.id}?lat=${city.position.lat}&lng=${city.position.lng}`}
        className={`${styles.cityItem} ${context.currentCity.id === city.id ? styles['cityItem--active'] : ''}`}
      >
        <span className={styles.emoji}>{city.emoji}</span>
        <h3 className={styles.name}>{city.cityName}</h3>
        <time className={styles.date}>{formatDate(city.date)}</time>
        <button className={styles.deleteBtn} onClick={handleDeleteCity}>
          &times;
        </button>
      </Link>
    </li>
  );
};

export default CityItem;
