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
