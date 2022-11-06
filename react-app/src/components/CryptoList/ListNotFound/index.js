
import { NavLink } from 'react-router-dom'
import './ListNotFound.css'

const ListNotFound = () => {

    return (
        <div id='list-not-found' className='flx-col-justify-align-ctr'>
            <h1>
                Sorry, we couldn't find that watchlist :(
            </h1>
            <h2>
                <NavLink to='/' className='list-not-found-nav'>
                    Click here to go back home
                </NavLink>
            </h2>
            <h2>
                <NavLink to='/' className='list-not-found-nav'>
                    Or click here to see a list of all our supported cryptocurrencies
                </NavLink>
            </h2>
        </div>
    )
}

export default ListNotFound
