"use client";
import useGameStore from "@/store/gameStore";
import NftCard from "../nftcard";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { NftExtended } from "@/types/nft";

interface GameItemsProps {
  currentPage: number;
}

const GameItems: React.FC<GameItemsProps> = ({ currentPage }) => {
  const { listings } = useGameStore.getState();
  const itemsPerPage = 20;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listings.nfts.slice(indexOfFirstItem, indexOfLastItem);

  const totalPages = Math.ceil(listings.nfts.length / itemsPerPage);
  const pageNumbers = [1, 2];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((nft: NftExtended) => (
          <NftCard key={nft.identifier} nft={nft} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                //onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                //onClick={() => onPageChange(number)}
                isActive={number === currentPage}
              >
                {number}
              </PaginationLink>
            </PaginationItem>
          ))}
          {currentPage !== totalPages && (
            <PaginationItem>
              <PaginationNext
                href="#"
                //onClick={() => onPageChange(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default GameItems;
