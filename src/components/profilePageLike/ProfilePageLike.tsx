import { useEffect, useState } from 'react';
import { getCardsApi } from '../../services/slices/cardSlice/cardSliceApi';
import { FilterObject } from '../FilterForm/FilterForm';
import { TCard } from '../card/type';
import styles from './ProfilePageLike.module.css';
import { CatalogBlock } from '../catalogBlock';
import { transformApiDataToCardData } from '../../services/slices/cardSlice/cardSlice';

export function ProfilePageLike() {
  const [cards, setCards] = useState<TCard[]>([]);
  const [loading, setLoading] = useState(true);

  const filter: FilterObject = {
    likedByUser: true
  };

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const res = await getCardsApi(filter, '1');
        setCards(res.cards.map(transformApiDataToCardData));
      } catch (err) {
        console.error('Ошибка загрузки карт:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, []);

  if (loading) {
    return <div className={styles.loader}>Загрузка...</div>;
  }

  if (!cards.length) {
    return <div className={styles.empty}>Нет понравившихся карточек</div>;
  }

  return (
    <div className={styles.cardsContainer}>
      <CatalogBlock
        title='Избранное'
        card={cards}
        limit={1000}
        moreButton={false}
      />
    </div>
  );
}
