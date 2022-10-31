// constants
const LOAD_WATCHLISTS = 'watchlists/LOAD_WATCHLISTS'
const ADD_A_WATCHLIST = 'watchlists/ADD_A_WATCHLIST'

const initialState = {};

export const loadWatchlist = (watchlists) => {
    return {
        type: LOAD_WATCHLISTS,
        watchlists
    }
}

const addWatchlistToStore = (watchlist) => {
    return {
        type: ADD_A_WATCHLIST,
        watchlist
    }
}

export const createWatchlist = (watchlist) => async dispatch => {
    console.log('data going into createwatchlist thunk is :', watchlist)
    const response = await fetch('/api/watchlists/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(watchlist)
    }).catch(e => e)

    if (response.ok) {
        watchlist = await response.json();
        dispatch(addWatchlistToStore(watchlist))
        return watchlist
    }
}

const watchlistReducer = (state = initialState, action) => {
    let newState;

    switch (action.type) {

        case LOAD_WATCHLISTS:
            newState = { ...state };
            action.watchlists.forEach(watchlist => {
                newState[watchlist.id] = watchlist
            })
            return newState;

        case ADD_A_WATCHLIST:
            newState = { ...state };
            newState[action.watchlist.id] = action.watchlist
            return newState;

        default:
            return state;
    }
}

export default watchlistReducer
