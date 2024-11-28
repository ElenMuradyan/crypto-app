import { useParams } from "react-router-dom";
import { useFetch } from "../../hooks/useFetch";
import { CurrencyDetailResponseModel } from "../../typescript/types/CurrencyDetailResponseModel";
import { requestUrls } from "../../util/constants/requestUrls";
import { Card, Tooltip, Typography } from "antd";
import CryptoDiagram from "../../components/sheard/CryptoDiagram";
import Loading from "../../components/sheard/Loading";

import './index.css';

const { Meta } = Card;

const CryptoDetail = () => {
    const { id } = useParams<{id: string}>();
    const { data, loading } = useFetch<CurrencyDetailResponseModel>({
        url: `${requestUrls.coinsMarkets}/coins/${id}`,
        header: {
            'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY,
        }
    })

    if(loading){
        return(<Loading/>)
    }
    return(
        <div className="detail_container">
            <Card
            className="Card"
            style={{width: '90%'}}
            cover={<CryptoDiagram/>}
            >
                <Meta 
                  title={<span style={{ color: 'white' }}>{data?.name}</span>} 
                  description={<span style={{ color: 'white' }}>{data?.symbol}</span>} 
                />
                <Typography.Title style={{color:'white'}} level={5}>
                <Tooltip title="The percentage change in the price over the last 24 hours">
                    {`Price Change (24h): ${data?.market_data.price_change_24h}%`}
                </Tooltip>
                </Typography.Title>
                <Typography.Title style={{color:'white'}} level={5}>
                <Tooltip title="The amount of cryptocurrency that is currently in circulation">
                        {`Circulating Supply: ${data?.market_data.circulating_supply}`}
                </Tooltip>               
                </Typography.Title>
                <Typography.Title style={{color:'white'}} level={5}>
                <Tooltip title="The total maximum amount of coins that will ever exist">
                        {`Max Supply: ${data?.market_data.max_supply || 'N/A'}`}
                </Tooltip>                
                </Typography.Title>
                <Typography.Title style={{color:'white'}} level={5}>
                <Tooltip title="The total amount of cryptocurrency in existence at the current moment">
                        {`Total Supply: ${data?.market_data.total_supply}`}
                </Tooltip>                
                </Typography.Title>
            </Card>
        </div>
    )
}

export default CryptoDetail;