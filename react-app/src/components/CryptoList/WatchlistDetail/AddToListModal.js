import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { addItemToWatchlist, removeItemFromWatchlist } from "../../../store/watchlist"

const AddToListInput = ({ asset_id, watchlist }) => {
    const [checkedStatus, setCheckedStatus] = useState(!!watchlist.items.find(item => item.asset_id === asset_id))

    return (
        <>
            <div className='flx-row-align-ctr add-asset-to-list-input-container'>

                <input
                    id={`add-to=list-input-for-${watchlist.id}`}
                    type='checkbox'
                    className='modal__add-to-list-input'
                    checked={checkedStatus}
                    onChange={() => setCheckedStatus(prev => !prev)}
                />

                <label htmlFor={`add-to=list-input-for-${watchlist.id}`} className='flx-row flx-grow-one choose-list-for-asset'>
                    <div className='add-to-list-emoji-wrapper flx-row-justify-align-ctr'>
                        <span className='add-to-list-emoji'>💡</span>
                    </div>

                    <div className='flx-col-justify-ctr'>
                        <span>{watchlist.name}</span>
                        <span>{watchlist.items.length} items</span>
                    </div>
                </label>
            </div>
        </>
    )
}

const AddToListModal = ({ asset_id, currentCoinName, setShowAddToListModal }) => {
    const dispatch = useDispatch();

    const allWatchlists = useSelector(state => state.watchlists)
    const allWatchlistsArr = Object.values(allWatchlists)

    let watchlistsIncludesAssetId = {}
    allWatchlistsArr.forEach(watchlist => {
            watchlistsIncludesAssetId[watchlist.id] = !!watchlist.items.find(item => item.asset_id === asset_id)
    })

    // console.log(`watchlistId includes ${asset_id}:`, watchlistsIncludesAssetId)

    const handleFormSubmission = e => {
        e.preventDefault();

        const checkedValues = {}
        allWatchlistsArr.forEach(watchlist => {
            checkedValues[watchlist.id] = document.getElementById(`add-to=list-input-for-${watchlist.id}`).checked
        })

        // Compare the values of watchlistsIncludesAssetId and values
        // If they are different, indicates that values must change
        // If watchlistsIncludesAssetId is true, values at that same ind will be false
        //      which indicates a removal
        // If watchlistsIncludesAssetId is false, values at that same ind will be true
        //      which indicates an addition

        Object.keys(checkedValues).forEach(watchlist_id => {
            // console.log('watchlist_id in the forEach is :', watchlist_id)
            const itemUpdated = checkedValues[watchlist_id] ^ watchlistsIncludesAssetId[watchlist_id]

            if (!itemUpdated) return;
            // console.log('itemUpdated is:', itemUpdated )
            // checkedValues[watchlist_id] === true => addition
            //                             === false => removal
            // console.log('watchlist_id to be updated is :', watchlist_id)
            // console.log('watchlist to update is :', allWatchlists[watchlist_id])
            if (checkedValues[watchlist_id]) {
                dispatch(addItemToWatchlist(allWatchlists[watchlist_id], asset_id))
                    .catch(e => console.log('add to watchlist err msg: ',e))
            }
            else {
                dispatch(removeItemFromWatchlist(allWatchlists[watchlist_id], asset_id))
                    .catch(e => console.log('remove from watchlist err msg: ', e))
            }
        })

        setShowAddToListModal(false);
    }

    return (
        <div id='add-list-modal' className='flx-col'>

            <div id='add-list-modal__header' className='flx-row-align-ctr justify-space-btw'>
                <span>Add {currentCoinName} to Your Lists</span>

                <span id='close-add-to-list-modal' className='material-symbols-outlined' onClick={() => setShowAddToListModal(false)}>
                    close
                </span>
            </div>

            <form id='add-asset-to-list-form' className='flx-col' onSubmit={handleFormSubmission}>
                {allWatchlistsArr.map(watchlist => <AddToListInput key={watchlist.id} asset_id={asset_id} watchlist={watchlist} />)}

                <button
                    id='add-to-list-modal-save-changes'
                    type='submit'
                    className='enabled-save-changes-bg'
                >
                    Save Changes
                </button>

            </form>


        </div>
    )
}

export default AddToListModal
