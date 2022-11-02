// constants
const LOAD_WATCHLISTS = 'watchlists/LOAD_WATCHLISTS'
const ADD_A_WATCHLIST = 'watchlists/ADD_A_WATCHLIST'
const UPDATE_A_WATCHLIST = 'watchlists/EDIT_A_WATCHLIST'
const DELETE_A_WATCHLIST = 'watchlists/DELETE_A_WATCHLIST'

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

const updateWatchlistInStore = (watchlist) => {
    return {
        type: UPDATE_A_WATCHLIST,
        watchlist
    }
}

const deleteWatchlistFromStore = (watchlist) => {
    return {
        type: DELETE_A_WATCHLIST,
        watchlist
    }
}

export const createWatchlist = (watchlist) => async dispatch => {
    const response = await fetch('/api/watchlists/new', {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(watchlist)
    }).catch(e => e)

    if (response.ok) {
        const newWatchlist = await response.json();
        dispatch(addWatchlistToStore(newWatchlist))
        return newWatchlist
    }
}

export const updateWatchlist = (watchlist) => async dispatch => {
    const response = await fetch(`/api/watchlists/${watchlist.id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(watchlist)
    }).catch(e => e)

    if (response.ok) {
        const updatedWatchlistResponse = await response.json();
        console.log('updated watchlist response is :', updatedWatchlistResponse)
        dispatch(updateWatchlistInStore(updatedWatchlistResponse.watchlist))
        return updatedWatchlistResponse
    }

}

export const deleteWatchlist = (watchlist) => async dispatch => {
    const response = await fetch(`/api/watchlists/${watchlist.id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/JSON' }
    }).catch(e => e)

    if (response.ok) {
        const data = await response.json();

        // NOTE: data === { message: 'Watchlist successfully deleted' }

        dispatch(deleteWatchlistFromStore(watchlist))
        return data;
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
            newState[action.watchlist.id] = action.watchlist;
            return newState;

        case UPDATE_A_WATCHLIST:
            newState = { ...state };
            newState[action.watchlist.id] = action.watchlist;
            return newState;

        case DELETE_A_WATCHLIST:
            newState = { ...state };
            delete newState[action.watchlist.id];
            return newState;

        default:
            return state;
    }
}

export default watchlistReducer
