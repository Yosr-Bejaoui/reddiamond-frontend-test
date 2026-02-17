import { Link } from 'react-router-dom';
import styles from './UserCard.module.css';

function initials(name) {
  return name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('');
}

function avatarHue(id) {
  return (id * 53) % 360;
}

export default function UserCard({ user, index }) {
  return (
    <Link
      to={`/details/${user.id}`}
      className={styles.card}
      style={{ animationDelay: `${index * 40}ms` }}
    >
      <div
        className={styles.avatar}
        style={{ background: `hsl(${avatarHue(user.id)}, 55%, 28%)` }}
        aria-hidden="true"
      >
        {initials(user.name)}
      </div>

      <div className={styles.info}>
        <span className={styles.name}>{user.name}</span>
        <span className={styles.meta}>@{user.username}</span>
        <span className={styles.detail}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
            <polyline points="22,6 12,13 2,6"/>
          </svg>
          {user.email}
        </span>
        <span className={styles.detail}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <circle cx="12" cy="10" r="3"/>
            <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 14 8 14s8-8.75 8-14a8 8 0 0 0-8-8z"/>
          </svg>
          {user.address.city}
        </span>
      </div>

      <svg className={styles.arrow} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/>
      </svg>
    </Link>
  );
}
