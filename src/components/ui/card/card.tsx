import React, { FC, useState } from 'react';
import { TCardUI } from './type';
import GreenButton from '../../buttons/GreenButton';
import styles from './card.module.css';
import likeIcon from '../../app/assets/static/icons/like.svg';
import likeIconActive from '../../app/assets/static/icons/like-active.svg';
import { CardTag } from '../../cardTag';

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
    setLiked(prevLiked => !prevLiked);
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
        <button className={styles.like} onClick={handleLike} aria-label="Поставить лайк">
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
              <CardTag
                key={index}
                name={skill.name}
                color={skill.color}
              />
            ))}
          </div>
        </div>
        <div className={styles.learn}>
          <h4 className={styles.skillsTitle}>Хочет научиться:</h4>
          <div className={styles.learnTags}>
            {wantLearn.slice(0, 2).map((skill, index) => (
              <CardTag
                key={index}
                name={skill.name}
                color={skill.color}
              />
            ))}
            {remainingWantLearn > 0 && (
              <CardTag
                name={`+${remainingWantLearn}`}
                color='#e8ecf7'
              />
            )}
          </div>
        </div>
      </div>
      {onClick && <div className={styles.buttonContainer}>
        <GreenButton onClick={onClick} className={styles.buttonWidth}>
          Подробнее
        </GreenButton>
      </div>}
    </div>
  );
};
