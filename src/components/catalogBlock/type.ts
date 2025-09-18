import { TCard } from '../card/type';

export type TCatalogBlock = {
  title: string;
  card: TCard[];
  limit: number | 'infinityLoad';
};
