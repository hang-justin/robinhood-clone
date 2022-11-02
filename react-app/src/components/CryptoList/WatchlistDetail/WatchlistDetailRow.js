import { useSelector } from "react-redux"
import getNumberRep from "../../../util/getNumberRep"

import posChange from '../../img/pos_change_history.png'
import negChange from '../../img/neg_change_history.png'
import { useState } from "react"
import { Modal } from "../../../context/Modal"
import AddToListModal from "./AddToListModal"

const WatchlistDetailRow = ({ userId, asset_id }) => {
    const allAssets = useSelector(state => state.assets)
    const latestInfoOfAllCoins = useSelector(state => state.market.allLatest)

    const currentCoinSymbol = useSelector(state => state.market.asset_id_to_symbol[asset_id])
    const currentCoinName = useSelector(state => state.market.asset_id_to_name[asset_id])
    const currentCoinInfo = latestInfoOfAllCoins[asset_id];
    const dailyChangePercentage = currentCoinInfo.usd_24h_change.toFixed(2)
    const percentageChangeTextColor = dailyChangePercentage >= 0 ? 'main-green-text' : 'main-red-text';
    const changeIconSrc = dailyChangePercentage >= 0 ? posChange : negChange
    const holdingInAsset = allAssets[asset_id] ? allAssets[asset_id].quantity : null

    const [showAddToListModal, setShowAddToListModal] = useState(false);

    const handleAddToListModal = (e) => {
        e.stopPropagation();
        setShowAddToListModal(true)
    }

    const addToList =(
                        <span
                            className='material-symbols-outlined add-to-watchlist-icon'
                            onClick={handleAddToListModal}
                        >
                            add
                        </span>
                    )

    // Either render a delete or add to list
    const editOption = userId === 'yuanhood' ?
                                    addToList :
                                    'x'

    return (
        <>
            <div className='flx-row-align-ctr watchlist-detail-row watchlist-detail-redirect' onClick={() => alert(`clicking on ${currentCoinName}`)}>

                <div className='name-col flx-col'>
                    <span>
                        {currentCoinName}
                    </span>

                    {holdingInAsset &&
                        <span>
                            {holdingInAsset}
                        </span>
                    }
                </div>

                <div className='symbol-col'>
                    {currentCoinSymbol}
                </div>

                <div className='price-col'>
                    ${currentCoinInfo.usd}
                </div>

                <div className={`day-change-col flx-row-align-ctr ${percentageChangeTextColor}`}>
                    <img className='watchlist-detail__change' src={changeIconSrc} />

                    {Math.abs(dailyChangePercentage)}%
                </div>

                <div className='market-cap-col'>
                    {getNumberRep(currentCoinInfo.usd_market_cap)}
                </div>

                <div className='add-to-list-col flx-row-justify-end'>
                    {editOption}
                </div>

            </div>

            {showAddToListModal &&
                <Modal onClose={() => setShowAddToListModal(false)}>
                    <AddToListModal
                        setShowAddToListModal={setShowAddToListModal}
                        currentCoinName={currentCoinName}
                        asset_id={asset_id}
                    />
                </Modal>
            }

        </>
    )
}

export default WatchlistDetailRow
