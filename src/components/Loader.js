import styles from './Loader.module.css';

export function Spinner() {
  return (
    <div className={styles.spinnerWrap} role="status" aria-label="Loading">
      <div className={styles.spinner} />
      <span className={styles.spinnerLabel}>Loading...</span>
    </div>
  );
}

export function SkeletonCard() {
  return (
    <div className={styles.skeleton} aria-hidden>
      <div className={styles.skeletonAvatar} />
      <div className={styles.skeletonLines}>
        <div className={`${styles.skeletonLine} ${styles.l1}`} />
        <div className={`${styles.skeletonLine} ${styles.l2}`} />
        <div className={`${styles.skeletonLine} ${styles.l3}`} />
      </div>
    </div>
  );
}

export function SkeletonList({ count = 6 }) {
  return (
    <div className={styles.list}>
      {Array.from({ length: count }).map((_, i) => (
        <SkeletonCard key={i} />
      ))}
    </div>
  );
}
