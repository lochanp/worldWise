import { useCitiesContext } from '../context/CitiesContext';
import CityItem from './CityItem';
import styles from './CityList.module.css';
import Message from './Message';
import Spinner from './Spinner';

const CityList = () => {
  const context = useCitiesContext();

  return (
    <ul className={styles.cityList}>
      {context.isLoading ? (
        <Spinner />
      ) : !context.isLoading && context.cities?.length <= 0 ? (
        <Message message='Add your first city by clicking on a city on the map' />
      ) : (
        context.cities?.cities.map((city, i) => <CityItem city={city} key={i} />)
      )}
    </ul>
  );
};

export default CityList;
