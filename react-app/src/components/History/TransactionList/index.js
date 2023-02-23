import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTransactions } from '../../../store/transactions';
import TransactionCard from '../TransactionCard';
import './TransactionList.css';

const TransactionList = () => {
    const dispatch = useDispatch();

    const allTransactions = useSelector(state => state.transactions);

    useEffect(() => {
        dispatch(getAllTransactions());
    }, []);


    if (!allTransactions.length) return null;
    // console.log(allTransactions[0].timestamp)
    // const convertedDate = new Date(Date.parse(allTransactions[0].timestamp));
    // console.log('converted date is: ', convertedDate.getDate())

    return (
        <div id='transaction-container'>
            <h3>Transactions</h3>

            <ul id='transactions-list'>
                {allTransactions.map(transaction =>
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                    />
                )}

            </ul>
        </div>
    )
};

export default TransactionList;
