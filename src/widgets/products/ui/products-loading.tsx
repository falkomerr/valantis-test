import { Skeleton } from '@/shared/ui/skeleton.tsx';

export const ProductsLoading = () => {
  return [...new Array(50)].map((_, index) => (
    <Skeleton key={index} className="h-60 w-60 rounded-md bg-indigo-200 py-2 sm:w-80" />
  ));
};
