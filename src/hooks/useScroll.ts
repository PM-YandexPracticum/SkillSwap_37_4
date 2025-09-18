import { useEffect } from 'react';

export const useScroll = (
  loading: boolean,
  allLoaded: boolean,
  loadMore: () => void
) => {
  useEffect(() => {
    const handleScroll = () => {
      if (!loading && !allLoaded) {
        const { scrollTop, clientHeight, scrollHeight } =
          document.documentElement;
        if (scrollTop + clientHeight >= scrollHeight - 10) {
          loadMore();
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [loading, allLoaded, loadMore]);
};
