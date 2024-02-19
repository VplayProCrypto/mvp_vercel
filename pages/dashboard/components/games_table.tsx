import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeaderCell,
    TableRow,
  } from '@tremor/react';

  import { Collection, CollectionStats, Interval } from '../../../app/types';

  interface StatsProps{
    game: Collection;
    stats: CollectionStats;
  }
  interface StatsProps {
    interval : Interval;
  }

  export const TableHero: React.FC<StatsProps> = ({game, stats, interval}) => (
    <div className="mx-auto max-w-2xl">
      <Table>
        <TableHead>
          <TableRow>
            <TableHeaderCell>Trending</TableHeaderCell>
            <TableHeaderCell className="text-right">
              Floor
            </TableHeaderCell>
            <TableHeaderCell>Chain</TableHeaderCell>
            <TableHeaderCell>Supply</TableHeaderCell>
            <TableHeaderCell>24H Change</TableHeaderCell>
            <TableHeaderCell>24H Volume</TableHeaderCell>
            <TableHeaderCell>24H Sales</TableHeaderCell>
            <TableHeaderCell>RR</TableHeaderCell>
          </TableRow>
        </TableHead>
    
        <TableBody>
            <TableRow>
                <TableCell> {game.name} </TableCell>
                <TableCell className='text-right'> {stats.total.floor_price} </TableCell>
                <TableCell> {stats.total.floor_price_symbol}</TableCell>
                <TableCell> {game.total_supply}</TableCell>
                <TableCell> {interval.volume_change}</TableCell>
                <TableCell> {interval.volume}</TableCell>
                <TableCell> {interval.sales}</TableCell>
                <TableCell> Coming soon</TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </div>
  );