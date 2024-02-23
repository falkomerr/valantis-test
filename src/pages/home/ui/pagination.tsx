import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shared/ui/pagination.tsx';
import { Input } from '@/shared/ui/input';
import { useState } from 'react';

interface props {
  page: string;
}

export const PaginationBar = ({ page }: props) => {
  const [custom, setCustom] = useState<string>('');

  const updateUrl = () => {
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set('page', custom as string);

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({ path: newUrl }, '', newUrl);
    window.location.reload();
  };

  return (
    <Pagination className="mx-auto mb-2 mt-2 w-fit rounded-md bg-blue-700 px-3 py-1 text-white transition-all duration-300 hover:bg-blue-800">
      <PaginationContent className="flex gap-x-2">
        {parseInt(page) > 1 && (
          <PaginationItem>
            <PaginationPrevious href={`/?page=${parseInt(page) - 1}`} />
          </PaginationItem>
        )}
        <PaginationItem>
          <PaginationLink href="/?page=1">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/?page=2">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="/?page=3">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              updateUrl();
            }}>
            <Input
              value={custom}
              onChange={(event) => setCustom(event.target.value)}
              placeholder="..."
              className="w-20 !border-0 bg-transparent text-center text-lg font-semibold !outline-0 !ring-0 placeholder:text-white"
              type="number"
            />
          </form>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href={`/?page=${parseInt(page) + 1}`} />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
};
