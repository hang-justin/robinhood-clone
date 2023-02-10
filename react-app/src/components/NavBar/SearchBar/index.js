import { useState } from 'react';
import SearchButton from '../SearchButton';
import SearchResults from '../SearchResults';
import './SearchBar.css';

const SearchBar = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
        <li id='search-bar' className='navbar-li flx-row-align-ctr'>
            <input
                id='search-input'
                onChange={e => setSearchInput(e.target.value)}
                placeholder='Search'
                value={searchInput}
                autoComplete='off'
            />

            <SearchButton />
            <SearchResults
                searchInput={searchInput}
                setSearchInput={setSearchInput}
            />

        </li>
    )
};

export default SearchBar;
