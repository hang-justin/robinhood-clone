import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { deleteWatchlist } from '../../../../store/watchlist';

import './DeleteWatchlistForm.css'

const DeleteWatchlistForm = ({ watchlist, setShowDeleteWatchlistModal }) => {
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDeleteWatchlist = (e) => {
        e.preventDefault();

        // NOTE: return data from dispatch/fetch is :
        // { message: 'Watchlist successfully deleted' }
        dispatch(deleteWatchlist(watchlist))
            .then(() => setShowDeleteWatchlistModal(false))
            .then(() => history.push('/'))
    }

    return (
        <div id='delete-watchlist-form' className='flx-col'>

            <div id='delete-form-header' className='flx-row-align-ctr justify-space-btw'>
                <span id='delete-confirm-question'>Are you sure you want to delete "{watchlist.name}"?</span>

                <span id='close-delete-watchlist' className='material-symbols-outlined' onClick={() => setShowDeleteWatchlistModal(false)}>
                    close
                </span>
            </div>

            <span>If you delete this list and its {watchlist.items.length} items, it'll be gone forever!</span>

            <button id='delete-watchlist-btn' onClick={handleDeleteWatchlist}>
                Delete {watchlist.name}
            </button>

        </div>
    )
}

export default DeleteWatchlistForm
