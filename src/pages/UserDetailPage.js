import { useParams, Link } from 'react-router-dom';
import { useMemo } from 'react';
import { getUserById, getPostsByUser } from '../services/api';
import { useFetch } from '../hooks/useFetch';
import { Spinner } from '../components/Loader';
import ErrorMessage from '../components/ErrorMessage';
import InfoRow from '../components/InfoRow';
import styles from './UserDetailPage.module.css';

function avatarHue(id) {
  return (id * 53) % 360;
}

function initials(name) {
  return name.split(' ').slice(0, 2).map((w) => w[0].toUpperCase()).join('');
}

export default function UserDetailPage() {
  const { id } = useParams();
  const numId = Number(id);

  const fetchUser = useMemo(() => () => getUserById(numId), [numId]);
  const fetchPosts = useMemo(() => () => getPostsByUser(numId), [numId]);

  const { data: user, loading: loadingUser, error: errorUser } = useFetch(fetchUser, [numId]);
  const { data: posts, loading: loadingPosts, error: errorPosts } = useFetch(fetchPosts, [numId]);

  if (loadingUser) return <Spinner />;
  if (errorUser) return <ErrorMessage message={errorUser} />;
  if (!user) return null;

  return (
    <main className={styles.page}>
      <Link to="/" className={styles.back}>
        Back to all users
      </Link>

      <section className={`${styles.hero} fade-up`}>
        <div
          className={styles.avatar}
          style={{ background: `hsl(${avatarHue(user.id)}, 55%, 28%)` }}
          aria-hidden
        >
          {initials(user.name)}
        </div>
        <div>
          <h1 className={styles.name}>{user.name}</h1>
          <p className={styles.username}>@{user.username}</p>
        </div>
      </section>

      <div className={styles.grid}>
        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Contact</h2>
          <InfoRow label="Email" value={user.email} />
          <InfoRow label="Phone" value={user.phone} />
          <InfoRow label="Website" value={user.website} />
        </section>

        <section className={styles.card}>
          <h2 className={styles.cardTitle}>Address</h2>
          <InfoRow label="Street" value={`${user.address.street}, ${user.address.suite}`} />
          <InfoRow label="City" value={user.address.city} />
          <InfoRow label="Zipcode" value={user.address.zipcode} />
        </section>

        <section className={`${styles.card} ${styles.fullWidth}`}>
          <h2 className={styles.cardTitle}>Company</h2>
          <InfoRow label="Name" value={user.company.name} />
          <InfoRow label="Catch phrase" value={user.company.catchPhrase} />
          <InfoRow label="BS" value={user.company.bs} />
        </section>
      </div>

      <section className={styles.postsSection}>
        <h2 className={styles.postsTitle}>
          Posts
          {!loadingPosts && posts && (
            <span className={styles.badge}>{posts.length}</span>
          )}
        </h2>

        {loadingPosts && <Spinner />}
        {errorPosts && <ErrorMessage message={errorPosts} />}

        {!loadingPosts && posts && (
          <ul className={styles.postsList}>
            {posts.map((post, i) => (
              <li
                key={post.id}
                className={styles.postItem}
                style={{ animationDelay: `${i * 30}ms` }}
              >
                <span className={styles.postId}>#{post.id}</span>
                <div>
                  <p className={styles.postTitle}>{post.title}</p>
                  <p className={styles.postBody}>{post.body}</p>
                </div>
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}
