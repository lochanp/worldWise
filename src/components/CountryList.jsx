import { useCitiesContext } from '../context/CitiesContext';
import CountryItem from './CountryItem';
import styles from './CountryList.module.css';
import Message from './Message';
import Spinner from './Spinner';

const CountryList = () => {
  const context = useCitiesContext();
  const countries = context.isLoading
    ? []
    : context.cities?.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country)) {
          return [...arr, { country: city.country, emoji: city.emoji }];
        } else return arr;
      }, []);

  return (
    <ul className={styles.countryList}>
      {context.isLoading ? (
        <Spinner />
      ) : !context.isLoading && context.cities?.length <= 0 ? (
        <Message message='Add your first city by clicking on a city on the map' />
      ) : (
        countries.map((country, i) => <CountryItem country={country} key={i} />)
      )}
    </ul>
  );
};

export default CountryList;
