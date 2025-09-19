import styles from './ProfilePageUserInfo.module.css';

export function ProfilePageUserInfo() {
  return (
    <div className={styles.container}>
      <div className={styles.skillCard} style={{ backgroundColor: '#E9F7E7' }}>
        <h3 className={styles.skillCategory} />
        <p className={styles.skillSubcategory} />
        <p className={styles.skillName} />
        <p className={styles.skillDescription} />
      </div>

      <button>Добавить навык'</button>
    </div>
  );
}
