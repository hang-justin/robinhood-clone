import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createWatchlist } from "../../../store/watchlist";



const CreateWatchlistRow = ({ setShowCreateWatchlist }) => {
    const dispatch = useDispatch();

    const [watchlistName, setWatchlistName] = useState('')
    const [watchlistNameLengthLimitColor, setWatchlistNameLengthLimitColor] = useState('')

    const userWatchlists = useSelector(state => state.watchlists)
    const userWatchlistsArr = Object.values(userWatchlists)
    const [uniqueNameErr, setUniqueNameErr] = useState(false);
    const [emptyWatchlistNameErr, setEmptyWatchlistNameErr] = useState('');

    useEffect(() => {
        const isNameTaken = !!userWatchlistsArr.find(watchlist => watchlist.name === watchlistName)
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

    const handleCreateWatchlist = e => {
        e.preventDefault();

        if ((!!watchlistNameLengthLimitColor.length && watchlistName.length > 64) || uniqueNameErr) return;

        if (watchlistName.trim().length === 0) return;
        if (watchlistName.trim().length > 64) {
            alert(`I don't know how you bypassed the character limit, but you aren't supposed to. So please don't do that.`)
            return;
        }

        const newWatchlist = { name: watchlistName.trim() }

        dispatch(createWatchlist(newWatchlist))
            .then(() => setShowCreateWatchlist(false))

    }

    const handleWatchlistNameInput = e => {

        const watchlistNameSubmission = e.target.value.trimStart();

        if (watchlistNameSubmission.length > 64) return;

        setWatchlistName(watchlistNameSubmission)
    }

    return (
        <>

            <form id='create-a-watchlist-form' className='flx-row-align-ctr sidebar-row' onSubmit={handleCreateWatchlist}>

                <span className='watchlist-emoji'>💡</span>

                <input
                    id='create-watchlist-input'
                    className='flx-grow-one'
                    placeholder='List Name'
                    value={watchlistName}
                    required
                    onChange={handleWatchlistNameInput}
                />

            </form>

            {uniqueNameErr &&
                <div id='name-taken-indicator' className='sidebar-row margin-left-auto main-red-text'>
                    You've already used that name. Try another.
                </div>
            }

            <div id='char-limit-indicator' className='flx-row sidebar-row margin-left-auto'>
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

            <div id='watchlist-dropdown-btns-container' className='sidebar-row margin-left-auto flx-row'>
                <button
                id='cancel-watchlist-btn'
                className='watchlist-action-btns'
                onClick={() => setShowCreateWatchlist(false)}>
                    Cancel
                </button>

                <button
                id='create-watchlist-btn'
                className='watchlist-action-btns'
                onClick={handleCreateWatchlist}>
                    Create List
                </button>
            </div>
        </>
    )
}

export default CreateWatchlistRow
