import { useEffect, useState } from "react";



const CreateWatchlistRow = ({ setShowCreateWatchlist }) => {

    const [watchlistName, setWatchlistName] = useState('')
    const [watchlistNameLengthLimitColor, setWatchlistNameLengthLimitColor] = useState('')

    useEffect(() => {
        if (watchlistName.length >= 64) {
            setWatchlistNameLengthLimitColor('main-red-text');
            return;
        }

        if (watchlistNameLengthLimitColor === '') return;
        setWatchlistNameLengthLimitColor('');
        return;

    }, [watchlistName])

    const handleCreateWatchlist = e => {
        e.preventDefault();

        alert('work in progress... Hold up!')
        if (watchlistName.trim().length === 0) return;
        if (watchlistName.trim().length > 64) {
            alert(`I don't know how you bypassed the character limit, but you aren't supposed to. So please don't do that`)
            return;
        }

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
                    onChange={handleWatchlistNameInput}
                />

            </form>

            <div id='char-limit-indicator' className='flx-row sidebar-row margin-left-auto'>
                {watchlistName.length >= 64 &&
                    <span className='flx-row margin-right-auto main-red-text'>
                        64 character limit reached
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
