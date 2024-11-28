export type CurrencyDetailResponseModel = {
    id: string;
    symbol: string;
    name: string;
    image: {
        large: string;
        small: string;
        thunk: string;
    }
    total_supply: number;
    current_price: number;
}