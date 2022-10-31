import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SidebarRow from "./SidebarRow"

import './Watchlist.css'
import arrow from '../../img/up-arrow.png'
import WatchlistDropdownOptions from "./WatchlistDropdownOptions"

const Watchlist = ({ watchlist }) => {
    const [showWatchlistItems, setShowWatchlistItems] = useState(false)
    const ownedAssets = useSelector(state => state.assets)

    const [watchlistDisplayStatus, setWatchlistDisplayStatus] = useState(false)
    const watchlistItemsArr = watchlist.items

    const [showWatchlistOptions, setShowWatchlistOptions] = useState(false);

    useEffect(() => {
        // add event listener here for the showWatchlistOptions
        if (!showWatchlistOptions) return;

        const closeWatchlistOptions = () => {
            setShowWatchlistOptions(false)
        }

        document.addEventListener('click', closeWatchlistOptions);

        return () => document.removeEventListener('click', closeWatchlistOptions)

    }, [showWatchlistOptions])

    const toggleItemDisplay = () => {
        setShowWatchlistItems(prev => !prev)
        setWatchlistDisplayStatus(prev => !prev)
    }

    const toggleWatchlistOptionsDisplay = (e) => {
        e.stopPropagation();
        setShowWatchlistOptions(prev => !prev)
    }



    return (
        <>
            <div className='user-watchlist sidebar-row-content flx-row justify-space-btw' onClick={toggleItemDisplay}>

                <div className='watchlist-name-header'>
                    <span className='watchlist-emoji'>💡</span> <span className='watchlist-name'>{watchlist.name}</span>
                </div>

                <div className='watchlist-buttons flx-row-justify-align-ctr margin-left-auto'>
                    <span id='watchlist-more-options' className={`material-symbols-outlined ${showWatchlistOptions ? 'vis-visible' : 'vis-hidden'} pos-rel`} onClick={toggleWatchlistOptionsDisplay}>
                        more_horiz

                        {showWatchlistOptions &&
                            <WatchlistDropdownOptions
                                setShowWatchlistOptions={setShowWatchlistOptions}
                                watchlist={watchlist}
                            />
                        }
                    </span>

                    <span id='expand-collapse' className={`material-symbols-outlined ${watchlistDisplayStatus ? 'collapsed' : 'expanded'}`}>
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
