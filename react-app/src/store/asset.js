// constants
const LOAD_ASSETS = 'assets/LOAD_ASSETS'

const initialState = {};

export const loadAssets = (assets) => {
    return {
        type: LOAD_ASSETS,
        assets
    }
}

export const processOrder = (orderInformation) => async dispatch => {
    // determine if it's a buy or sell order
    // formulate the body
    // dispatch fetch request
    // check response
    console.log('orderInformation is :', orderInformation)
    const transactionType = orderInformation.transactionType.toLowerCase();
    let quantity;
    let total;
    console.log('orderInformation received in the store is :', orderInformation)

    // transaction currencytype => !USD then calc
    if (orderInformation.transactionCurrencyType !== 'USD') {
        // quantity would just be orderInformation.transactionAmount
        quantity = orderInformation.transactionAmount
        total = orderInformation.transactionTotal.slice(1)
    } else {
        quantity = orderInformation.transactionTotal;
        total = orderInformation.transactionAmount;
    }
    console.log('quantity is:', quantity)
    console.log('total is :', total)

    const body = {
        asset_id: orderInformation.asset_id,
        symbol: orderInformation.symbol.toLowerCase(),
        name: orderInformation.name,
        type: 'cryptocurrency',
        quantity: parseFloat(quantity),
        total: parseFloat(total)
    }

    console.log('body going into the fetch request is :', body)

    const response = await fetch(`/api/assets/${orderInformation.asset_id}/${transactionType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(body)
    }).catch(e => e)

    if (response.ok) {
        const data = await response.json();
        console.log(data);
    }

}

const assetReducer = (state = initialState, action) => {
    let newState;
    switch (action.type) {

        case LOAD_ASSETS:
            newState = { ...state };
            action.assets.forEach(asset => {
                newState[asset.asset_id] = asset
            })
            return newState;

        default:
            return state;
    }
}

export default assetReducer
