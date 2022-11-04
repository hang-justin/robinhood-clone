import { useSelector } from 'react-redux';
import { Redirect, useParams } from 'react-router-dom';
import UserHomeSideBar from '../UserHomePage/UserHomeSideBar'

import './CryptoList.css';
import WatchlistDetail from './WatchlistDetail';

const CryptoList = () => {
    let { userId, listId } = useParams();

    if (userId !== 'yuanhood') userId = +userId

    const user = useSelector(state => state.session.user)
    const allWatchlists = useSelector(state => state.watchlists)
    const market = useSelector(state => state.market)
    const latestPricesOfAllCoins = market.allLatest
    let itemIds;

    // NOTE
    // Where to redirect of userId doesn't match up with user.id?
    // Be mindful where userId === yuanhood

    if (userId  !== user.id && userId !== 'yuanhood') return <Redirect to='/' />
    if (userId === user.id && !allWatchlists[listId]) return <Redirect to='/' />
    if (userId === 'yuanhood' && listId !== 'crypto') return <Redirect to='/' />
    if (userId !== 'yuanhood' && listId === 'crypto') return <Redirect to='/' />

    if (userId === 'yuanhood' && listId === 'crypto') itemIds = Object.keys(latestPricesOfAllCoins);
    else {
        const currentWatchlist = allWatchlists[listId];
        if (!currentWatchlist) return <Redirect to='/lists/yuanhood/crypto' />
        itemIds = currentWatchlist.items.map(item => item.asset_id)
    }

    return (
        <div id='crypto-list-page' className='flx-col'>

            <div id='crypto-list-content' className='flx-row-justify-ctr'>


                <WatchlistDetail userId={userId} listId={listId} itemIds={itemIds} />

                <UserHomeSideBar />

            </div>

        </div>
    )
}

export default CryptoList
