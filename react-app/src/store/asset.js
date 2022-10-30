// constants
const LOAD_ASSETS = 'assets/LOAD_ASSETS'

const initialState = {};

export const loadAssets = (assets) => {
    return {
        type: LOAD_ASSETS,
        assets
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
