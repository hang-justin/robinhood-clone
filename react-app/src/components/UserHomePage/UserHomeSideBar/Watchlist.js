import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import SidebarRow from "./SidebarRow"

import './Watchlist.css'
import arrow from '../../img/up-arrow.png'
import WatchlistDropdownOptions from "./WatchlistDropdownOptions"
import { Modal } from "../../../context/Modal"
import EditWatchlistForm from "./WatchlistModals/EditWatchlistForm"
import DeleteWatchlistForm from "./WatchlistModals/DeleteWatchlistForm"

const Watchlist = ({ watchlist }) => {
    const [showWatchlistItems, setShowWatchlistItems] = useState(false)
    const ownedAssets = useSelector(state => state.assets)

    // For display items in watchlist
    // Display status is for rotating the expand/collapse indicator
    const watchlistItemsArr = watchlist.items
    const [watchlistDisplayStatus, setWatchlistDisplayStatus] = useState(false)

    // Displays dropdown options for each watchlist
    const [showWatchlistOptions, setShowWatchlistOptions] = useState(false);

    // For modals
    const [showEditWatchlistModal, setShowEditWatchlistModal] = useState(false);
    const [showDeleteWatchlistModal, setShowDeleteWatchlistModal] = useState(false);

    useEffect(() => {
        // Closes watchlist options display when clicking elsewhere
        // Add event listener here for the showWatchlistOptions when displayed
        if (!showWatchlistOptions) return;
        // Guard clause... Don't add event listener if there's no options being displayed

        const closeWatchlistOptions = () => setShowWatchlistOptions(false)
        document.addEventListener('click', closeWatchlistOptions);

        return () => document.removeEventListener('click', closeWatchlistOptions)
    }, [showWatchlistOptions])

    const toggleItemDisplay = () => {
        // To display/hide items and to flip the expand/collapse indicator
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
                                setShowEditWatchlistModal={setShowEditWatchlistModal}
                                setShowDeleteWatchlistModal={setShowDeleteWatchlistModal}
                                watchlist={watchlist}
                            />
                        }
                    </span>

                    <span id='expand-collapse' className={`material-symbols-outlined ${watchlistDisplayStatus ? 'collapsed' : 'expanded'}`}>
                        arrow_forward_ios
                    </span>
                </div>
            </div>

            {showEditWatchlistModal &&
                <Modal onClose={() => setShowEditWatchlistModal(false)}>
                    <EditWatchlistForm watchlist={watchlist} setShowEditWatchlistModal={setShowEditWatchlistModal} />
                </Modal>
            }

            {showDeleteWatchlistModal &&
                <Modal onClose={() => setShowDeleteWatchlistModal(false)}>
                    <DeleteWatchlistForm watchlist={watchlist} setShowDeleteWatchlistModal={setShowDeleteWatchlistModal} />
                </Modal>
            }

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
