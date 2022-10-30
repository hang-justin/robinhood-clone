

import { useSelector } from 'react-redux'
import './UserHomeSideBar.css'

const UserHomeSideBar = () => {
    const allOwnedAssets = useSelector(state => state.assets)
    const allWatchlists = useSelector(state => state.watchlists)

    return (
        <div id='user-home-sidebar'>
            Sidebar goes over here so why don't you take a look at this over here
            Cryptocurrencies
        </div>
    )
}

export default UserHomeSideBar
