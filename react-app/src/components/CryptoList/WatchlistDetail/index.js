import { useSelector } from 'react-redux';

import WatchlistDetailRow from './WatchlistDetailRow';

import './WatchlistDetail.css';
import { NavLink } from 'react-router-dom';

const WatchlistDetail = ({ userId, listId, itemIds }) => {
    const allWatchlists = useSelector(state => state.watchlists)

const NoWatchlistMessage = () => (
    <div id='no-watchlist-container' className='flx-col-align-ctr'>
        <span className='no-watchlist-msg font-size-30'>Feels a little empty in here...</span>

        <span className='no-watchlist-msg'>
            <NavLink id='navlink-to-master-list' to='/lists/yuanhood/crypto'>
                Click here to view the supported cryptocurrencies and add them to your watchlist
            </NavLink>
        </span>
    </div>
    )

    return (
        <>
            <div id='current-list-items' className='flx-col flx-grow-one'>

                <div id='crypto-list-header' className='flx-col'>
                    <div className='watchlist-title-emoji'>
                        💡
                    </div>

                    <div className='watchlist-title-name'>
                        {listId === 'crypto' ? 'Crypto' : allWatchlists[listId].name}
                    </div>

                    <div className='watchlist-item-count'>
                        {itemIds.length} items
                    </div>

                </div>

                {!itemIds.length ?
                    <NoWatchlistMessage /> :
                    (<div className='flx-row-align-ctr watchlist-detail-row'>

                        <div className='name-col'>
                            <span className='watchlist-detail-col-header'>Name</span>
                        </div>

                        <div className='symbol-col'>
                            <span className='watchlist-detail-col-header'>Symbol</span>
                        </div>

                        <div className='price-col'>
                            <span className='watchlist-detail-col-header'>Price</span>
                        </div>

                        <div className='day-change-col'>
                            <span className='watchlist-detail-col-header'>24h Change</span>
                        </div>

                        <div className='market-cap-col'>
                            <span className='watchlist-detail-col-header'>Market Cap</span>
                        </div>

                        <div className='add-to-list-col'>

                        </div>

                    </div>
                )}

                {itemIds.map(id => <WatchlistDetailRow key={id} userId={userId} listId={listId} asset_id={id} /> )}
            </div>
        </>
    )
}

export default WatchlistDetail
