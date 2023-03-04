import { postTransaction } from "./transactions";

// constants
const LOAD_ASSETS = 'assets/LOAD_ASSETS'
const UPDATE_ASSET_AND_CASH = 'assets/UPDATE_ASSET_AND_CASH'
const DELETE_ASSET_AND_UPDATE_CASH  = 'assets/DELETE_ASSET_AND_UPDATE_CASH'
const CLEAR_ASSETS = 'assets/CLEAR_ASSETS'

const initialState = {};

export const clearAssets = () => {
    return {
        type: CLEAR_ASSETS
    }
}

export const loadAssets = (assets) => {
    return {
        type: LOAD_ASSETS,
        assets
    }
}

const updateAssets = (updatedAssets) =>  {
    return {
        type: UPDATE_ASSET_AND_CASH,
        updatedAssets
    }
}

const deleteAssetAndUpdateCash = (updatedAssets) => {
    return {
        type: DELETE_ASSET_AND_UPDATE_CASH,
        updatedAssets
    }
}

export const processOrder = (orderInformation) => async dispatch => {
    // determine if it's a buy or sell order
    // formulate the body
    // dispatch fetch request
    // check response
    // console.log('orderInformation is :', orderInformation)
    const transactionType = orderInformation.transactionType.toLowerCase();
    let quantity;
    let total;

    // transaction currencytype => !USD then calc
    if (orderInformation.transactionCurrencyType !== 'USD') {
        // quantity would just be orderInformation.transactionAmount
        quantity = orderInformation.transactionAmount
        total = orderInformation.transactionTotal.slice(1)
    } else {
        quantity = orderInformation.transactionTotal;
        total = orderInformation.transactionAmount;
    }
    // console.log('quantity is:', quantity)
    // console.log('total is :', total)
    if (total.includes(',')) {
        total = total.split(',').join('');
    }

    const body = {
        asset_id: orderInformation.asset_id,
        symbol: orderInformation.symbol.toLowerCase(),
        name: orderInformation.name,
        type: 'cryptocurrency',
        quantity: parseFloat(quantity),
        total: parseFloat(total)
    }

    // console.log('body going into the fetch request is :', body)

    const response = await fetch(`/api/assets/${orderInformation.asset_id}/${transactionType}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(body)
    }).catch(e => e)

    // if data.message is
    //      'message': 'Successfully sold all holdings in asset.'
    //      then dispatch delete asset and update cash
    // otherwise dispatch update asset and cash
    //      update asset and cash should also cover the create asset and update cash scenario
    if (response.ok) {
        const data = await response.json();
        // console.log('data received back from response is :', data)
        if (data.delete) {
            dispatch(deleteAssetAndUpdateCash({
                'update': data.update,
                'delete': data.delete
            }))
        } else {
            dispatch(updateAssets({
                'update': data.update
            }))
        }

        // Need to format data for transaction route
        // transactionInformation = {
        // asset_id asset_id or $$$$$
        // symbol   symbol or $$$$$
        // name     crypto name/$$$$$
        // type     buy cryptocurrency/sell cryptocurrency/deposit cash/bank deposit
        // quantity amount transacted
        // total:   USD
        // }
        let quantity;
        let total;

        if (orderInformation.transactionCurrencyType === 'USD') {
            quantity = parseFloat(orderInformation.transactionTotal);
            total = parseFloat(orderInformation.transactionAmount);
        } else {
            quantity = parseFloat(orderInformation.transactionAmount);
            total = parseFloat(orderInformation.transactionTotal.slice(1));
        }

        const transactionInformation = {
            asset_id: orderInformation.asset_id,
            symbol: orderInformation.symbol,
            name: orderInformation.name,
            type: orderInformation.transactionType.toLowerCase() + ' cryptocurrency',
            quantity,
            total
        };

        // Sending a dispatch to post transaction
        // Now that asset fetch completed
        await dispatch(postTransaction(transactionInformation));


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

        case CLEAR_ASSETS:
            return {};

        case UPDATE_ASSET_AND_CASH:
            // console.log('action.updatedAssets is :', action.updatedAssets)
            newState = { ...state };

            const updatedAssetIds = Object.keys(action.updatedAssets.update)
            // console.log('updatedAssetIds are :', updatedAssetIds)

            updatedAssetIds.forEach(asset_id => {
                newState[asset_id] = action.updatedAssets.update[asset_id]
            })
            return newState;

        case DELETE_ASSET_AND_UPDATE_CASH:
            // console.log('action.updatedAssets for delete case is :', action.updatedAssets)
            newState = { ...state }

            newState['$$$$$'] = action.updatedAssets.update['$$$$$']

            const deletedAssetId = Object.keys(action.updatedAssets.delete)
            deletedAssetId.forEach(asset_id => {
                delete newState[asset_id]
            })

            return newState


        default:
            return state;
    }
}

export default assetReducer
