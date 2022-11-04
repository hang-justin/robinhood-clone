import { useSelector } from 'react-redux';

import WatchlistDetailRow from './WatchlistDetailRow';

import './WatchlistDetail.css';

const WatchlistDetail = ({ userId, listId, itemIds }) => {

    return (
        <>
            <div id='current-list-items' className='flx-col flx-grow-one'>

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
