import { loadWeekChange } from "./market"

const LOAD_SPARKLINE_DATA = 'sparklines/LOAD_SPARKLINE_DATA'

const initialState = {
        'bitcoin': [],
        'ethereum': [],
        'binancecoin': [],
        'ripple': [],
        'cardano': [],
        'solana': [],
        'dogecoin': [],
        'matic-network': [],
        'polkadot': [],
        'staked-ether': []
}

const loadSparklineToStore = (sparkline_data) => {
    return {
        type: LOAD_SPARKLINE_DATA,
        sparkline_data
    }
}

export const getSparklineData = () => async dispatch => {
    const response = await fetch('/api/cg/market')
                            .catch(e => e)

    if (response.ok) {
        const data = await response.json();
        console.log('data from response.json is ', data)
        const weeklyPercentageChange = data.market_info.map( coinInfo => {
            return {
                id : coinInfo.id,
                price_change_percentage_7d_in_currency : coinInfo.price_change_percentage_7d_in_currency
            }
        })
        dispatch(loadWeekChange(weeklyPercentageChange))
        console.log(weeklyPercentageChange)
        dispatch(loadSparklineToStore(data.market_info))
    }
}


const sparklineReducer = ( state=initialState, action ) => {
    let newState;

    switch(action.type) {
        case LOAD_SPARKLINE_DATA:
            newState = { ...state }
            action.sparkline_data.forEach( dataObj => {
                newState[dataObj.id] = [...dataObj.sparkline_in_7d.price]
            })

            return newState

        default:
            return state;
    }
}

export default sparklineReducer
