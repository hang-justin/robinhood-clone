import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Modal } from '../../../context/Modal';
import { processOrder } from '../../../store/asset';
import formatMoney from '../../../util/formatMoney';
import AddToListModal from '../../CryptoList/WatchlistDetail/AddToListModal';

import './AssetSidebar.css';
import OrderComplete from './OrderComplete';

const AssetSidebar = () => {
    const dispatch = useDispatch();
    const [showCompletedOrder, setShowCompletedOrder] = useState(false)
    const { symbol } = useParams();

    const market = useSelector(state => state.market)
    const currentAssetId = market.symbol_to_asset_id[symbol.toLowerCase()]
    const currentAssetLatestInfo = market.allLatest[currentAssetId]
    const currentAssetName = market.asset_id_to_name[currentAssetId]

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
    const [orderInformation, setOrderInformation] = useState('')

    const [showAddToListModal, setShowAddToListModal] = useState(false);

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
            if (transactionAmount === '.') return setTransactionTotal('0.00');
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
        if (transactionCurrencyType !== 'USD') {
            const [whole, fraction] = e.target.value.split('.')

            if (fraction && fraction.length > 8) return setTransactionAmount( (+e.target.value).toFixed(8).toString() )

            return setTransactionAmount(e.target.value)
        }

        // else we will reformat so that
        const [dollars, cents] = e.target.value.split('.')
        if (cents && cents.length > 2) return;

        setTransactionAmount(e.target.value)
    }

    const validateBuyOrder = () => {
        if (transactionCurrencyType === 'USD') {
            if (!+transactionAmount) return setOrderError({
                header: 'Invalid Amount',
                message: 'Please enter a valid number of dollars.'
            })

            if (+transactionAmount < 1) {
                if (+transactionAmount / currentAssetLatestInfo.usd < 1 && currentAssetLatestInfo.usd < 1) {
                    return setOrderError({
                        header: 'Order Too Small',
                        message: `${currentAssetName} orders must be at least $${currentAssetLatestInfo.usd.toFixed(2)}`
                    })
                } else if (+transactionAmount / currentAssetLatestInfo.usd > 1) {
                    // Scenario: User wants to buy a cryptocurrency where
                    // Cryptocurrency unit price is <$1/coin
                    // Transaction amount is <$1, BUT still greater than cryptocurrency unit price
                    //
                    // So the user wants to buy more than 1 coin and spend less than <$1
                    // Allow the user to do so
                    //
                    //
                    // IF the user wants to buy a fraction of a coin that is <$1,
                    // the if statement directly before this else if will run
                    //
                    // If the user wants to spend <$1 on a coin with a unit price >=$1
                    // The below else statement will run
                }
                else {
                    return setOrderError({
                        header: 'Order Too Small',
                        message: `${currentAssetName} orders must be at least $1.00.`
                    })
                }

            }

            if (+(transactionAmount) > userAssets.$$$$$.quantity) {
                return setOrderError({
                    header: 'Not Enough Buying Power',
                    message: `You don't have enough buying power to place this order.`
                })
            }
        }

        if (transactionCurrencyType !== 'USD') {
            if (!+transactionAmount) return setOrderError({
                header: 'Invalid Amount',
                message: `Please enter a valid number of ${symbol}.`
            })

            if (+transactionAmount * currentAssetLatestInfo.usd < 1) {
                if (currentAssetLatestInfo.usd < 1) {
                    if (+transactionAmount < 1) {
                        return setOrderError({
                            header: 'Order Too Small',
                            message: `${currentAssetName} orders must be at least 1 ${symbol}`
                        })
                    }
                }
                else {
                    return setOrderError({
                    header: 'Order Too Small',
                    message: `${currentAssetName} orders must be at least ${(1/currentAssetLatestInfo.usd).toFixed(8)} ${symbol}.` })
                }
            }


            if (+transactionAmount * currentAssetLatestInfo.usd > userAssets.$$$$$.quantity) {
                return setOrderError({
                    header: 'Not Enough Buying Power',
                    message: `You don't have enough buying power to place this order.`
                })
            }
        }

        if (!orderError) {
            return setOrderInformation({
                transactionType,
                asset_id: currentAssetId,
                symbol,
                name: currentAssetName,
                transactionTotal,
                transactionAmount,
                transactionCurrencyType,
                asset_price: currentAssetLatestInfo.usd
            })
        }
    }

    const validateSellOrder = () => {
        if (transactionCurrencyType === 'USD') {
            if (!+transactionAmount) return setOrderError({
                header: 'Invalid Amount',
                message: 'Please enter a valid amount of dollars.'
            })

            if (+(transactionAmount) > currentAssetLatestInfo.usd * userHasCurrentAsset.quantity) {
                return setOrderError({
                    header: `Not Enough ${userHasCurrentAsset.name}`,
                    message: `You can sell at most ${formatMoney(userHasCurrentAsset.quantity * currentAssetLatestInfo.usd)} of ${userHasCurrentAsset.name}.`
                })
            }

            if (+transactionAmount < 1) {
                if (currentAssetLatestInfo.usd < 1) {
                    if (transactionAmount < currentAssetLatestInfo.usd) {
                        return setOrderError({
                            header: 'Order Too Small',
                            message: `${currentAssetName} orders must be at least $${currentAssetLatestInfo.usd.toFixed(2)}.`
                        })
                    }
                } else {
                    return setOrderError({
                        header: 'Order Too Small',
                        message: `${currentAssetName} orders must be at least $1.00.`
                    })
                }
            }
        }

        if (transactionCurrencyType !== 'USD') {
            if (!+transactionAmount) return setOrderError({
                header: 'Invalid Amount',
                message: `Please enter a valid number of ${symbol}.`
            })

            if (+transactionAmount < 1 && currentAssetLatestInfo.usd < 1) {
                return setOrderError({
                    header: 'Order Too Small',
                    message: `${currentAssetName} orders must be at least 1.00 ${symbol}.`
                })
            }

            if (+transactionAmount * currentAssetLatestInfo.usd < 1 && currentAssetLatestInfo.usd > 1) {
                return setOrderError({
                    header: 'Order Too Small',
                    message: `${currentAssetName} orders must be at least ${(1/currentAssetLatestInfo.usd).toFixed(8)} ${symbol}.`
                })
            }

            if (+transactionAmount > userHasCurrentAsset.quantity) {
                return setOrderError({
                    header: `Not Enough ${userHasCurrentAsset.name}`,
                    message: `You can sell at most ${userHasCurrentAsset.quantity} of ${userHasCurrentAsset.name}.`
                })
            }
        }

        if (!orderError) {
            return setOrderInformation({
                transactionType,
                asset_id: currentAssetId,
                symbol,
                name: currentAssetName,
                transactionTotal,
                transactionAmount,
                transactionCurrencyType,
                asset_price: currentAssetLatestInfo.usd
            })
        }
    }

    const validateOrder = () => {
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

        setOrderError('')
        validateOrder();
    }

    const cancelOrder = (e) => {
        e.preventDefault();
        setDisabledInputs(false);
        setDisplaySellOption(true);
        setDisplayBuyOption(true);
        setOrderError('')
        setOrderInformation('')
    }

    const submitOrder = (e) => {
        e.preventDefault();
        dispatch(processOrder(orderInformation))
            .then(() => {
                setDisabledInputs(false);
                setTransactionAmount('')

                setDisplaySellOption(true)
                setDisplayBuyOption(true)

                setShowCompletedOrder(true);
            })
    }

    return (
        <>
            <div id='asset-sidebar' className='flx-col'>

                <div id='asset-order-container' className='flx-col-justify-align-ctr'>
                    {showCompletedOrder ? <OrderComplete setShowCompletedOrder={setShowCompletedOrder} orderInformation={orderInformation}/> :
                    (<>

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

                    <form id='transaction-input-container' className='flx-col' onSubmit={startOrder} autoComplete="off">
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
                                <option id='usd' value='USD'>USD</option>
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
                            min={transactionCurrencyType !== 'USD' ? '0' : ''}
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
                            onClick={submitOrder}
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

                    </>)}

                </div>

                <button id='add-to-list-btn' onClick={() => setShowAddToListModal(true)}>
                    Add to Lists
                </button>

                {showAddToListModal &&
                    <Modal onClose={() => setShowAddToListModal(false)}>
                        <AddToListModal
                            setShowAddToListModal={setShowAddToListModal}
                            currentCoinName={currentAssetName}
                            asset_id={currentAssetId}
                        />
                    </Modal>
                }
            </div>

        </>
    )
}

export default AssetSidebar
