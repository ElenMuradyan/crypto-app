import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import { CurrencyListResponseModel } from "../../typescript/types/CurrencyListResponseModel";
import { Flex, Pagination, Table, Typography } from "antd";
import type { TableProps } from "antd";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROUTE_PATHS } from "../../util/constants/routes";

import './index.css';

const CryptoList = () => {    
    const navigate = useNavigate();
    const [ page, setPage ] = useState<number>(0);
    const [ pageSize, setPageSize ] = useState<number>(10)

        const { data, loading, error } = useFetch<CurrencyListResponseModel[]>({
            url: `${requestUrls.coinsMarkets}/coins/markets?vs_currency=usd&per_page=${pageSize}&page=${page}`,
            header: {
                'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY
            }
        });
    
    const columns: TableProps<CurrencyListResponseModel>['columns'] = [
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
                return(<img src={value} width={50} height={50}/>)           
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

    const handleNavigataDetailPage = (row: CurrencyListResponseModel) => {
        navigate(`${ROUTE_PATHS.CRYPTO_DETAIL}/${row.id}`)
    }

    const handlePageChange = (page: number) => {
        setPage(page);
    }

    const handlePageSizeChange = (page: number, pageSize: number) => {
        setPageSize(pageSize);
    }

    const rowClassName = () => {
        return 'no-hover';  // Apply this class to every row
      };
    
    return (
    <div className="crypto_container">
        <Typography.Title style={{color: "white", textAlign: 'center', margin: 0}}>Crypto Overview</Typography.Title>
        <Table
        className="crypto_table"
        dataSource={data || []}
        columns={columns}
        loading={loading}
        pagination={false}
        rowClassName={rowClassName}
        onRow={row => {
            return{
                onClick: () => handleNavigataDetailPage(row)
            }
        }}
        />
        <Flex align="center" justify="center" style={{width: '100%', height:'50px'}} className="crypto_pagination">
        <Pagination
        total={100}
        current={page}
        pageSize={pageSize}
        onChange={handlePageChange}
        onShowSizeChange={handlePageSizeChange}
        pageSizeOptions={['10', '20', '50', '100']}
        showSizeChanger
        />
        </Flex>
    </div>
)
}

export default CryptoList;