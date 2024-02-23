import { $api } from '@/shared/api';
import { IGetIdsResponse, IProduct } from '../lib/types';
import { fetchItemsById } from './fetchItemsById';
import { IFilterParams } from './filterItems.ts';

export const getAllItems = async (params: IFilterParams): Promise<IProduct[]> => {
  const ids: IGetIdsResponse = await $api
    .post('', { json: { action: 'get_ids', params: params } })
    .json();

  return fetchItemsById(ids.result);
};
