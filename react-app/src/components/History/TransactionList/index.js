import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../../store/transactions';
import './TransactionList.css';

const TransactionList = () => {
    const dispatch = useDispatch();

    const allTransactions = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(getAllTransactions());
    }, []);


    if (!allTransactions.length) return null;
    console.log(allTransactions[0].timestamp)
    const convertedDate = new Date(Date.parse(allTransactions[0].timestamp))
    console.log('converted date is: ', convertedDate.getDate())

    return (
        <div id='transaction-list'>
            transactions
        </div>
    )
};

export default TransactionList;
