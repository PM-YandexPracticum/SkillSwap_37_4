import { FC } from 'react';
import { useState, ChangeEvent } from 'react';
import { DatePickerComponent } from '../calendar/DataPicker';
import styles from './ProfilePageForm.module.css';
import { GreenButton } from '../buttons/GreenButton/GreenButton';
import { TSkillTag } from "../../components/cardTag/CardTag"
import { cities } from "../../const/cities"

export type ProfilePageFormProps = {
  user: {
    id: number | undefined,
    name: string | undefined,
    email: string | undefined,
    password: string | undefined,
    avatarUrl: string | undefined,
    birthday: Date | undefined,
    aboutMe: string | undefined,
    city: string | undefined,
    gender: string | undefined,
    wantLearn: TSkillTag[] | undefined, 
    canLearn: TSkillTag[] | undefined
  }
  handleSubmit: () => void;
  handleInputChange: (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
};

export function ProfilePageForm({ user, handleSubmit, handleInputChange }: ProfilePageFormProps) {
   const [date, setDate] = useState(
    user?.birthday ? user.birthday : null,
  );

  return (
    <div className={styles.profileForm}>
      <div className={styles.profileInputBlock}>
        <label>Почта</label>
        <div className={styles.profileEmailInputWrapper}>
          <input
            type='email'
            name='email'
            className={styles.profileEmailInput}
            value={user?.email}
            onChange={handleInputChange}
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
              value={user?.name}
              onChange={handleInputChange}
            />
            <span className={`${styles.profileEditIcon} ${styles.iconEdit}`} />
          </div>
        </div>
        <div className={styles.profileInputRow}>
          <DatePickerComponent
            selectedDate={date}
            setSelectedDate={(newDate) => {
              setDate(newDate);
              handleInputChange({
              target: {
                name: "birthday",
                value: newDate,
              },
            } as any)}}
          />
          <div className={styles.profileInputBlock}>
            <label>Пол</label>
            <div className={styles.profileGenderInputWrapper}>
              <div className={styles.profileSelectInputWrapper}>
                <select 
                  name='gender'
                  value={user?.gender}
                  onChange={handleInputChange}
                  className={styles.profileInputHalf}
                >
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
              <select 
                name='city'
                style={{ width: '100%' }}
                onChange={handleInputChange}
                value={user?.city}
              >
              {cities.map((city) => (
                <option key={city} value={city}>
                  {city}
                </option>
              ))}
            </select>
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
              name='aboutMe'
              rows={5}
              className={styles.profileAboutTextarea}
              value={user?.aboutMe}
              onChange={handleInputChange}
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
          onClick={handleSubmit}
        >
          {'Сохранить'}
        </GreenButton>
      </div>
    </div>
  );
}
