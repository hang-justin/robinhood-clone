import { useEffect, useState } from 'react';
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

    const [transactionTotal, setTransactionTotal] = useState('0.00')

    const [availableCurrency, setAvailableCurrency] = useState(formatMoney(userAssets.$$$$$.quantity))

    const [disabledInputs, setDisabledInputs] = useState(false);
    const [disabledStyle, setDisabledStyle] = useState('')
    const [displayBuyOption, setDisplayBuyOption] = useState(true);
    const [displaySellOption, setDisplaySellOption] = useState(true);

    const [orderError, setOrderError] = useState('');

    const listenForValidCurrencyInputs = (keydown) => {
        // Only want this event listener to apply for USD
        if (transactionCurrencyType !== 'USD') return;

        const validInputs = '0123456789.'
        const validNavigation = ['Backspace', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete']
        if (!validInputs.includes(keydown.key) && !validNavigation.includes(keydown.key)) keydown.preventDefault();

        const amountInputField = document.getElementById('amount-order-input')
        if (keydown.key === '.' && amountInputField.value.includes('.')) keydown.preventDefault();
    }

    useEffect(() => {
        disabledInputs ? setDisabledStyle('disabled-input') : setDisabledStyle('');
    }, [disabledInputs])

    useEffect(() => {
        if (transactionType === 'Buy') {
            setAvailableCurrency(
                formatMoney(userAssets.$$$$$.quantity)
            )
            return;
        }

        if (transactionCurrencyType === 'USD') {
            setAvailableCurrency(
                formatMoney(userHasCurrentAsset.quantity * currentAssetLatestInfo.usd)
            )
            return;
        }

        setAvailableCurrency(
            userHasCurrentAsset.quantity.toString() + ' ' + transactionCurrencyType
        )


    }, [transactionType, transactionCurrencyType])

    useEffect(() => {
        if (transactionCurrencyType !== 'USD') {
            setTransactionTotal(formatMoney(currentAssetLatestInfo.usd * transactionAmount))
        } else {
            let tempTotal = (transactionAmount / currentAssetLatestInfo.usd).toString();
            const [whole, fraction] = tempTotal.split('.')
            if (fraction && fraction.length > 2) tempTotal = (transactionAmount / currentAssetLatestInfo.usd).toFixed(8).toString()
            else tempTotal = (transactionAmount / currentAssetLatestInfo.usd).toFixed(2).toString();

            setTransactionTotal(tempTotal)
        }


    }, [transactionCurrencyType, transactionAmount, currentAssetLatestInfo])

    useEffect(() => {
        if (transactionCurrencyType !== 'USD') return;

        const amountInputField = document.getElementById('amount-order-input')

        amountInputField.addEventListener('keydown', listenForValidCurrencyInputs)

        return () => amountInputField.removeEventListener('keydown', listenForValidCurrencyInputs)
    }, [transactionCurrencyType])

    const handleCurrencyTypeChange = (e) => {
        if (transactionCurrencyType === e.target.value) return;

        if (e.target.value === 'USD') setAmountPlaceholder('$0.00')
        else setAmountPlaceholder('0')

        setTransactionCurrencyType(e.target.value);
        setTransactionAmount('');
    }

    const handleAmountInputChange = (e) => {
        // If currency type !== USD => then the input type
        // will be a number so there no need to reformat
        if (e.target.value[0] === '0') return;
        if (transactionCurrencyType !== 'USD') return setTransactionAmount(e.target.value)

        // else we will reformat so that
        const [dollars, cents] = e.target.value.split('.')
        if (cents && cents.length > 2) return;

        console.log('formatted money')
        console.log(formatMoney(e.target.value))
        setTransactionAmount(e.target.value)
    }

    const validateBuyOrder = () => {
        if (transactionCurrencyType === 'USD') {
            if (parseInt(transactionAmount) > userAssets.$$$$$.quantity) {
                setOrderError({
                    header: 'Not Enough Buying Power',
                    message: `You don't have enough buying power to place this order`
                })
            }
        }

        if (transactionCurrencyType !== 'USD') {
            if (transactionAmount * currentAssetLatestInfo.usd > userAssets.$$$$$.quantity) {
                setOrderError({
                    header: 'Not Enough Buying Power',
                    message: `You don't have enough buying power to place this order`
                })
            }
        }
    }

    const validateSellOrder = () => {
        if (transactionCurrencyType === 'USD') {
            if (parseInt(transactionAmount) > currentAssetLatestInfo.usd * userHasCurrentAsset.quantity) {
                setOrderError({
                    header: `Not Enough ${userHasCurrentAsset.name}`,
                    message: `You can sell at most ${formatMoney(userHasCurrentAsset.quantity * currentAssetLatestInfo.usd)} of ${userHasCurrentAsset.name}`
                })
            }
        }

        if (transactionCurrencyType !== 'USD') {
            if (parseInt(transactionAmount) > userHasCurrentAsset.quantity) {
                setOrderError({
                    header: `Not Enough ${userHasCurrentAsset.name}`,
                    message: `You can sell at most ${userHasCurrentAsset.quantity} of ${userHasCurrentAsset.name}`
                })
            }
        }
    }

    const validateOrder = () => {
        if (orderError) setOrderError('');
        if (transactionType === 'Buy') validateBuyOrder();
        else validateSellOrder();
    }

    const startOrder = (e) => {
        e.preventDefault();
        setDisabledInputs(true)

        if (transactionType === 'Buy') {
            setDisplaySellOption(false)
        } else if (transactionType === 'Sell') {
            setDisplayBuyOption(false);
        }

        validateOrder();
    }

    const cancelOrder = (e) => {
        e.preventDefault();
        setDisabledInputs(false);
        setDisplaySellOption(true);
        setDisplayBuyOption(true);
    }

    return (
        <>
            <div id='asset-sidebar' className='flx-col'>

                <div id='asset-order-container' className='flx-col-justify-align-ctr'>
                    <div id='transaction-type' className='flx-row-align-ctr flx-grow-one'>

                        {displayBuyOption &&
                        <div
                            className={`transaction-type-selection ${transactionType === 'Buy' ? 'active-transaction-type' : ''}`}
                            onClick={() => setTransactionType('Buy')}
                            >
                            Buy {symbol}
                        </div>}

                        {userHasCurrentAsset && displaySellOption &&
                        <div
                            className={`transaction-type-selection ${transactionType === 'Sell' ? 'active-transaction-type' : ''}`}
                            onClick={() => setTransactionType('Sell')}
                            >
                            Sell {symbol}
                        </div>}

                    </div>

                    <form id='transaction-input-container' className='flx-col' onSubmit={startOrder} autocomplete="off">
                        <div id='set-transaction-type' className='flx-row-align-ctr flx-grow-one justify-space-btw'>
                            <div>
                                {transactionType} in
                            </div>

                            <select
                            id='currency-type-order-input'
                            className={`order-input ${disabledStyle}`}
                            onChange={handleCurrencyTypeChange}
                            disabled={disabledInputs}
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
                            type={transactionCurrencyType !== 'USD' ? 'number' : ''}
                            className={`order-input ${disabledStyle}`}
                            placeholder={amountPlaceholder}
                            onChange={handleAmountInputChange}
                            value={transactionAmount}
                            required
                            disabled={disabledInputs}
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

                        <div id='est-cost-section' className='flx-row-align-ctr flx-grow-one justify-space-btw'>
                            <div>
                                Est. {transactionCurrencyType === 'USD' ? symbol.toUpperCase() : transactionType === 'Buy' ? 'Cost' : 'Credit'}
                            </div>

                            <div id='est-cost-number'>
                                {transactionTotal}
                            </div>
                        </div>

                        {!disabledInputs &&
                        <button
                            id='submit-transaction'
                            onClick={startOrder}
                            >
                            Review Order
                        </button>}

                        {disabledInputs && !!orderError && (
                            <div className='order-error-section flx-col'>
                                <div className='order-error-field order-error-header'>
                                    {orderError.header}
                                </div>

                                <div className='order-error-field order-error-message'>
                                    {orderError.message}
                                </div>
                            </div>
                        )}

                        {disabledInputs && !orderError &&
                        <button
                            id='submit-buy-order'
                            onClick={cancelOrder}
                            >
                            Submit {transactionType}
                        </button>}

                        {disabledInputs &&
                        <button
                            id='cancel-order'
                            onClick={cancelOrder}
                            >
                            Back
                        </button>}
                    </form>

                    <div id='buying-power' className='flx-row-justify-align-ctr flx-grow-one'>
                        {availableCurrency} available
                    </div>

                </div>

                <button>Add to Lists</button>
            </div>

        </>
    )
}

export default AssetSidebar
