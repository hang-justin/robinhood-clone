import { useState } from "react"
import { useSelector } from "react-redux"
import SidebarRow from "./SidebarRow"

import './Watchlist.css'
import arrow from '../../img/up-arrow.png'

const Watchlist = ({ watchlist }) => {
    const [showWatchlistItems, setShowWatchlistItems] = useState(false)
    const [watchlistStatus, setWatchlistStatus] = useState(false)
    const ownedAssets = useSelector(state => state.assets)

    const watchlistItemsArr = watchlist.items

    const toggleItemDisplay = () => {
        setShowWatchlistItems(prev => !prev)
        setWatchlistStatus((prev) => !prev)
    }

    return (
        <>
            <div className='user-watchlist sidebar-row-content flx-row justify-space-btw' onClick={toggleItemDisplay}>

                <div className='watchlist-name-header'>
                    <span className='watchlist-emoji'>💡</span> <span className='watchlist-name'>{watchlist.name}</span>
                </div>

                <div className='watchlist-buttons flx-row-justify-align-ctr'>
                    <span id='expand-collapse' className={`material-symbols-outlined ${watchlistStatus ? 'collapsed' : 'expanded'}`}>
                        arrow_forward_ios
                    </span>
                </div>
            </div>

            {showWatchlistItems &&
                watchlistItemsArr.map(item => {
                    const hasHoldingsInItem = ownedAssets[item.asset_id]
                    return <SidebarRow key={`watchlist_id-${watchlist.id}-item-${item.id}`} asset={hasHoldingsInItem ? hasHoldingsInItem : item} />
                })
            }
        </>
    )
}

export default Watchlist
