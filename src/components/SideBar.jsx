import { Outlet } from 'react-router';
import AppNav from './AppNav';
import Logo from './Logo';
import styles from './Sidebar.module.css';

const SideBar = () => {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNav />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>&copy; Copyright {new Date().getFullYear()} by WorldWise.Inc</p>
      </footer>
    </div>
  );
};

export default SideBar;
