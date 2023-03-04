import TransactionList from '../TransactionList';
import './Transactions.css';

const Transactions = () => {

    return (
        <div id='transactions-list-container' className='flx-row'>
            <TransactionList />
        </div>
    )
};

export default Transactions;
