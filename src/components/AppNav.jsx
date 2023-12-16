import { NavLink } from 'react-router-dom';
import Styles from './AppNav.module.css';

const AppNav = () => {
  return (
    <nav className={Styles.nav}>
      <ul>
        <li>
          <NavLink to={'cities'}>Cities</NavLink>
        </li>
        <li>
          <NavLink to={'countries'}>Countries</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AppNav;
