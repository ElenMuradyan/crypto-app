import { useEffect } from "react";
import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";

type userData = {
    id: string;
    name: string;
    current_price: number;
}

const CryptoList = () => {    
    const { data } = useFetch<userData[]>({
        url: `${requestUrls.coinsMarkets}?vs_currency=usd`,
    });

return (
    <div>
        <h2>
            Hello World
        </h2>
    </div>
)
}

export default CryptoList;