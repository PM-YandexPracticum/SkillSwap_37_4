import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import arrowLeftIcon from '../../components/app/assets/static/iconsUi/arrow-chevron-left.svg';
import arrowRightIcon from '../../components/app/assets/static/iconsUi/arrow-chevron-right.svg';
import { Card } from '../card';
import { TCard } from '../card/type';

import styles from './CardCarousel.module.css';

export type TCardCarousel = {
  name: string;
  cards: TCard[];
};

export const CardCarousel: FC<TCardCarousel> = ({ name, cards }) => (
  <div className={styles.wrapper}>
    <h2 className={styles.title}>{name}</h2>
    <Swiper
      modules={[Navigation]}
      spaceBetween={24}
      slidesPerView={4}
      navigation={{
        nextEl: `.${styles.customNext}`,
        prevEl: `.${styles.customPrev}`
      }}
      className={styles.swiper}
      breakpoints={{
        0: { slidesPerView: 1 },
        640: { slidesPerView: 2 },
        1024: { slidesPerView: 3 },
        1280: { slidesPerView: 4 }
      }}
    >
      {cards.map((card) => (
        <SwiperSlide key={card.userEmail}>
          <Card {...card} />
        </SwiperSlide>
      ))}
      <div className={styles.customNext}>
        <img src={arrowRightIcon} className={styles.icon} alt='next' />
      </div>
      <div className={styles.customPrev}>
        <img src={arrowLeftIcon} className={styles.icon} alt='prev' />
      </div>
    </Swiper>
  </div>
);
