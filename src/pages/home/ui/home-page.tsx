import { useQuery } from '@tanstack/react-query';
import { getAllItems } from '@/entities/product';
import { ProductsError, ProductsList, ProductsLoading } from '@/widgets/products';
import { PaginationBar } from './pagination';
import { Filter } from './filter';
import { useEffect, useState } from 'react';

export const HomePage = () => {
  const [page, setPage] = useState<string | null>('1');

  useEffect(() => {
    setPage(new URLSearchParams(window.location.search).get('page'));
  }, []);

  const items = useQuery({
    queryKey: ['items', page],
    queryFn: () => getAllItems({ limit: 50, offset: 50 * (parseInt(page as string) - 1) }),
    retry: (failureCount, error) => {
      console.log(error.message);
      return failureCount < 1;
    },
    refetchInterval: false,
    refetchIntervalInBackground: false,
    refetchOnWindowFocus: false,
  });

  if (items.status === 'pending') {
    return (
      <>
        <Filter loading={items.isPending} page={page as string} />

        <div className="flex min-h-screen w-full flex-wrap justify-center gap-5 py-4 text-white">
          <ProductsLoading />
        </div>
      </>
    );
  }

  if (items.status === 'error') {
    return <ProductsError />;
  }

  return (
    <>
      <Filter loading={items.isPending} page={page as string} />
      <div className="flex w-full flex-wrap justify-center gap-5 py-4 text-white">
        <ProductsList products={items.data} />
      </div>
      <PaginationBar page={page as string} />
    </>
  );
};
