import styles from './ProfilePageUserInfo.module.css';

export function ProfilePageUserInfo() {


  return (
    <div className={styles.container}>
      
        <div className={styles.skillCard} style={{ backgroundColor: '#E9F7E7' }}>
          <h3 className={styles.skillCategory}></h3>
          <p className={styles.skillSubcategory}></p>
          <p className={styles.skillName}></p>
          <p className={styles.skillDescription}></p>
        </div>


      <button >
        Добавить навык'
      </button>

    </div>
  );
}
