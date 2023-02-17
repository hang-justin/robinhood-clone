import TransactionList from '../TransactionList';
import './Transactions.css';

const Transactions = () => {

    return (
        <div className='flx-row'>
            <TransactionList />

            <div>
                search
            </div>
        </div>
    )
};

export default Transactions;
