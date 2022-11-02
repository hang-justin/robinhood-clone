import { useSelector } from "react-redux"

const AddToListModal = ({ asset_id, currentCoinName }) => {
    const allWatchlists = useSelector(state => state.watchlists)
    console.log(allWatchlists)
    console.log(Array.isArray(allWatchlists))

    return (
        <div id='add-list-modal' className='flx-col'>

            <div id='add-list-modal__header' className='flx-row justify-space-btw'>
                <span>Add {currentCoinName} to Your Lists</span>
            </div>
            hi
        </div>
    )
}

export default AddToListModal
