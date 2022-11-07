import { useState } from 'react'
import { useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom'

import SidebarRow from './SidebarRow'
import Watchlist from './Watchlist'
import CreateWatchlistRow from './CreateWatchlistRow'

import './UserHomeSideBar.css'

const UserHomeSideBar = () => {

    // Retrieve all owned assets and grab its ids
    // Filter out buying_power/cash so it does not display on watchlist
    const allOwnedAssets = useSelector(state => state.assets)
    const allOwnedAssetIds = Object.keys(allOwnedAssets)
    const nonCashAssetIds = allOwnedAssetIds.filter(asset_id => asset_id !== '$$$$$' )

    const allWatchlists = useSelector(state => state.watchlists)
    const allWatchlistIds = Object.keys(allWatchlists)

    const [showCreateWatchlist, setShowCreateWatchlist] = useState(false);

    const toggleCreateWatchlist = () => {
        setShowCreateWatchlist(prev => !prev)
    }

    return (
        <div id='user-home-sidebar' className='flx-col'>

            <span className='sidebar-row-header'><NavLink to='/lists/yuanhood/crypto' className='navlink sidebar-nav'>View Available Cryptocurrencies</NavLink></span>

            <span id='your-crypto' className='sidebar-row-header'><NavLink className='sidebar-nav' to='/'>Your Cryptocurrencies</NavLink></span>

            {!!nonCashAssetIds.length &&
                nonCashAssetIds.map(nonCashAssetId => <SidebarRow
                                                        key={`owned-${nonCashAssetId}`}
                                                        asset={allOwnedAssets[nonCashAssetId]} />)
            }

            <span id='lists-header' className='sidebar-row-header justify-space-btw'>
                <span>Lists</span>

                <span id='add-list' className="material-symbols-outlined" onClick={toggleCreateWatchlist}>
                    add
                </span>
            </span>

            {showCreateWatchlist &&
                <CreateWatchlistRow setShowCreateWatchlist={setShowCreateWatchlist} />
            }


            {!!allWatchlistIds.length &&
                allWatchlistIds.reverse().map(watchlistId => <Watchlist
                                                        key={`watchlist-id-${watchlistId}`}
                                                        watchlist={allWatchlists[watchlistId]} />)
            }

        </div>
    )
}

export default UserHomeSideBar
