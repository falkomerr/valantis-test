import { IProduct } from '@/entities/product';
import { Button } from '@/shared/ui/button.tsx';

interface props {
  products: IProduct[] | undefined;
}

export const ProductsList = ({ products }: props) => {
  if (products?.length === 0) {
    return (
      <div className="flex flex-col items-center gap-y-10">
        <p className="text-4xl">Where are no products</p>
        <a href="/">
          <Button>Go Home</Button>
        </a>
      </div>
    );
  }

  return products?.map((item) => (
    <div
      key={item.id}
      className="w-60 rounded-md bg-indigo-700 py-2 shadow-md transition duration-300 hover:bg-indigo-800 sm:w-80">
      <div className="flex space-x-4 p-4 sm:px-8">
        <div className="flex-1 space-y-4 py-2">
          <div className="h-4 w-3/4 rounded ">Brand: {item.brand || 'Not stated'}</div>
          <div className="w-5/6 rounded">Name: {item.product}</div>
          <div className="h-4 w-full rounded">Price: {item.price} ₽</div>
        </div>
      </div>
      <div className="space-y-4 p-4 sm:px-8">
        <div className="w-full rounded ">ID: {item.id}</div>
      </div>
    </div>
  ));
};
