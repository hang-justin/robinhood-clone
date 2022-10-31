import { useState } from "react";
import { Modal } from "../../../context/Modal";

const EditWatchlistModal = ({ watchlist, setShowEditWatchlistModal }) => {

    return (
        <div id='edit-watchlist-modal'>
            Edit List
        </div>
    )
}

// Need to move the edit- and delete- watchlistmodal up to Watchlist component
const WatchlistDropdownOptions = ({ setShowWatchlistOptions, watchlist }) => {
    const [showEditWatchlistModal, setShowEditWatchlistModal] = useState(false);
    const [showDeletWatchlisteModal, setShowDeletWatchlisteModal] = useState(false);

    const openEditWatchlistModal = (e) => {
        e.stopPropagation();

        // setShowWatchlistOptions(false)
        //     .then(() => setShowEditWatchlistModal(true))

        setShowEditWatchlistModal(true)
    }

    return (
        <div id='watchlist-dropdown-options' className='pos-abs flx-col'>

            <div className='flx-row-align-ctr dropdown-option-list' onClick={openEditWatchlistModal}>
                <span id='watchlist-setting-icon' class="material-symbols-outlined">
                    settings
                </span>
                <span>Edit List</span>
            </div>

            {showEditWatchlistModal &&
                <Modal onClose={() => setShowEditWatchlistModal(false)}>
                    <EditWatchlistModal watchlist={watchlist} setShowEditWatchlistModal={setShowEditWatchlistModal} />
                </Modal>
            }

            <div className='flx-row-align-ctr dropdown-option-list'>
                <span className="material-symbols-outlined">
                    cancel
                </span>
                <span>Delete List</span>
            </div>



        </div>
    )
}

export default WatchlistDropdownOptions
