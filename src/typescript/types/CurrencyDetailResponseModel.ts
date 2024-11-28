export type CurrencyDetailResponseModel = {
    id: string;
    symbol: string;
    name: string;
    current_price: number;
    market_data:{
        max_supply: number;
        circulating_supply: number;
        price_change_24h: number;
        total_supply: number;
    }
}