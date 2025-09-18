import { TCard } from '../../card/type';
import { TCatalogBlock } from '../../catalogBlock/type';

export type TCatalogBlockUI = TCatalogBlock & {
  loading: boolean;
  infinityLoad: boolean;
};
