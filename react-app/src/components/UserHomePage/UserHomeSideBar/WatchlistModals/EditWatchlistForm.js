

import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { updateWatchlist } from '../../../../store/watchlist';
import './EditWatchlistForm.css'

const EditWatchlistForm = ({ watchlist, setShowEditWatchlistModal }) => {
    const dispatch = useDispatch();

    const allWatchlists = useSelector(state => state.watchlists);
    const allWatchlistsArr = Object.values(allWatchlists);
    const allWatchlistsNameArr = allWatchlistsArr.map(watchlist => watchlist.name);

    const [watchlistNameLengthLimitColor, setWatchlistNameLengthLimitColor] = useState('')
    const [watchlistName, setWatchlistName] = useState(watchlist.name);
    const [uniqueNameErr, setUniqueNameErr] = useState(false);
    const [userChangedName, setUserChangedName] = useState(false);
    const [emptyWatchlistNameErr, setEmptyWatchlistNameErr] = useState('');

    useEffect(() => {
        if (!userChangedName) return;
        const isNameTaken = allWatchlistsNameArr.includes(watchlistName);
        setUniqueNameErr(isNameTaken)
    }, [watchlistName])

    useEffect(() => {
        if (watchlistName.length >= 64) {
            setWatchlistNameLengthLimitColor('main-red-text');
            return;
        }

        if (watchlistNameLengthLimitColor === '') return;
        setWatchlistNameLengthLimitColor('');
        return;

    }, [watchlistName])

    useEffect(() => {
        if (watchlistName.trim().length <= 0) {
            setEmptyWatchlistNameErr(`List name can't be empty.`)
        } else {
            setEmptyWatchlistNameErr('')
        }

    }, [watchlistName])

    const handleWatchlistNameInput = e => {
        if (!userChangedName) setUserChangedName(true);
        const watchlistNameSubmission = e.target.value.trimStart();

        if (watchlistNameSubmission.length > 64) return;

        setWatchlistName(watchlistNameSubmission)
    }

    const handleEditWatchlistSubmit = (e) => {
        e.preventDefault();

        if (watchlistName === watchlist.name) return setShowEditWatchlistModal(false);
        if (uniqueNameErr) return;
        if (emptyWatchlistNameErr.length > 0) return;
        if (watchlistName.trim().length > 64) return;

        const newWatchlist = { ...watchlist };
        newWatchlist.name = watchlistName.trim();

        // NOTE: the response from the dispatch/fetch request is an object
        // with a message key saying 'Successfully updated watchlist.'
        // and a watchlist key containing the updated watchlist info
        dispatch(updateWatchlist(newWatchlist))
            .then(() => setShowEditWatchlistModal(false));
    }


    return (
        <div id='edit-watchlist-container' className='flx-col'>
            <div id='edit-watchlist-header' className='flx-row-align-ctr justify-space-btw'>
                <h3>Edit List</h3>

                <span id='close-edit-watchlist' className='material-symbols-outlined' onClick={() => setShowEditWatchlistModal(false)}>
                    close
                </span>
            </div>

            <form id='edit-watchlist-name' className='flx-row-align-ctr' onSubmit={handleEditWatchlistSubmit}>
                <span className='watchlist-emoji'>💡</span>

                <input
                    id='edit-watchlist-name-input'
                    className='flx-grow-one'
                    placeholder='List Name'
                    value={watchlistName}
                    required={true}
                    onChange={handleWatchlistNameInput}
                />
            </form>

            {uniqueNameErr &&
                <div id='edit-watchlist__name-taken-indicator' className='sidebar-row margin-left-auto main-red-text'>
                    You've already used that name. Try another.
                </div>
            }

            <div id='edit-watchlist__char-limit-indicator' className='flx-row sidebar-row margin-left-auto'>
                {watchlistName.length >= 64 &&
                    <span className='flx-row margin-right-auto main-red-text'>
                        64 character limit reached
                    </span>
                }

                {emptyWatchlistNameErr.length >= 0 &&
                    <span className='flx-row margin-right-auto main-red-text'>
                        {emptyWatchlistNameErr}
                    </span>
                }

                <span id='watchlist-name-char-limit' className={`flx-row margin-left-auto ${watchlistNameLengthLimitColor}`}>
                    {64 - watchlistName.length}
                </span>
            </div>

            <button id='save-watchlist-name' onClick={handleEditWatchlistSubmit}>
                Save
            </button>


        </div>
    )
}

export default EditWatchlistForm
