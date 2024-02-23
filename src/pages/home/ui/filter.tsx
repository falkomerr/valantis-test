import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shared/ui/select';
import { Input } from '@/shared/ui/input';
import { Button } from '@/shared/ui/button';
import { X } from 'lucide-react';
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { filterItems, IFilterParams } from '@/entities/product';

type IFilterType = 'brand' | 'product' | 'price' | undefined;

interface props {
  loading: boolean;
  page: string;
}
export const Filter = ({ loading, page }: props) => {
  const queryClient = useQueryClient();

  const [filter, setFilter] = useState<string>('');
  const [filterType, setFilterType] = useState<IFilterType>(undefined);

  const mutation = useMutation({
    mutationKey: ['items'],
    mutationFn: (params: IFilterParams) => filterItems(params),
    retry: (failureCount, error) => {
      console.log(error.message);
      return failureCount < 1;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['items', page], data);
    },
  });

  const handleSubmit = (event: any) => {
    event.preventDefault();
    setFilter('');
    if (filterType === 'price') {
      mutation.mutate({
        [filterType as string]: parseFloat(filter),
        limit: 50,
        offset: 50 * (parseInt(page as string) - 1),
      });
      return;
    }
    mutation.mutate({
      [filterType as string]: filter,
      limit: 50,
      offset: 50 * (parseInt(page as string) - 1),
    });
  };

  return (
    <div className="mt-4 flex w-full flex-col items-center justify-between px-28 py-2 sm:flex-row">
      <form className="flex gap-x-4" onSubmit={handleSubmit}>
        <label htmlFor="filter" className="relative">
          <Button
            size="icon"
            className="absolute right-1 bg-transparent hover:bg-transparent "
            onClick={() => setFilter('')}>
            <X className="h-7 w-7" />
          </Button>

          <Input
            id="filter"
            title={!filterType ? 'Choose filter method first' : 'filter string'}
            type={filterType === 'price' ? 'number' : 'text'}
            disabled={!filterType || mutation.isPending}
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="w-72 border-none bg-blue-700 pr-10 text-lg text-white placeholder:text-white"
            placeholder="filter..."
          />
        </label>
        <Button
          disabled={!filterType || mutation.isPending}
          type="submit"
          className="disabled:cursor-not-allowed">
          Filter
        </Button>
      </form>

      <Select
        disabled={loading || mutation.isPending}
        value={filterType}
        onValueChange={(value) => setFilterType(value as IFilterType)}>
        <SelectTrigger className="w-[180px] border-none bg-blue-700 text-lg text-white outline-none">
          <SelectValue placeholder="Filter method" />
        </SelectTrigger>
        <SelectContent className="bg-blue-700 text-lg text-white">
          <SelectGroup>
            <SelectLabel>Select a filter method</SelectLabel>
            <SelectItem value="brand">Brand</SelectItem>
            <SelectItem value="product">Name</SelectItem>
            <SelectItem value="price">Price</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};
