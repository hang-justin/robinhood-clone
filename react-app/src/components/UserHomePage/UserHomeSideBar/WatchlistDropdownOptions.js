import { useState } from "react";
import { Modal } from "../../../context/Modal";

// Need to move the edit- and delete- watchlistmodal up to Watchlist component
const WatchlistDropdownOptions = ({ setShowWatchlistOptions, setShowEditWatchlistModal, setShowDeleteWatchlistModal }) => {

    return (
        <div id='watchlist-dropdown-options' className='pos-abs flx-col'>

            <div className='flx-row-align-ctr dropdown-option-list' onClick={()=> setShowEditWatchlistModal(true)}>
                <span id='watchlist-setting-icon' className="material-symbols-outlined">
                    settings
                </span>
                <span>Edit List</span>
            </div>

            <div className='flx-row-align-ctr dropdown-option-list' onClick={() => setShowDeleteWatchlistModal(true)}>
                <span className="material-symbols-outlined">
                    cancel
                </span>
                <span>Delete List</span>
            </div>

        </div>
    )
}

export default WatchlistDropdownOptions
