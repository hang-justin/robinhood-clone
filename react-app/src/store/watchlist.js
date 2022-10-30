// constants
const LOAD_WATCHLISTS = 'watchlists/LOAD_WATCHLISTS'

const initialState = {};

export const loadWatchlist = (watchlists) => {
    return {
        type: LOAD_WATCHLISTS,
        watchlists
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

        default:
            return state;
    }
}

export default watchlistReducer
