import { useSelector } from 'react-redux';

import WatchlistDetailRow from './WatchlistDetailRow';

import './WatchlistDetail.css';

const WatchlistDetail = ({ userId, listId, itemIds }) => {
    const allWatchlists = useSelector(state => state.watchlists)

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

                <div className='flx-row-align-ctr watchlist-detail-row'>

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

                {itemIds.map(id => <WatchlistDetailRow key={id} userId={userId} listId={listId} asset_id={id} /> )}
            </div>
        </>
    )
}

export default WatchlistDetail
