import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

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

                <label for={`add-to=list-input-for-${watchlist.id}`} className='flx-row flx-grow-one'>
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
    const allWatchlists = Object.values(useSelector(state => state.watchlists))

    const watchlistsIncludesAssetId = allWatchlists.map(watchlist => {
        return !!watchlist.items.find(item => item.asset_id === asset_id)
    })

    console.log(`watchlistId includes ${asset_id}:`, watchlistsIncludesAssetId)

    const handleFormSubmission = e => {
        e.preventDefault();

        const values = allWatchlists.map(watchlist => {
            return document.getElementById(`add-to=list-input-for-${watchlist.id}`).checked
        })

        console.log('values are :', values)
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
                {allWatchlists.map(watchlist => <AddToListInput key={watchlist.id} asset_id={asset_id} watchlist={watchlist} />)}

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
