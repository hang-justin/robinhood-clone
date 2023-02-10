import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './SearchResultCard.css';

const SearchResultCard = ({ assetId, setSearchInput }) => {
    const history = useHistory();

    const market = useSelector(state => state.market)
    const assetName = market.asset_id_to_name[assetId];
    const symbol = market.asset_id_to_symbol[assetId];

    const navToCrypto = () => {
        history.push(`/crypto/${symbol}`)
        setSearchInput('');
    }

    return (
        <li className='li-search-result flx-row-align-ctr' onClick={navToCrypto}>
            <span className='search-result-symbol'>
                {symbol}
            </span>

            <span className='search-result-name'>
                {assetName}
            </span>
        </li>
    )
};

export default SearchResultCard;
