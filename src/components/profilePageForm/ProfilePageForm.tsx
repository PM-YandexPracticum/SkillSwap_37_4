import styles from './ProfilePageForm.module.css';
import { GreenButton } from '../buttons/GreenButton/GreenButton';

export function ProfilePageForm() {
  return (
    <div className={styles.profileForm}>
      <div className={styles.profileInputBlock}>
        <label>Почта</label>
        <div className={styles.profileEmailInputWrapper}>
          <input
            type='email'
            name='email'
            className={styles.profileEmailInput}
            disabled
          />
          <span className={`${styles.profileEditIcon} ${styles.iconEdit}`} />
        </div>
      </div>

      <div className={styles.profileFormInputs}>
        <div className={styles.profileInputBlock}>
          <label>Имя</label>
          <div className={styles.profileEmailInputWrapper}>
            <input
              type='text'
              name='name'
              className={styles.profileEmailInput}
            />
            <span className={`${styles.profileEditIcon} ${styles.iconEdit}`} />
          </div>
        </div>
        <div className={styles.profileInputRow}>
          <div className={styles.profileInputBlock}>
            <label>Дата рождения</label>
            <div
              className={styles.profileDateInputWrapper}
              tabIndex={0}
              role='button'
              aria-label='Выбрать дату рождения'
              style={{ cursor: 'pointer' }}
            >
              <input
                type='date'
                name='birthDate'
                className={styles.profileDateInput}
              />
              <span
                className={`${styles.profileCalendarIcon} ${styles.iconCalendar}`}
              />
            </div>
          </div>
          <div className={styles.profileInputBlock}>
            <label>Пол</label>
            <div className={styles.profileGenderInputWrapper}>
              <div className={styles.profileSelectInputWrapper}>
                <select name='gender' className={styles.profileInputHalf}>
                  <option value='female'>Женский</option>
                  <option value='male'>Мужской</option>
                </select>
              </div>
              <span
                className={`${styles.profileChevronIcon} ${styles.iconChevron}`}
              />
            </div>
          </div>
        </div>
        <div className={styles.profileInputBlock}>
          <label>Город</label>
          <div
            className={styles.profileCityInputWrapper}
            style={{ width: '100%', maxWidth: '100%' }}
          >
            <div
              className={styles.profileSelectInputWrapper}
              style={{ width: '100%' }}
            >
              <select name='city' style={{ width: '100%' }} />
            </div>
            <span
              className={`${styles.profileChevronIcon} ${styles.iconChevron}`}
            />
          </div>
        </div>
        <div className={styles.profileInputBlock}>
          <label>О себе</label>
          <div className={styles.profileAboutInputWrapper}>
            <textarea
              name='about'
              rows={5}
              className={styles.profileAboutTextarea}
            />
            <span
              className={`${styles.profileAboutEditIcon} ${styles.iconEdit}`}
            />
          </div>
        </div>
      </div>
      <div className={styles.profileSaveBtnWrapper}>
        <GreenButton
          type='submit'
          /*onClick={}
          disabled={}*/
        >
          {'Сохранить'}
        </GreenButton>
      </div>
    </div>
  );
}
