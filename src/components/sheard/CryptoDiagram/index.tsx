import { AreaClosed } from '@visx/shape';
import { scaleTime, scaleLinear } from '@visx/scale';
import { AxisBottom, AxisLeft } from '@visx/axis';
import { GridRows, GridColumns } from '@visx/grid';
import { Group } from '@visx/group';
import { curveMonotoneX } from '@visx/curve';
import { CurrencyDiagramResponseModel } from '../../../typescript/types/CurrencyDiagramResponseModel';
import { useParams } from 'react-router-dom';
import { requestUrls } from '../../../util/constants/requestUrls';
import { useFetch } from '../../../hooks/useFetch';
import Loading from '../Loading';
import { Select } from 'antd';
import { timeSelectOptions, times } from '../../../util/constants/timeSelectOptions';
import { useEffect, useState } from 'react';
import { TimeTypes } from '../../../typescript/types/TimeType';
import { useQueryParam } from '../../../hooks/useQueryParam';
import { currencySelectOptions } from '../../../util/constants/currencySelectOptions';

import './index.css';

const CryptoDiagram = () => {
    const { id } = useParams();
    const { getQueryParam } = useQueryParam();
    const [time, setTime] = useState<number>(1);
    const [selectedTime, setSelectedTime] = useState<TimeTypes>('day');
    const [mappedData, setMappedData] = useState<{ x: Date; y: number }[]>([]); // State to store mapped data

    const currency = getQueryParam('currency') || currencySelectOptions[0].value;

    const { data, loading } = useFetch<CurrencyDiagramResponseModel>({
        url: `${requestUrls.coinsMarkets}/coins/${id}/market_chart?vs_currency=${currency}&days=${time}`,
        header: {
            'x-cg-demo-api-key': process.env.REACT_APP_CRYPTO_API_KEY,
        },
    });

    const handleChange = (value: TimeTypes) => {
        setTime(times[value]);
        setSelectedTime(value);
    };

    useEffect(() => {
        if (data?.prices) {
            const newMappedData = data.prices.map(d => ({
                x: new Date(d[0]),
                y: d[1],
            }));
            setMappedData(newMappedData);
        }
    }, [data]);

    if (!data?.prices || data?.prices.length === 0) {
        return <div style={{color: 'white', textAlign:'center', height: 400}}>No data available</div>;
    }

    if (loading) {
        return <Loading />;
    }

    const width = 1200;
    const height = 400;
    const margin = { top: 20, right: 30, bottom: 40, left: 70 };

    const timeData = mappedData.map(d => d.x.getTime());
    const priceData = mappedData.map(d => d.y);

    const xScale = scaleTime<number>({
        domain: [Math.min(...timeData), Math.max(...timeData)],
    });

    const yScale = scaleLinear<number>({
        domain: [Math.min(...priceData), Math.max(...priceData)],
    });

    xScale.range([0, width - margin.left - margin.right]);
    yScale.range([height - margin.top - margin.bottom, 0]);

    return (
        <>
            <svg width={width} height={height} className="crypto-diagram-svg">
                <defs></defs>
                <Group left={margin.left} top={margin.top}>
                    <GridRows
                        scale={yScale}
                        width={width - margin.left - margin.right}
                        height={height - margin.top - margin.bottom}
                    />
                    <GridColumns
                        scale={xScale}
                        width={width - margin.left - margin.right}
                        height={height - margin.top - margin.bottom}
                        stroke="transparent"
                    />

                    <AreaClosed
                        data={mappedData}
                        x={d => xScale(d.x)}
                        y={d => yScale(d.y)}
                        fill="darkblue"
                        stroke="none"
                        curve={curveMonotoneX}
                        yScale={yScale}
                    />

                    <AxisBottom
                        scale={xScale}
                        top={height - margin.top - margin.bottom}
                        label="Time"
                        tickStroke="white"
                        stroke="white"
                        tickLabelProps={() => ({
                            fill: 'white',
                            fontSize: '12px',
                            textAnchor: 'middle',
                            dominantBaseline: 'middle',
                        })}
                    />

                    <AxisLeft
                        scale={yScale}
                        label={`Price ${currency.toUpperCase()}`}
                        stroke="white"
                        tickStroke="white"
                        tickLabelProps={() => ({
                            fill: 'white',
                            fontSize: '12px',
                            textAnchor: 'end',
                            dominantBaseline: 'middle',
                        })}
                    />
                </Group>
            </svg>
            <Select
                options={timeSelectOptions}
                onChange={handleChange}
                value={selectedTime}
            />
        </>
    );
};

export default CryptoDiagram;
