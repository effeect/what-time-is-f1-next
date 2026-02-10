// Taken from Bulma examples
import styles from "./navbar.module.css";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <div className={`navbar-brand ${styles.centeredBrand}`}>
          <h1 className={`navbar-item ${styles.logoText}`}>What Time Is F1?</h1>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
