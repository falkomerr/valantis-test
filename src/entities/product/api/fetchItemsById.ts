import { IProduct } from '@/entities/product';
import { $api } from '@/shared/api';

export const fetchItemsById = async (ids: string[]): Promise<IProduct[]> => {
  const items: { result: IProduct[] } = await $api
    .post('', { json: { action: 'get_items', params: { ids: ids } } })
    .json();

  const uniqueObjectsMap: { [key: string]: boolean } = {};
  const uniqueObjects: IProduct[] = [];

  for (const obj of items.result) {
    if (!uniqueObjectsMap[obj.id]) {
      uniqueObjects.push(obj);
      uniqueObjectsMap[obj.id] = true;
    }
  }

  return uniqueObjects;
};
