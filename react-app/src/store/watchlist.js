// constants
const LOAD_WATCHLISTS = 'watchlists/LOAD_WATCHLISTS'
const ADD_A_WATCHLIST = 'watchlists/ADD_A_WATCHLIST'
const UPDATE_A_WATCHLIST = 'watchlists/EDIT_A_WATCHLIST'
const DELETE_A_WATCHLIST = 'watchlists/DELETE_A_WATCHLIST'
const ADD_ITEM_TO_WATCHLIST = 'watchlists/ADD_ITEM_TO_WATCHLIST'
const REMOVE_ITEM_FROM_WATCHLIST = 'watchlists/REMOVE_ITEM_FROM_WATCHLIST'
const UPDATE_WATCHLIST_ITEMS = 'watchlists/UPDATE_WATCHLIST_ITEM'
const CLEAR_WATCHLISTS = 'watchlists/CLEAR_WATCHLISTS'

const initialState = {};

export const clearWatchlists = () => {
    return {
        type: CLEAR_WATCHLISTS
    }
}

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

const watchlistItemAdditionUpdate = (watchlist) => {
    return {
        type: ADD_ITEM_TO_WATCHLIST,
        watchlist
    }
}

const watchlistItemRemovalUpdate = (watchlist) => {
    return {
        type: REMOVE_ITEM_FROM_WATCHLIST,
        watchlist
    }
}

const watchlistItemUpdate = (watchlist) => {
    return {
        type: UPDATE_WATCHLIST_ITEMS,
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

export const addItemToWatchlist = (watchlist, asset_id) => async dispatch => {
    const response = await fetch(`/api/watchlists/${watchlist.id}/add/${asset_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
    }).catch(e => console.log('error is: ', e))

    if (response.ok) {
        const updatedWatchlistResponse = await response.json();
        const updatedWatchlist = updatedWatchlistResponse.watchlist
        dispatch(updateWatchlistInStore(updatedWatchlist))
    }
}

export const removeItemFromWatchlist = (watchlist, asset_id) => async dispatch => {
    const response = await fetch(`/api/watchlists/${watchlist.id}/remove/${asset_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
    }).catch(e => console.log('error is: ', e))

    if (response.ok) {
        const updatedWatchlistResponse = await response.json();
        const updatedWatchlist = updatedWatchlistResponse.watchlist;
        dispatch(updateWatchlistInStore(updatedWatchlist))
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

        case CLEAR_WATCHLISTS:
            return {};

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

        case ADD_ITEM_TO_WATCHLIST:
            newState = { ... state };
            newState[action.watchlist.id] = action.watchlist;
            return newState;

        case UPDATE_WATCHLIST_ITEMS:
            newState = { ...state };
            newState[action.watchlist.id] = action.watchlist
            return newState;

        default:
            return state;
    }
}

export default watchlistReducer
