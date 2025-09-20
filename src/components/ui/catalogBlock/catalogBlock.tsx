import TransparentButton from '../../buttons/TransparentButton';
import arrowRigth from '../../app/assets/static/iconsUi/arrow-chevron-right.svg';
import sort from '../../app/assets/static/iconsUi/sort.svg';
import style from './catalogBlock.module.css';
import { Card } from '../../card';
import { FC } from 'react';
import { TCatalogBlockUI } from './type';
import { Preloader } from '../preloader/preloader';

export const CatalogBlockUI: FC<TCatalogBlockUI> = ({
  title,
  card,
  limit,
  loading,
  scroll = false,
  buttonFilter = false
}) => {
  const visibleCount = typeof limit === 'number' ? limit : card.length;

  return (
    <div className={style.container}>
      <div className={style.header}>
        <div>
          <h1>{title}</h1>
        </div>
        {buttonFilter ? (
          <div className={style.header}>
            <TransparentButton>
              <img
                src={sort}
                alt='Кнопка фильтра по дате'
                className={style.sortIcon}
              />
              Сначала новые
            </TransparentButton>
          </div>
        ) : (
          !scroll && (
            <div className={style.header}>
              <TransparentButton>
                Смотреть все
                <img
                  src={arrowRigth}
                  alt='Кнопка смотреть все'
                  className={style.arrow}
                />
              </TransparentButton>
            </div>
          )
        )}
      </div>
      <div className={style.cardContainer}>
        {card.slice(0, visibleCount).map((cardData, index) => (
          <Card key={index} {...cardData} />
        ))}
        {loading && (
          <div className={style.preloaderOverlay}>
            <Preloader />
          </div>
        )}
      </div>
    </div>
  );
};
