// constants
const LOAD_ALL_LATEST_PRICES = 'market/LOAD_ALL_LATEST_PRICES'

const initialState = {
    symbol_to_asset_id: {
        'btc': 'bitcoin',
        'eth': 'ethereum',
        'bnb': 'binancecoin',
        'xrp': 'ripple',
        'ada': 'cardano',
        'sol': 'solana',
        'doge': 'dogecoin',
        'matic': 'matic-network',
        'dot': 'polkadot',
        'steth': 'staked-ether'
    },
    asset_id_to_symbol: {
        'bitcoin' : 'btc',
        'ethereum' : 'eth',
        'binancecoin' : 'bnb',
        'ripple' : 'xrp',
        'cardano' : 'ada',
        'solana' : 'sol',
        'dogecoin' : 'doge',
        'matic-network' : 'matic',
        'polkadot' : 'dot',
        'staked-ether' : 'steth',
    }
}

const loadPricesToStore = (allPrices) => {
    return {
        type: LOAD_ALL_LATEST_PRICES,
        allPrices
    }
}

export const getAllLatestPrices = () => async dispatch => {
    const response = await fetch('/api/cg/all')
                            .catch(e => e)

    if (response.ok) {
        const allPrices = await response.json();
        dispatch(loadPricesToStore(allPrices))
        return allPrices;
    }
}

const marketReducer = (state=initialState, action) => {
    let newState;

    switch (action.type) {

        case LOAD_ALL_LATEST_PRICES:
            newState = { ...state }
            newState.allLatest = action.allPrices;
            return newState;

        default:
            return state;
    }
}

export default marketReducer
