import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import { CurrencyListResponseModel } from "../../typescript/types/CurrencyListResponseModel";
import { Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useMemo } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { currencySelectOptions } from "../../util/constants/currencySelectOptions";
import { ROUTE_PATHS } from "../../util/constants/routes";
import Loading from "../../components/sheard/Loading";
import { DEFAULT_PAGINATION } from "../../util/constants/pagination";
import { useQueryParam } from "../../hooks/useQueryParam";

import './index.css';

const CryptoList = () => {    
    const location = useLocation(); 
    const navigate = useNavigate();
    const { getQueryParam, setQueryParam } = useQueryParam();

    const page = getQueryParam('page') || DEFAULT_PAGINATION.page;
    const pageSize = getQueryParam('pageSize') || DEFAULT_PAGINATION.pageSize;
    const currency = getQueryParam('currency') || currencySelectOptions[0].value;

    const { data, loading } = useFetch<CurrencyListResponseModel[]>({
        url: `${requestUrls.coinsMarkets}/coins/markets?vs_currency=${currency}&per_page=${pageSize}&page=${page}`,
        header: {
            'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY
        }
    });
    
    const columns: TableProps<CurrencyListResponseModel>['columns'] = useMemo(() => {
        return [
            {
                title: '#ID',
                dataIndex: 'id',
                key: 'id'
            },
            {
                title: '',
                dataIndex: 'symbol',
                key: 'symbol'
            },
            {
                title: 'Image',
                dataIndex: 'image',
                key: 'image',
                render: value => {
                    return(<img src={value} width={50} height={50} alt='example'/>)           
                }
            },
            {
                title: 'Name',
                dataIndex: 'name',
                key: 'name'
            },
            {
                title: 'Price Change 24',
                dataIndex: 'price_change_24h',
                key: 'price_change_24h',
                render: (value) => `${value.toFixed(2)}%`,
            },
            {
                title: 'Current Price',
                dataIndex: 'current_price',
                key: 'current_price',
                render: (value) => `${value.toFixed(2)}`,
            },
        ]
    }, []);

    const handleNavigataDetailPage = (row: CurrencyListResponseModel) => {
        const newUrl = `${ROUTE_PATHS.CRYPTO_DETAIL}/${row.id}${location.search}`;
        navigate(newUrl);
    }

    const rowClassName = () => {
        return 'no-hover'; 
      };
    
    if(loading){
        return(<Loading/>)
    }
    
    return (
    <div className="crypto_container">
        <Typography.Title style={{color: "white", textAlign: 'center', margin: 0}}>Crypto Overview</Typography.Title>
        <Table
        className="crypto_table"
        dataSource={data || []}
        columns={columns}
        loading={loading}
        rowClassName={rowClassName}
        pagination={{
            total:100,
            current: +page,
            pageSize: +pageSize,
            onChange: (page, pageSize) => {
                setQueryParam({
                    page, pageSize
                })
            }
        }}
        onRow={row => {
            return{
                onClick: () => handleNavigataDetailPage(row)
            }
        }}
        />
    </div>
)
}

export default CryptoList;