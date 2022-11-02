import { useParams } from 'react-router-dom';

import './AssetSidebar.css';

const AssetSidebar = () => {
    const { symbol } = useParams();


    return (
        <div id='asset-sidebar' className='flx-col'>

            <div>
                <span>Buy {symbol}... Sell {symbol}</span>
            </div>

        </div>
    )
}

export default AssetSidebar
