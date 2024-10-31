export interface Tag {
    id: string;
    name: string;
    coin_counter: number;
    ico_counter: number;
}

export interface TeamMember {
    id: string;
    name: string;
    position: string;
}

export interface Link {
    explorer?: string[];
    facebook?: string[];
    reddit?: string[];
    source_code?: string[];
    website?: string[];
    youtube?: string[];
}

export interface ExtendedLinkStats {
    subscribers?: number;
    contributors?: number;
    stars?: number;
    followers?: number;
}

export interface ExtendedLink {
    url: string;
    type: string;
    stats?: ExtendedLinkStats;
}

export interface Whitepaper {
    link: string;
    thumbnail: string;
}
 export interface Coin {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    logo: string;
    image:string
    tags: Tag[];
    team: TeamMember[];
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: Link;
    links_extended: ExtendedLink[];
    whitepaper: Whitepaper;
    first_data_at: string;
    last_data_at: string;
}


export interface TokenQuoteUSD {
    price: number;
    volume_24h: number;
    volume_24h_change_24h: number;
    market_cap: number;
    market_cap_change_24h: number;
    percent_change_15m: number;
    percent_change_30m: number;
    percent_change_1h: number;
    percent_change_6h: number;
    percent_change_12h: number;
    percent_change_24h: number;
    percent_change_7d: number;
    percent_change_30d: number;
    percent_change_1y: number;
    ath_price: number;
    ath_date: string;
    percent_from_price_ath: number;
  }
  
  export interface TokenQuote {
    USD: TokenQuoteUSD;
  }
  
  export interface Token {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    circulating_supply: number;
    total_supply: number;
    max_supply: number;
    beta_value: number;
    first_data_at: string;
    last_updated: string;
    quotes: TokenQuote;
  }

  export interface TrendingTokens{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    image: string;
    price:number;
    percent_change_15m: number;
}

  export interface Chain {
    name: string;
    chainId: number;
    image: string;
  }
  

  interface Attribute {
    trait_type: string;
    value: string | number | null; // value can be string, number, or null
  }
  
  interface Metadata {
    attributes: Attribute[];
    description: string;
    image: string;
    name: string;
  }
  
  interface NFTToken {
    address: string;
    circulating_market_cap: number | null;
    decimals: number | null;
    exchange_rate: number | null;
    holders: string;
    icon_url: string | null;
    name: string;
    symbol: string;
    total_supply: number | null;
    type: string;
    volume_24h: number | null;
  }
export interface NFT {
    animation_url: string | null;
    external_app_url: string | null;
    id: string;
    image_url: string;
    is_unique: boolean | null;
    metadata: Metadata;
    owner: string | null;
    token: NFTToken;
    token_type: string;
    value: string;
  }
  
export interface TokenDetails {
    address: string;
    circulating_market_cap: string; // Using string to match the provided data type
    decimals: string; // Using string as it is given as a string in the example
    exchange_rate: string; // Using string for consistency
    holders: string; // This is also provided as a string
    icon_url: string;
    name: string;
    symbol: string;
    total_supply: string; // Using string as it represents a large number
    type: string; // e.g., "ERC-20"
    volume_24h: string; // Using string to match the provided data type
  }
  
export interface WalletToken {
    token: TokenDetails;
    token_id: string | null; // Assuming token_id can be null
    token_instance: string | null; // Assuming token_instance can be null
    value: string; // Using string as it represents a large number
  }
  