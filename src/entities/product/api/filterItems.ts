import { $api } from '@/shared/api';
import { IGetIdsResponse, IProduct } from '../lib/types.ts';
import { fetchItemsById } from './fetchItemsById.ts';

export interface IFilterParams {
  price?: number;
  name?: string;
  brand?: string;
  limit: 50;
  offset: number;
}
export const filterItems = async (params: IFilterParams): Promise<IProduct[]> => {
  const ids: IGetIdsResponse = await $api
    .post('', { json: { action: 'filter', params: params } })
    .json();

  return fetchItemsById(ids.result);
};
