import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom"
import formatMoney from "../../../util/formatMoney";

import './OrderComplete.css'

const OrderComplete = ({ orderInformation, setShowCompletedOrder }) => {
    const history = useHistory();
    const assets = useSelector(state => state.assets);

    const {
        transactionType,
        asset_id,
        symbol,
        name,
        transactionTotal,
        transactionAmount,
        transactionCurrencyType,
        asset_price
        } = orderInformation

    return (
        <div id='order-complete'>
            <div id='transaction-confirmed' className='flx-row-align-ctr flx-grow-one transaction-confirmed-header'>
                {name} {transactionType === 'Buy' ? 'Purchased' : 'Sold'}
            </div>

            <div id='order-information' className='flx-col'>

                <div className='order-information-row'>
                    <div className='order-info-row-header'>
                        Quantity {transactionType === 'Buy' ? 'Purchased' : 'Sold'}
                    </div>

                    <div className='order-info-row-content'>
                        {transactionCurrencyType!== 'USD' ? transactionAmount : transactionTotal} {symbol}
                    </div>
                </div>

                <div className='order-information-row'>
                    <div className='order-info-row-header'>
                        Total {transactionType === 'Buy' ? 'Cost' : 'Credit'}
                    </div>

                    <div className='order-info-row-content'>
                        {transactionCurrencyType !== 'USD' ?
                        (transactionTotal.includes('$') ? transactionTotal : formatMoney(+transactionTotal)) :
                        formatMoney(+transactionAmount)
                    }
                    </div>
                </div>

                <div className='order-information-row'>
                    <div className='order-info-row-header'>
                        New Position
                    </div>

                    <div className='order-info-row-content'>
                        {assets[asset_id] ? assets[asset_id].quantity : '0'} {symbol}
                    </div>
                </div>

                <div className='order-information-row'>
                    <div className='order-info-row-header'>
                        Price per {symbol}
                    </div>

                    <div className='order-info-row-content'>
                        ${asset_price}
                    </div>
                </div>

                <button id='order-done-btn' onClick={() => history.push('/')} >
                    Done
                </button>

            </div>
        </div>
    )
}

export default OrderComplete
