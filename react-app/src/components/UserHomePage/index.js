

import PortfolioChart from './PortfolioChart'
import './UserHomePage.css'
import UserHomeSideBar from './UserHomeSideBar'

const UserHomePage = () => {

    return (
        <div id='user-home-page' className='flx-row-justify-ctr'>
            <div id='user-home-content' className='flx-row-justify-ctr'>

            <div id='main-feed' className='flx-col flx-grow-one'>
                <PortfolioChart />
                <span>newsfeed goes here</span>
            </div>

            <UserHomeSideBar />

            </div>
        </div>
    )
}

export default UserHomePage
