import { FC } from 'react';
import { CatalogBlock } from '../../../catalogBlock';
import style from './catalog-page.module.css';
import { TCatalogPageUI } from './type';

export const CatalogPageUI: FC<TCatalogPageUI> = ({
  hasFilter,
  cardDataArray
}) => (
  <div className={style.catalogBlockContainer}>
    {hasFilter ? (
      <div>
        <CatalogBlock
          title={`Подходящие предложения: ${cardDataArray.length}`}
          card={cardDataArray}
          limit={12}
          scroll
          buttonFilter
        />
      </div>
    ) : (
      <div>
        <CatalogBlock title='Популярное' card={cardDataArray} limit={3} />
        <CatalogBlock title='Новое' card={cardDataArray} limit={3} />
        <CatalogBlock
          title='Рекомендуем'
          card={cardDataArray}
          limit={9}
          scroll
        />
      </div>
    )}
  </div>
);
