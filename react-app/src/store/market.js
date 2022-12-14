// constants
const LOAD_ALL_LATEST_PRICES = 'market/LOAD_ALL_LATEST_PRICES'
const LOAD_WEEKLY_CURRENCY_CHANGE = 'market/LOAD_WEEKLY_CHANGE_CURRENCY'

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
        'bitcoin' : 'BTC',
        'ethereum' : 'ETH',
        'binancecoin' : 'BNB',
        'ripple' : 'XRP',
        'cardano' : 'ADA',
        'solana' : 'SOL',
        'dogecoin' : 'DOGE',
        'matic-network' : 'MATIC',
        'polkadot' : 'DOT',
        'staked-ether' : 'stETH',
    },
    asset_id_to_name: {
        'bitcoin': 'Bitcoin',
        'ethereum': 'Ethereum',
        'binancecoin': 'Binance Coin',
        'ripple': 'Ripple',
        'cardano': 'Cardano',
        'solana': 'Solana',
        'dogecoin': 'Dogecoin',
        'matic-network': 'Polygon',
        'polkadot': 'Polkadot',
        'staked-ether': 'Lido Staked Ether'
    }
}

const loadPricesToStore = (allPrices) => {
    return {
        type: LOAD_ALL_LATEST_PRICES,
        allPrices
    }
}

export const loadWeekChange = (weeklyChange) => {
    return {
        type: LOAD_WEEKLY_CURRENCY_CHANGE,
        weeklyChange
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
            newState.allLatest = { ...action.allPrices };
            return newState;

        case LOAD_WEEKLY_CURRENCY_CHANGE:
            newState = { ...state }
            newState.weeklyChange = {};

            action.weeklyChange.forEach( coinInfo => {
                newState.weeklyChange[coinInfo.id] = coinInfo.price_change_percentage_7d_in_currency
            })

            return newState;

        default:
            return state;
    }
}

export default marketReducer
