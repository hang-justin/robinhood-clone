const LOAD_TRANSACTIONS = 'transactions/LOAD_TRANSACTIONS';

const initialState = {};

const loadTransactions = (transactions) => {
    return {
        type: LOAD_TRANSACTIONS,
        transactions
    }
};

export const getAllTransactions = () => async dispatch => {

    const response = await fetch('/api/transactions/', {
        headers: { 'Content-Type': 'application/json' }
    });

    if (response.ok) {
        const data = await response.json();
        await dispatch(loadTransactions(data.transactions));
        return;
    } else {
        const data = await response.json();
        console.log('error is: ', data);
        return;
    }
};

export const postTransaction = (transactionInformation) => async dispatch => {
    // transactionInformation = {
    //  asset_id :  asset_id or $$$$$
    //  symbol   :  symbol or $$$$$
    //  name     :  crypto name/$$$$$
    //  type     :  buy cryptocurrency/sell cryptocurrency/deposit cash/bank deposit
    //  quantity :  amount transacted
    //  total    :  USD
    // }
    
    const response = await fetch(`/api/transactions/new`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/JSON' },
        body: JSON.stringify(transactionInformation)
    })
        .catch(err => console.log(err))

    if (response.ok) {
        const data = await response.json();
    } else {
        const err = await response.json();
        console.log('err is: ', err)
        return;
    }
}

const transactionReducer = ( state=initialState, action) => {
    let newState = {};

    switch (action.type) {
        case LOAD_TRANSACTIONS:
            newState = action.transactions;
            return newState;

        default:
            return state;
    }
};

export default transactionReducer;
