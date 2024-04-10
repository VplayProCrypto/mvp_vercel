export interface OpenseaContract {
  address: string;
}

export interface OpenseaFee {
  fee: number;
  recipient: string;
  required: boolean;
}

export interface OpenseaPaymentToken {
  symbol: string;
  address: string;
  chain: string;
  image: string;
  name: string;
  decimals: number;
  eth_price: string;
  usd_price: string;
}

export enum OpenseaTokenStandard {
  Erc721 = "erc721",
}

export interface OpenseaPrice {
  currency: string;
  decimals: number;
  value: string;
}

export interface OpenseaPayment {
  quantity: string;
  token_address: string;
  decimals: number;
  symbol: string;
}

export interface OpenseaChain {}
