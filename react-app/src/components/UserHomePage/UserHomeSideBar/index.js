import { useSelector } from 'react-redux'

import SidebarRow from './SidebarRow'
import Watchlist from './Watchlist'

import './UserHomeSideBar.css'

const UserHomeSideBar = () => {

    // Retrieve all owned assets and grab its ids
    // Filter out buying_power/cash so it does not display on watchlist
    const allOwnedAssets = useSelector(state => state.assets)
    const allOwnedAssetIds = Object.keys(allOwnedAssets)
    const nonCashAssetIds = allOwnedAssetIds.filter(asset_id => asset_id !== '$$$$$' )

    const allWatchlists = useSelector(state => state.watchlists)
    const allWatchlistIds = Object.keys(allWatchlists)


    return (
        <div id='user-home-sidebar' className='flx-col'>

            <span className='sidebar-row-header'>Cryptocurrencies</span>
            {!!nonCashAssetIds.length &&
                nonCashAssetIds.map(nonCashAssetId => <SidebarRow
                                                        key={`owned-${nonCashAssetId}`}
                                                        asset={allOwnedAssets[nonCashAssetId]} />)
            }

            <span className='sidebar-row-header'>Lists</span>
            {!!allWatchlistIds.length &&
                allWatchlistIds.reverse().map(watchlistId => <Watchlist
                                                        key={`watchlist-id-${watchlistId}`}
                                                        watchlist={allWatchlists[watchlistId]} />)
            }

        </div>
    )
}

export default UserHomeSideBar
