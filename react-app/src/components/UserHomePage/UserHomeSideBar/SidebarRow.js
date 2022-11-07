
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import formatMoney from '../../../util/formatMoney'
import sparkline from '../../img/sparkline.PNG'
import Sparkline from '../../Sparkline'
import './SidebarRow.css'

const SidebarRow = ({ asset }) => {
    const history = useHistory();
    const latestPrices = useSelector(state => state.market.allLatest)
    const allWeeklyCurrencyChange = useSelector(state => state.market.weeklyChange)

    const price = latestPrices[asset.asset_id].usd > 1 ?
                    formatMoney(latestPrices[asset.asset_id].usd) :
                    '$' + latestPrices[asset.asset_id].usd.toString()

    const dailyChangePercentage = latestPrices[asset.asset_id].usd_24h_change.toFixed(2)

    // const percentageChangeTextColor = dailyChangePercentage >= 0 ? 'main-green-text' : 'main-red-text';

    const coinWeeklyChange = allWeeklyCurrencyChange[asset.asset_id] ?
                                allWeeklyCurrencyChange[asset.asset_id] : null

                                const percentageChangeTextColor = coinWeeklyChange >= 0 ? 'main-green-text' : 'main-red-text';

    const currencyChangePastWeek = coinWeeklyChange.toFixed(2)

    return (
        <div className='sidebar-row  sidebar-row-content flx-row-align-ctr justify-space-btw' onClick={() => history.push(`/crypto/${asset.symbol.toUpperCase()}`)}>

            <div className='sidebar-row__left flx-col'>
                <span>{asset.symbol.toUpperCase()}</span>
                <span>{asset.quantity}</span>
            </div>

            {/* <img className='sparkline' src={sparkline} /> */}
            <div className='sparkline'>
                <Sparkline asset={asset} />
            </div>

            <div className='sidebar-row__right flx-col-align-ctr'>
                <span className='margin-left-auto'>{price}</span>
                <span className={`margin-left-auto ${percentageChangeTextColor}`}>
                    {currencyChangePastWeek ? currencyChangePastWeek : dailyChangePercentage}%
                </span>
            </div>

        </div>
    )
}

export default SidebarRow
