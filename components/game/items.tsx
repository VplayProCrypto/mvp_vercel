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
  const seenIdentifiers = new Set()

  return (
    <div className="bg-black text-white font-sans p-8">
      <h2 className="text-xl font-bold mb-4">TOP LISTINGS</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {currentItems.map((nft: OpenseaNftExtended) => {
          if (seenIdentifiers.has(nft.identifier)) {
            return null
          }
          seenIdentifiers.add(nft.identifier)
          return (
            <NftCard
              key={nft.identifier}
              nft={nft}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Items
