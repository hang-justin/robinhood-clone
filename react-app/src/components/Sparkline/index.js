import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom'

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    } from 'chart.js';
import { Line } from 'react-chartjs-2'
import './Sparkline.css'
import formatMoney from '../../util/formatMoney';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
    );

const Sparkline = ({ asset }) => {
    let { symbol } = useParams();
    const market = useSelector(state => state.market)
    const currentAssetId = symbol ?
                            market.symbol_to_asset_id[symbol.toLowerCase()]
                            : asset.asset_id
    const currentAssetName = market.asset_id_to_name[currentAssetId]
    const currentAssetChange = market.weeklyChange[currentAssetId]

    if (asset) symbol = asset.symbol.toUpperCase()

    const sparklines = useSelector(state => state.sparkline)
    const sparklineData = sparklines[currentAssetId]

    const options = {
        scales: {
            y: {
                ticks: {
                    display: false
                }
            },
            x: {
                ticks: {
                    display: false
                }
            }
        },
        elements: {
            point: {
                radius: 0
            },
        },
        responsive: true,
        plugins: {
            legend: { display: false },
            title: {
                display: asset ? false : true,
                text: `${currentAssetName} Past Week`,
                font: { size: 16},
                color: 'white'
            },
            tooltip: asset ? false : {
                mode: 'index',
                intersect: false,
                callbacks: {
                    title: () => '',
                    label: context => {
                        let d = new Date()
                        d.setHours(d.getHours() - 167 + context.parsed.x)


                        // Remove minutes for the past
                        // Only keep minute marker if it is the current hour
                        if(context.parsed.x !== 167) {
                            d.setMinutes(0)
                        }

                        // Format date with options
                        let options = {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                        }
                        let d_formatted = d.toLocaleDateString([], options)


                        let price
                        context.parsed.y > 1 ?
                            price = formatMoney(context.parsed.y) :
                            price = '$' + Number(context.parsed.y).toFixed(8)

                        return [d_formatted, price]
                    },
                }
            },
        }
    }

    const labels = sparklineData.map((val, ind) => ind)

    const data = {
        labels: labels,
        datasets: [{
            data: sparklineData,
            borderColor: currentAssetChange >= 0 ? '#00c805' : '#ff5000',
            backgroundColor: currentAssetChange >= 0 ? '#00c805' : '#ff5000',
            borderWidth: asset ? 0.5 : 3
        }]
    }

    return (
    <div id='line'>
        <Line data={data} options={options} />
    </div>
    )
}

export default Sparkline
