import { FC, useEffect, useState, useCallback } from 'react';
import { TCatalogBlock } from './type';
import { CatalogBlockUI } from '../ui/catalogBlock/catalogBlock';
import { useDebounce } from '../../hooks/useDebounce';
import { useScroll } from '../../hooks/useScroll';

export const CatalogBlock: FC<TCatalogBlock> = ({
  title,
  card,
  limit,
  scroll,
  buttonFilter, 
  moreButton
}) => {
  const [visibleCount, setVisibleCount] = useState<number>(9);
  const [loading, setLoading] = useState<boolean>(false);
  const [allLoaded, setAllLoaded] = useState<boolean>(false);

  useEffect(() => {
    if (typeof limit === 'number') {
      setVisibleCount(limit);
    } else if (scroll) {
      setVisibleCount(9);
      setAllLoaded(false);
    }
  }, [limit, scroll]);

  const loadMore = useCallback(() => {
    if (allLoaded || loading) return;
    if (scroll && !allLoaded) {
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
      }, 1000);
    }
  }, [allLoaded, loading, scroll, card.length]);

  const debouncedLoadMore = useDebounce(loadMore, 300);
  useScroll(loading, allLoaded, debouncedLoadMore);

  return (
    <CatalogBlockUI
      title={title}
      card={card}
      limit={visibleCount}
      loading={loading}
      scroll={scroll}
      moreButton={moreButton}
      buttonFilter={buttonFilter}
    />
  );
};
