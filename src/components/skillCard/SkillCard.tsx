import react, { FC, ReactNode, useState } from 'react';
import styles from './SkillCard.module.css';
import clsx from 'clsx';
import { ReactComponent as Like } from '../app/assets/static/icons/like.svg';
import { ReactComponent as Share } from '../app/assets/static/icons/share.svg';
import { ReactComponent as More } from '../app/assets/static/icons/more.svg';
import { ReactComponent as ChevronRight } from '../app/assets/static/icons/chevron-right.svg';
import { ReactComponent as ChevronLeft } from '../app/assets/static/icons/chevron-left.svg';

export type SkillCardProps = {
  photoUrl: string[];
  name: string;
  category: string;
  subCategory: string;
  description: string;
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
            <Like></Like>
          </button>
          <button>
            <Share></Share>
          </button>
          <button>
            <More></More>
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
                    <ChevronRight></ChevronRight>
                  </button>

                  <button
                    className={`${styles.nav} ${styles.next}`}
                    onClick={() => setActive((i) => (i + 1) % photoUrl.length)}
                  >
                    <ChevronLeft></ChevronLeft>
                  </button>
                </>
              )}
            </div>

            <div className={styles.thumbs}>
              <img
                className={styles.thumb}
                src={photoUrl[1]}
                onClick={() => setActive(1)}
                role='button'
                onKeyDown={(e) => e.key === 'Enter' && setActive(1)}
              />
              <img
                className={styles.thumb}
                src={photoUrl[2]}
                onClick={() => setActive(2)}
                role='button'
                onKeyDown={(e) => e.key === 'Enter' && setActive(2)}
              />
              <div className={clsx(styles.thumb, styles.withOverlay)}>
                <img src={photoUrl[3]} />
                {photoUrl.length > 4 && (
                  <p className={styles.moreBadge}>+{photoUrl.length - 3}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};
