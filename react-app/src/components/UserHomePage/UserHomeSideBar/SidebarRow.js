
import { useSelector } from 'react-redux'
import formatMoney from '../../../util/formatMoney'
import sparkline from '../../img/sparkline.PNG'
import './SidebarRow.css'

const SidebarRow = ({ asset }) => {
    const latestPrices = useSelector(state => state.market.allLatest)

    const price = latestPrices[asset.asset_id].usd > 1 ?
                    formatMoney(latestPrices[asset.asset_id].usd) :
                    '$' + latestPrices[asset.asset_id].usd.toString()

    const dailyChangePercentage = latestPrices[asset.asset_id].usd_24h_change.toFixed(2)

    const percentageChangeTextColor = dailyChangePercentage >= 0 ? 'main-green-text' : 'main-red-text';

    return (
        <div className='sidebar-row  sidebar-row-content flx-row-align-ctr justify-space-btw'>

            <div className='sidebar-row__left flx-col'>
                <span>{asset.symbol.toUpperCase()}</span>
                <span>{asset.quantity}</span>
            </div>

            <img className='sparkline' src={sparkline} />

            <div className='sidebar-row__right flx-col-align-ctr'>
                <span className='margin-left-auto'>{price}</span>
                <span className={`margin-left-auto ${percentageChangeTextColor}`}>{dailyChangePercentage}%</span>
            </div>

        </div>
    )
}

export default SidebarRow
