import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import formatMoney from '../../../util/formatMoney';

import './AssetSidebar.css';

const AssetSidebar = () => {
    const { symbol } = useParams();

    const market = useSelector(state => state.market)
    const currentAssetId = market.symbol_to_asset_id[symbol.toLowerCase()]
    const currentAssetLatestInfo = market.allLatest[currentAssetId]

    const userAssets = useSelector(state => state.assets)
    const userHasCurrentAsset = userAssets[currentAssetId]

    const [transactionType, setTransactionType] = useState('Buy')
    const [transactionCurrencyType, setTransactionCurrencyType] = useState('USD')
    const [transactionAmount, setTransactionAmount] = useState('')
    const [amountPlaceholder, setAmountPlaceholder] = useState('$0.00')

    const handleCurrencyTypeChange = (e) => {
        if (transactionCurrencyType === e.target.value) return;

        if (e.target.value === 'USD') setAmountPlaceholder('$0.00')
        else setAmountPlaceholder('0')

        setTransactionCurrencyType(e.target.value);
        setTransactionAmount('');
    }

    const handleAmountChange = (e) => {
        if (transactionCurrencyType === 'USD') {
            console.log(formatMoney(e.target.value))
            setTransactionAmount(formatMoney(e.target.value))
        }
        else setTransactionAmount(e.target.value)
    }

    const handleOrderSubmit = (e) => {
        e.preventDefault();
        console.log('hmmmm')
        alert('Order processing system is down. Please hang on!')
    }

    return (
        <>
            <div id='asset-sidebar' className='flx-col'>

                <div id='asset-order-container' className='flx-col-justify-align-ctr'>
                    <div id='transaction-type' className='flx-row-align-ctr flx-grow-one'>
                        <div
                            className={`transaction-type-selection ${transactionType === 'Buy' ? 'active-transaction-type' : ''}`}
                            onClick={() => setTransactionType('Buy')}
                        >
                            Buy {symbol}
                        </div>

                        {userHasCurrentAsset &&
                        <div
                        className={`transaction-type-selection ${transactionType === 'Sell' ? 'active-transaction-type' : ''}`}
                            onClick={() => setTransactionType('Sell')}
                        >
                            Sell {symbol}
                        </div>}

                    </div>

                    <form id='transaction-input-container' className='flx-col' onSubmit={handleOrderSubmit}>
                        <div id='set-transaction-type' className='flx-row-align-ctr flx-grow-one justify-space-btw'>
                            <div>
                                {transactionType} in
                            </div>

                            <select
                            id='currency-type-order-input'
                            className='order-input'
                            onChange={handleCurrencyTypeChange}
                            >
                                <option value='USD'>USD</option>
                                <option value={symbol.toUpperCase()}>{symbol.toUpperCase()}</option>
                            </select>
                        </div>

                        <div id='set-transaction-amount' className='flx-row-align-ctr flx-grow-one justify-space-btw'>
                            <div>
                                Amount
                            </div>

                            <input
                            id='amount-order-input'
                            className='order-input'
                            placeholder={amountPlaceholder}
                            onChange={handleAmountChange}
                            value={transactionAmount}
                            />
                        </div>

                        <div id='est-price' className='flx-row-align-ctr flx-grow-one justify-space-btw'>
                            <div>
                                Est. Price
                            </div>

                            <div>
                                {currentAssetLatestInfo.usd > 1 ?
                                    formatMoney(currentAssetLatestInfo.usd):
                                    '$' + currentAssetLatestInfo.usd.toString()
                                }
                            </div>
                        </div>

                        <div id='est-cost' className='flx-row-align-ctr flx-grow-one justify-space-btw'>
                            <div>
                                Est. Cost
                            </div>

                            <div>
                                math
                            </div>
                        </div>

                        <button id='submit-transaction'>
                            Review Order
                        </button>
                    </form>

                    <div id='buying-power' className='flx-row-justify-align-ctr flx-grow-one'>
                        {formatMoney(userAssets.$$$$$.quantity)} available
                    </div>

                </div>

                <button>Add to Lists</button>
            </div>

        </>
    )
}

export default AssetSidebar
