
export interface TrendingTokens{
    id: string;
    name: string;
    symbol: string;
    rank: number;
    image: string;
    price:number;
    percent_change_15m: number;
}

export interface Coins{
    id: string,
    name: string,
    symbol: string,
    rank: number,
    image:string,
    is_new: boolean,
    is_active: boolean,
    type: string
}