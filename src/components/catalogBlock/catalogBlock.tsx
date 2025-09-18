import { FC, useEffect, useState, useCallback } from 'react';
import { TCatalogBlock } from './type';
import { CatalogBlockUI } from '../ui/catalogBlock/catalogBlock';
import { useDebounce } from '../../hooks/useDebounce';
import { useScroll } from '../../hooks/useScroll';

export const CatalogBlock: FC<TCatalogBlock> = ({ title, card, limit }) => {
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [loading, setLoading] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof limit === 'number') {
      setVisibleCount(limit);
    } else if (limit === 'infinityLoad') {
      setVisibleCount(9);
      setAllLoaded(false);
    }
  }, [limit]);

  const loadMore = useCallback(() => {
    if (allLoaded || loading) return;
    if (limit === 'infinityLoad' && !allLoaded) {
      setLoading(true);
      setTimeout(() => {
        setVisibleCount((prevCount) => {
          const newCount = Math.min(prevCount + 9, card.length);
          if (newCount >= card.length) {
            setAllLoaded(true);
          }
          return newCount;
        });
        setLoading(false);
      }, 5000);
    }
  }, [allLoaded, loading, limit, card.length]);

  const debouncedLoadMore = useDebounce(loadMore, 300);
  useScroll(loading, allLoaded, debouncedLoadMore);

  return (
    <CatalogBlockUI
      title={title}
      card={card}
      limit={visibleCount}
      loading={loading}
      infinityLoad={limit === 'infinityLoad'}
    />
  );
};
