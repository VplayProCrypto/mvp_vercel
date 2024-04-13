import { env } from 'bun'
import type {
  BlockResponse,
  ERC20Transfer,
  ERC20TransferResponse,
} from '@types'

const headers = {
  'Content-Type': 'application/json',
  Accept: 'application/json',
}

async function get_block_from_timestamp(timestamp: number): Promise<string> {
  const params = {
    module: 'block',
    timestamp: timestamp.toString(),
    action: 'getblocknobytime',
    closest: 'before',
    apiKey: env.ETHERSCAN_API_KEY || 'no_api_key',
  }

  const response = await fetch(
    env.ETHERSCAN_BASE_URL + '?' + new URLSearchParams(params)
  )
  const data: BlockResponse = await response.json()
  return data.result
}

export async function get_erc20_transfers(
  contract_address: string,
  after_date: Date
): Promise<ERC20Transfer[]> {
  if (typeof contract_address !== 'string') {
    throw new Error('Contract address must be a string')
  }

  const block_num = await get_block_from_timestamp(
    Math.floor(after_date.getTime() / 1000)
  )

  const params = {
    action: 'tokentx',
    module: 'account',
    contractaddress: contract_address,
    sort: 'asc',
    apikey: env.ETHERSCAN_API_KEY || 'no_api_key',
    startblock: block_num,
  }

  const response = await fetch(
    env.ETHERSCAN_BASE_URL + '?' + new URLSearchParams(params),
    {
      headers: headers,
    }
  )
  const data: ERC20TransferResponse = await response.json()
  return data.result
}
