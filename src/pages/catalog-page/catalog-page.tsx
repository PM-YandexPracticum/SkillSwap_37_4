import { useLocation } from 'react-router-dom';
import { cardDataArray } from './cardsMockup';
import style from './catalog-page.module.css';
import { CatalogPageUI } from '../../components/ui/pages/catalog-page';
import { FilterForm } from '../../components/FilterForm/FilterForm';

export const CatalogPage = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasFilter = queryParams.has('searchType');

  return (
    <div className={style.catalogPage}>
      <div><FilterForm/></div>
      <CatalogPageUI hasFilter={hasFilter} cardDataArray={cardDataArray} />
    </div>
  );
};
