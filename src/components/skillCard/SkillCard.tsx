import react, { FC, ReactNode, useState } from 'react';
import styles from './SkillCard.module.css';
import clsx from 'clsx';
import { ReactComponent as Like } from '../app/assets/static/icons/like.svg';
import { ReactComponent as Share } from '../app/assets/static/icons/share.svg';
import { ReactComponent as More } from '../app/assets/static/icons/more.svg';
import { ReactComponent as ChevronRight } from '../app/assets/static/icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from '../app/assets/static/icons/chevron-left.svg';
import { TSkill } from '../../types/skill';

export type SkillCardProps = TSkill & {
  children: ReactNode;
  onLike: () => void;
  onShare: () => void;
  onMore: () => void;
};

export const SkillCard: FC<SkillCardProps> = ({
  photoUrl,
  name,
  category,
  subCategory,
  description,
  children
}) => {
  const [active, setActive] = useState(0);
  return (
    <>
      <section className={styles.skillCard}>
        <div className={styles.upperButtons}>
          <button>
            <Like />
          </button>
          <button>
            <Share />
          </button>
          <button>
            <More />
          </button>
        </div>
        <div className={styles.mainSection}>
          <div className={styles.left}>
            <h1 className={styles.title}>{name}</h1>
            <p className={styles.meta}>
              {category}/{subCategory}
            </p>
            <p className={styles.desc}>{description}</p>
            <div className={styles.actions}>{children}</div>
          </div>
          <div className={styles.right}>
            <div className={styles.mainImageContainer}>
              <img className={styles.mainImage} src={photoUrl[active]} alt='' />
              {photoUrl.length > 1 && (
                <>
                  <button
                    className={`${styles.nav} ${styles.prev}`}
                    onClick={() =>
                      setActive(
                        (i) => (i - 1 + photoUrl.length) % photoUrl.length
                      )
                    }
                  >
                    <ChevronRight />
                  </button>

                  <button
                    className={`${styles.nav} ${styles.next}`}
                    onClick={() => setActive((i) => (i + 1) % photoUrl.length)}
                  >
                    <ChevronLeft />
                  </button>
                </>
              )}
            </div>

            <div className={styles.thumbs}>
              {photoUrl.slice(1, 3).map((url, index) => (
                <img
                  key={index}
                  className={styles.thumb}
                  src={url}
                  onClick={() => setActive(index + 1)}
                  role='button'
                  onKeyDown={(e) => e.key === 'Enter' && setActive(index + 1)}
                  alt={`preview-${index + 1}`}
                />
              ))}

              {photoUrl.length > 3 && (
                <div className={clsx(styles.thumb, styles.withOverlay)}>
                  <img src={photoUrl[3]} alt='more preview' />
                  <p className={styles.moreBadge}>+{photoUrl.length - 3}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
