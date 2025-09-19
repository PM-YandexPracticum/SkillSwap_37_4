import { FC } from 'react';
import { CatalogBlock } from '../../../catalogBlock';
import style from './catalog-page.module.css';
import { TCatalogPageUI } from './type';

export const CatalogPageUI: FC<TCatalogPageUI> = ({
  hasFilter,
  cardDataArray
}) => {
  return (
    <div className={style.catalogBlockContainer}>
      {hasFilter ? (
        <div>
          <CatalogBlock
            title={`Подходящие предложения: ${cardDataArray.length}`}
            card={cardDataArray}
            limit={12}
            scroll={true}
            buttonFilter={true}
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
            scroll={true}
          />
        </div>
      )}
    </div>
  );
};
