import { useState, useMemo } from 'react';
import { getUsers } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { useSearch } from '../context/SearchContext';
import UserCard from '../components/UserCard';
import { SkeletonList } from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import styles from './UsersPage.module.css';

const PAGE_SIZE = 5;

export default function UsersPage() {
  const { query } = useSearch();
  const [page, setPage] = useState(1);

  const { data: users, loading, error } = useFetch(getUsers, []);

  useMemo(() => setPage(1), [query]);

  const filtered = useMemo(() => {
    if (!users) return [];
    const q = query.trim().toLowerCase();
    if (!q) return users;
    return users.filter(
      (u) =>
        u.name.toLowerCase().includes(q) ||
        u.username.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
    );
  }, [users, query]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <main className={styles.page}>
      <section className={styles.header}>
        <p className={styles.eyebrow}>jsonplaceholder.typicode.com</p>
        <h1 className={styles.title}>Users</h1>
        {!loading && !error && (
          <p className={styles.count}>
            {filtered.length} {filtered.length === 1 ? 'result' : 'results'}
            {query && ` for "${query}"`}
          </p>
        )}
      </section>

      {loading && <SkeletonList count={5} />}
      {error && <ErrorMessage message={error} />}

      {!loading && !error && (
        <>
          {filtered.length === 0 ? (
            <div className={styles.empty}>
              <svg className={styles.emptyIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                <line x1="8" y1="11" x2="14" y2="11" />
              </svg>
              <span>No users match your search</span>
            </div>
          ) : (
            <ul className={styles.list}>
              {paginated.map((user, i) => (
                <li key={user.id}>
                  <UserCard user={user} index={i} />
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <div className={styles.pagination}>
              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => p - 1)}
                disabled={page === 1}
              >
                Prev
              </button>

              <span className={styles.pageInfo}>
                {page} / {totalPages}
              </span>

              <button
                className={styles.pageBtn}
                onClick={() => setPage((p) => p + 1)}
                disabled={page === totalPages}
              >
                Next
              </button>
            </div>
          )}
        </>
      )}
    </main>
  );
}
