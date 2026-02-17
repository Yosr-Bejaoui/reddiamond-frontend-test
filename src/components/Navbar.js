import { Link, useLocation } from 'react-router-dom';
import { useSearch } from '../context/SearchContext';
import styles from './Navbar.module.css';

export default function Navbar() {
  const { query, setQuery } = useSearch();
  const { pathname } = useLocation();

  const showSearch = pathname === '/';

  return (
    <header className={styles.navbar}>
      <Link to="/" className={styles.brand}>
        <span className={styles.brandDot} />
        <span>UserBase</span>
      </Link>

      {showSearch && (
        <div className={styles.searchWrap}>
          <svg className={styles.searchIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Search users…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search users"
          />
          {query && (
            <button
              className={styles.clearBtn}
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>
      )}

      <nav className={styles.nav}>
        <Link to="/" className={`${styles.navLink} ${pathname === '/' ? styles.active : ''}`}>
          Users
        </Link>
      </nav>
    </header>
  );
}
