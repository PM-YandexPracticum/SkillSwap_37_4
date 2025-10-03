import { useEffect, useState } from 'react';
import { getSkillsByOwnerApi } from '../../services/store/slices/skillSlice/skillApi';
import styles from './ProfilePageUserInfo.module.css';
import { TSkill } from '../../types/skill';
import errorImage from '../../components/app/assets/static/404/error404.png';
import { ErrorPageUI } from '../ui/pages/errorPage';
import GreenButton from '../buttons/GreenButton';
import GreenBorderButton from '../buttons/GreenBorderButton';
import { useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader/preloader';

export function ProfilePageUserInfo() {
  const [skills, setSkills] = useState<TSkill[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const handleReportError = () => {
    console.log('Report error 404 ', currentPath);
  };

  const fetchSkills = async () => {
    setLoading(true);
    try {
      const skillsData = await getSkillsByOwnerApi('5'); // заменить '5' на id пользователя
      setSkills(skillsData);
      setError(null);
    } catch (error: unknown) {
      setError((error as Error)?.message || 'Неизвестная ошибка');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSkills();
  }, []);

  return (
    <div className={styles.container}>
      {loading ? (
        <Preloader />
      ) : error ? (
        <ErrorPageUI
          imageSrc={errorImage}
          title='Произошла ошибка'
          message={error}
        >
          <GreenBorderButton onClick={handleReportError}>
            Сообщить об ошибке
          </GreenBorderButton>
          <GreenButton onClick={fetchSkills}>Попробовать снова</GreenButton>
        </ErrorPageUI>
      ) : (
        <>
          {skills.map((skill) => (
            <div key={skill.id} className={styles.skillCard}>
              <h3 className={styles.skillCategory}>{skill.category}</h3>
              <p className={styles.skillSubcategory}>{skill.subCategory}</p>
              <p className={styles.skillName}>{skill.name}</p>
              <p className={styles.skillDescription}>{skill.description}</p>
            </div>
          ))}
          <GreenButton>Добавить навык</GreenButton>
        </>
      )}
    </div>
  );
}
