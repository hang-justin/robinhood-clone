
import { NavLink } from 'react-router-dom'
import './AssetNotFound.css'

const AssetNotFound = () => {

    return (
        <div id='asset-not-found' className='flx-col-justify-align-ctr flx-grow-one'>
            <h1>
                Sorry, we can't find that asset :(
            </h1>
            <h2>
                <NavLink className='asset-not-found-nav' to='/lists/yuanhood/crypto'>
                    Click here to view all the supported cryptocurrencies.
                </NavLink>
            </h2>
        </div>
    )
}

export default AssetNotFound
