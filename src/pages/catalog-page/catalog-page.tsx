import { useLocation } from 'react-router-dom';
import { cardDataArray } from './cardsMockup';
import style from './catalog-page.module.css';
import { CatalogPageUI } from '../../components/ui/pages/catalog-page';
import { FilterForm } from '../../components/FilterForm/FilterForm';
import { FilterParams } from '../../services/slices/cardSlice/type';
import { useDispatch, useSelector } from '../../services/store/store';
import {
  cardsSelector,
  filteredCardsByNewSelector,
  getCards,
  getPopularCards,
  getNewCards,
  loadingSelector
} from '../../services/slices/cardSlice/cardSlice';
import { useEffect, useMemo } from 'react';
import { Preloader } from '../../components/ui/preloader/preloader';
import type { RootState } from '../../services/store/store';


const buildFilterFromURL = (search: string): FilterParams => {
  const p = new URLSearchParams(search);
  const arr = (k: string) => p.get(k)?.split(',').filter(Boolean) || [];

  return {
    category: arr('category'),
    subcategory: arr('subcategory'),
    city: p.get('city') || '',
    searchType: (p.get('searchType') as any) || 'all',
    sortByNew: false,
    sortByLike: false
  } as FilterParams;
};

export const CatalogPage = () => {
  const location = useLocation();
  const dispatch = useDispatch();

  const allCards = useSelector(cardsSelector);
  const popular = useSelector(filteredCardsByNewSelector);
  const recent = useSelector(filteredCardsByNewSelector);
  const loading = useSelector(loadingSelector);

  const params = new URLSearchParams(location.search);
  const hasFilter =
    params.has('searchType') ||
    params.has('category') ||
    params.has('subcategory') ||
    params.has('gender') ||
    params.has('city');

  const filterFromURL = useMemo(
    () => buildFilterFromURL(location.search),
    [location.search]
  );

  useEffect(() => {
    if (hasFilter) {
      dispatch(getCards({ startNum: 0, endNum: 9, filter: filterFromURL}));
    } else {
      dispatch(getPopularCards({ startNum: 0, endNum: 9, filter: {}}));
      dispatch(getNewCards({ startNum: 0, endNum: 9, filter: {}}));
    }
}, [dispatch, hasFilter, filterFromURL])

const dataForUI = hasFilter ? allCards : popular;

  return (
    <div className={style.catalogPage}>
      <div>
        <FilterForm />
      </div>
       <CatalogPageUI hasFilter={hasFilter} cardDataArray={dataForUI} />
      {loading && <Preloader></Preloader>}
    </div>
  );
};
