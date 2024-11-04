import useGameStore from '@/store/gameStore'
import NftCard from '../nftcard'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { OpenseaNftExtended, OpenseaNftListings } from '@/types/opensea/nft'

interface GameItemsProps {
  listings: OpenseaNftListings
  currentPage: number
}

const Items: React.FC<GameItemsProps> = ({ currentPage, listings }) => {
  const itemsPerPage = 20

  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = listings.nfts.slice(indexOfFirstItem, indexOfLastItem)

  const totalPages = Math.ceil(listings.nfts.length / itemsPerPage)
  const pageNumbers = [1, 2]

  return (
    <div className="bg-black text-white font-sans p-8">
      <h2 className="text-xl font-bold mb-4">TOP LISTINGS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((nft: OpenseaNftExtended) => (
          <NftCard
            key={nft.identifier}
            nft={nft}
          />
        ))}
      </div>
      {/* <Pagination>
        <PaginationContent>
          {currentPage !== 1 && (
            <PaginationItem>
              <PaginationPrevious
                href="#"
                //onClick={() => onPageChange(currentPage - 1)}
              />
            </PaginationItem>
          )}
          {pageNumbers.map(number => (
            <PaginationItem key={number}>
              <PaginationLink
                href="#"
                //onClick={() => onPageChange(number)}
                isActive={number === currentPage}>
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
      </Pagination> */}
    </div>
  )
}

export default Items
