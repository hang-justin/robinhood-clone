import { useSelector } from "react-redux"
import { NavLink } from "react-router-dom"
import formatMoney from "../../../util/formatMoney"

const OwnedAssetRow = ({ ownedAsset }) => {
    const market = useSelector(state => state.market)
    const latestPrices = market.allLatest

    if (ownedAsset.asset_id === '$$$$$') return null;

    return (
        <div className='owned-asset-row flx-row-justify-align-ctr'>

            <div className='owned-asset-symbol owned-asset-column'>
                {ownedAsset.asset_id === '$$$$$' ? 'USD' : ownedAsset.symbol.toUpperCase()}
            </div>

            <div className='owned-asset-name owned-asset-column'>
                {ownedAsset.asset_id === '$$$$$' ? 'US Dollar' : ownedAsset.name}
            </div>

            <div className='owned-asset-balance owned-asset-column'>
                {ownedAsset.asset_id === '$$$$$' ? formatMoney(ownedAsset.quantity) : (
                    <>
                        <div>
                            {ownedAsset.quantity} {ownedAsset.symbol.toUpperCase()}
                        </div>
                        <div>
                            {formatMoney(ownedAsset.quantity * latestPrices[ownedAsset.asset_id].usd)}
                        </div>
                    </>
                )}
            </div>

            <div className='owned-asset-buy-sell owned-asset-column'>
                <NavLink className='nav-to-asset' to={`/crypto/${ownedAsset.symbol.toUpperCase()}`}>
                    Purchase/Sell
                </NavLink>
            </div>

        </div>
    )
}

export default OwnedAssetRow
