import PortfolioChart from './PortfolioChart'
import Portfolio from './Portfolio'
import './UserHomePage.css'
import UserHomeSideBar from './UserHomeSideBar'

const UserHomePage = () => {
    return (
        <div id='user-home-page' className='flx-row-justify-ctr'>
            <div id='user-home-content' className='flx-row-justify-ctr'>

                <div id='main-feed' className='flx-col flx-grow-one'>
                    <Portfolio />
                </div>

                <UserHomeSideBar />

            </div>
        </div>
    )
}

export default UserHomePage
