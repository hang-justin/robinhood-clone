
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import PortfolioChart from '../UserHomePage/PortfolioChart';

import './AssetPage.css';
import AssetSidebar from './AssetSidebar';

const AssetPage = () => {

    return (
        <div id='asset-page' className='flx-row-justify-ctr'>
            <div id='asset-main-content' className='flx-row-justify-ctr'>

                <div id='asset-feed' className='flx-col flx-grow-one'>
                    <PortfolioChart />
                    <span>Followed by newsfeed</span>
                </div>

                <AssetSidebar />

            </div>
        </div>
    )
}

export default AssetPage
