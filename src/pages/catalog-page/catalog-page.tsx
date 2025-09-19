import { useLocation } from 'react-router-dom';
import { cardDataArray } from './cardsMockup';
import style from './catalog-page.module.css';
import { CatalogPageUI } from '../../components/ui/pages/catalog-page';

export const CatalogPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasFilter = queryParams.has('filter');

  return (
    <div className={style.catalogPage}>
      <div>{/* див для фильтров */}</div>
      <CatalogPageUI hasFilter={hasFilter} cardDataArray={cardDataArray} />
    </div>
  );
};
