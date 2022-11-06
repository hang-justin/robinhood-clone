

import { useSelector } from 'react-redux'
import formatMoney from '../../../util/formatMoney'
import OwnedAssetRow from './OwnedAssetRow'
import './Portfolio.css'

const Portfolio = () => {
    const market = useSelector(state => state.market)
    const latestPrices = market.allLatest

    const allAssets = useSelector(state => state.assets)
    const ownedAssetIds = Object.keys(allAssets);

    let portfolioBalance = ownedAssetIds.reduce((prevTotalQuantity, assetId) => {
        if (assetId === '$$$$$') {
            return prevTotalQuantity + allAssets[assetId].quantity
        } else {
            return prevTotalQuantity + allAssets[assetId].quantity * latestPrices[assetId].usd
        }
    }, 0)

    return (
        <div id='portfolio'>

            <div id='crypto-list-header' className='flx-col'>

                <div className='font-size-30'>
                    Portfolio Balance
                </div>

                <div className='portfolio-total-balance '>
                    {formatMoney(portfolioBalance)}
                </div>

                <div id='asset-table' className='flx-col'>
                    <div id='asset-table-header' className='flx-row-justify-align-ctr'>
                        Your Assets
                    </div>
                    <div className='flx-row-justify-align-ctr owned-asset-row owned-asset-row-header'>

                        <div className='owned-asset-symbol owned-asset-column owned-asset-column-header'>
                            Symbol
                        </div>

                        <div className='owned-asset-name owned-asset-column owned-asset-column-header'>
                            Name
                        </div>

                        <div className='owned-asset-balance owned-asset-column owned-asset-column-header'>
                            Balance
                        </div>

                        <div className='owned-asset-buy-sell owned-asset-column owned-asset-column-header'>

                        </div>

                    </div>

                    <div className='flx-row-justify-align-ctr owned-asset-row'>

                        <div className='owned-asset-symbol owned-asset-column'>
                            USD
                        </div>

                        <div className='owned-asset-name owned-asset-column'>
                            US Dollar
                        </div>

                        <div className='owned-asset-balance owned-asset-column'>
                            {formatMoney(allAssets.$$$$$.quantity)}
                        </div>

                        <div className='owned-asset-buy-sell owned-asset-column'>

                        </div>


                    </div>

                    {ownedAssetIds.map(asset_id => <OwnedAssetRow key={asset_id} ownedAsset={allAssets[asset_id]} /> )}
                </div>

            </div>

        </div>
    )
}

export default Portfolio
