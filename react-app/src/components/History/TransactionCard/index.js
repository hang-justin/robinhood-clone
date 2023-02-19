import './TransactionCard.css';
import formatMoney from '../../../util/formatMoney';
import formatDate from '../../../util/formatDate';

const TransactionCard = ({ transaction }) => {
    const convertedDate = new Date(Date.parse(transaction.timestamp));
    const formattedDate = formatDate(convertedDate);

    return (
        <li className='transaction-card'>
            <div className='transaction-details flx-row justify-space-btw'>
                <div className='transaction-details__left flx-col'>
                    <span>
                        {transaction.name} for {transaction.type}
                    </span>

                    <span>
                        {formattedDate}
                    </span>
                </div>

                <div className='transactions-details__right'>
                    {transaction.quantity} for {formatMoney(transaction.total)}
                </div>
            </div>
        </li>
    )
};

export default TransactionCard;
