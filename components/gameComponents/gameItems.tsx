// GameItems.tsx
import useGameStore from "@/store/gameStore";
import NftCard from "../nftcard";
import useFetchGameData from "@/hooks/useFetchGameData";
import { useState, useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

const GameItems: React.FC = () => {
  const { listings, updateListings } = useGameStore();
  const { fetchMoreListings, loading } = useFetchGameData();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 20;

  useEffect(() => {
    const fetchMoreIfNeeded = async () => {
      if (
        listings.nfts.length - currentPage * itemsPerPage < itemsPerPage &&
        listings.next &&
        !loading
      ) {
        try {
          const temp = await fetchMoreListings();
          if (temp) {
            updateListings(temp);
          }
        } catch (error) {
          console.error("Error loading more listings:", error);
        }
      }
    };
    fetchMoreIfNeeded();
  }, [currentPage, listings, updateListings, fetchMoreListings, loading]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = listings.nfts.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(listings.nfts.length / itemsPerPage);
  const pageNumbers = [1, 2];

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((nft) => (
          <NftCard key={nft.identifier} nft={nft} />
        ))}
      </div>
      <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={() => paginate(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {pageNumbers.map((number) => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                onClick={() => paginate(number)}
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
                onClick={() => paginate(currentPage + 1)}
              />
            </PaginationItem>
          )}
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default GameItems;
