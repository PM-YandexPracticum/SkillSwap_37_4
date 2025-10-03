import React, { FC, useState } from 'react';
import { TCardUI } from './type';
import GreenButton from '../../buttons/GreenButton';
import styles from './card.module.css';
import likeIcon from '../../app/assets/static/icons/like.svg';
import likeIconActive from '../../app/assets/static/icons/like-active.svg';
import { CardTag } from '../../cardTag';
import { useNavigate } from 'react-router-dom';

export const CardUI: FC<TCardUI> = ({
  avatar_url,
  userName,
  city,
  age,
  canTeach,
  wantLearn,
  remainingWantLearn,
  onClick
}) => {
  const [liked, setLiked] = useState(false);
  const handleLike = () => {
    setLiked((prevLiked) => !prevLiked);

  };
  
  const navigate = useNavigate();

  const goToTag = (tag: string) => {
  const params = new URLSearchParams(window.location.search);
  params.set('searchType', 'all');        // всегда ищем везде
  params.set('subcategory', tag);         // фильтр по конкретному навыку
  navigate(`?${params.toString()}`, { replace: true });
  window.location.reload();               // перезагрузить страницу, чтобы подтянулось
};

  const goToTags = (tags: string[]) => {
  const params = new URLSearchParams();
  params.set('searchType', 'canTeach');
  params.set('subcategory', tags.join(','));
  navigate(`/catalog?${params.toString()}`);
};

  return (
    <div className={styles.card}>
      <div className={styles.header}>
        <img
          className={styles.avatar}
          src={avatar_url}
          alt={`Аватар пользователя ${userName}`}
        />
        <div className={styles.info}>
          <p className={styles.userName}>{userName}</p>
          <p className={styles.userInfo}>{`${city}, ${age}`}</p>
        </div>
        <button
          className={styles.like}
          onClick={handleLike}
          aria-label='Поставить лайк'
        >
          <img
            src={liked ? likeIconActive : likeIcon}
            alt='лайк'
            width={20}
            height={18}
          />
        </button>
      </div>
      <div className={styles.container}>
        <div className={styles.teach}>
          <h4 className={styles.skillsTitle}>Может научить:</h4>
          <div className={styles.skillsTags}>
            {canTeach.slice(0, 2).map((skill, index) => (
              <CardTag key={index} name={skill.name} color={skill.color} onClick={() => {goToTag(skill.name)}} />
            ))}
          </div>
        </div>
        <div className={styles.learn}>
          <h4 className={styles.skillsTitle}>Хочет научиться:</h4>
          <div className={styles.learnTags}>
            {wantLearn.slice(0, 2).map((skill, index) => (
              <CardTag key={index} name={skill.name} color={skill.color} onClick={() => {goToTag(skill.name)}} />
            ))}
             {remainingWantLearn > 0 && (() => {
      const hidden = wantLearn.slice(2);
      return (
        <CardTag
          name={`+${hidden.length}`}
          color="#e8ecf7"
          onClick={() => goToTags(hidden.map(s => s.name))}
        />
      );
    })()}
          </div>
        </div>
      </div>
      {onClick && (
        <div className={styles.buttonContainer}>
          {canTeach.slice(0, 2).map((skill, index) => (
            <GreenButton onClick={onClick} className={styles.buttonWidth}>
              Подробнее
            </GreenButton>
          ))}
        </div>
      )}
    </div>
  );
};
