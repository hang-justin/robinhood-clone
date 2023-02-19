import './TransactionCard.css';
import formatMoney from '../../../util/formatMoney';
import formatDate from '../../../util/formatDate';

const getTransactionType = (transaction) => {
    if (transaction.name === '$$$$$') {
        if (transaction.type.includes('deposit')) return 'Deposit to portfolio';
        else return 'Withdrawl from brokerage account';
    }

    const transactionType = transaction.type.includes('buy')
                            ? 'Buy'
                            : 'Sell';

    return `${transaction.name} Market ${transactionType}`;
}

const getTransactionInfo = (transaction) => {
    if (transaction.name === '$$$$$') {
        return (
            <span>
                {formatMoney(transaction.total)}
            </span>
        )
    }

    const unitCost = transaction.total / transaction.quantity;

    return (
        <>
            <span>
                {formatMoney(transaction.total)}
            </span>

            <span>

                {transaction.quantity} {transaction.name} at {formatMoney(unitCost)}
            </span>
        </>
    )
}

const TransactionCard = ({ transaction }) => {
    const convertedDate = new Date(Date.parse(transaction.timestamp));
    const formattedDate = formatDate(convertedDate);

    return (
        <li className='transaction-card'>
            <div className='transaction-details flx-row justify-space-btw'>
                <div className='transaction-details__left flx-col'>
                    <span>
                        {getTransactionType(transaction)}
                    </span>

                    <span>
                        {formattedDate}
                    </span>
                </div>

                <div className='transactions-details__right flx-col'>
                    {getTransactionInfo(transaction)}
                </div>
            </div>
        </li>
    )
};

export default TransactionCard;
