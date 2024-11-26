import { requestUrls } from "../../util/constants/requestUrls";
import { useFetch } from "../../hooks/useFetch";
import { CurrencyResponseModel } from "../../typescript/types/CurrencyResponseModel";
import { Table } from "antd";
import type { TableProps } from "antd";

const CryptoList = () => {    
    const { data, loading, error } = useFetch<CurrencyResponseModel[]>({
        url: `${requestUrls.coinsMarkets}?vs_currency=usd`,
    });    

    const columns: TableProps<CurrencyResponseModel>['columns'] = [
        {
            title: '#ID',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: value => {
                return(<img src={value} width={50} height={100}/>)           
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
            key: 'price_change_24h'
        },
        {
            title: 'Current Price',
            dataIndex: 'current_price',
            key: 'current_price'
        },
    ]

    const handleNavigataDetailPage = (row: CurrencyResponseModel) => {
        console.log(row.id);
    }

    return (
    <div>
        <Table
        dataSource={data || []}
        columns={columns}
        loading={loading}
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