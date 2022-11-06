import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import Sparkline from '../Sparkline';
import AssetNotFound from './AssetNotFound';

import './AssetPage.css';
import AssetSidebar from './AssetSidebar';

const AssetPage = () => {
    const { symbol } = useParams()
    const market = useSelector(state => state.market)
    const coin_id = market.symbol_to_asset_id[symbol.toLowerCase()]

    if (!coin_id) return <AssetNotFound />

    return (
        <div id='asset-page' className='flx-row-justify-ctr'>
            <div id='asset-main-content' className='flx-row-justify-ctr'>

                <div id='asset-feed' className='flx-col flx-grow-one'>
                    <Sparkline />
                    <div id='asset-graph-caption'> 1W Change</div>
                </div>

                <AssetSidebar />

            </div>
        </div>
    )
}

export default AssetPage
