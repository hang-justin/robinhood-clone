import { useState } from "react"
import { useSelector } from "react-redux"
import SidebarRow from "./SidebarRow"

import './Watchlist.css'

const Watchlist = ({ watchlist }) => {
    const [showWatchlistItems, setShowWatchlistItems] = useState(false)
    const ownedAssets = useSelector(state => state.assets)

    const watchlistItemsArr = watchlist.items

    const toggleItemDisplay = () => {
        setShowWatchlistItems(prev => !prev)
    }

    return (
        <>
            <div className='user-watchlist sidebar-row-content flx-row justify-space-btw' onClick={toggleItemDisplay}>

                <div className='watchlist-name'>
                    {watchlist.name}
                </div>

                <div className='watchlist-buttons'>
                    expand/collapse
                </div>
            </div>

            {showWatchlistItems &&
                watchlistItemsArr.map(item => {
                    const hasHoldingsInItem = ownedAssets[item.asset_id]
                    return <SidebarRow asset={hasHoldingsInItem ? hasHoldingsInItem : item} />
                })
            }
        </>
    )
}

export default Watchlist
