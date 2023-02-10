import { useSelector } from 'react-redux';
import SearchResultCard from '../SearchResultCard';
import './SearchResults.css';

const SearchResults = ({ searchInput, setSearchInput }) => {
    const market = useSelector(state => state.market);
    const allAssetIds = Object.keys(market.asset_id_to_symbol);

    if (searchInput === '') return null;

    // market is
    //      symbol_to_asset_id
    //      asset_id_to_symbol
    //      asset_id_to_name

    // check search input against symbol and against name
    // search result will be clickable and will redirect to
    // /crypto/:symbol

    const searchInputLowered = searchInput.toLowerCase();

    const possibleSearchResultByAssetIds = [];

    allAssetIds.forEach(assetId => {
        const assetSymbol = market.asset_id_to_symbol[assetId].toLowerCase();
        if (assetSymbol.includes(searchInputLowered)) {
            possibleSearchResultByAssetIds.push(assetId);
            return;
        }

        const assetName = market.asset_id_to_name[assetId].toLowerCase();
        if (assetName.includes(searchInputLowered)) {
            possibleSearchResultByAssetIds.push(assetId);
            return;
        }
    });


    return (
        <ul id='search-results' className='flx-col'>
            {
                possibleSearchResultByAssetIds.map(assetId =>
                    <SearchResultCard
                        key={assetId}
                        assetId={assetId}
                        setSearchInput={setSearchInput}
                    />
                )
            }

            {
                possibleSearchResultByAssetIds.length === 0 &&
                <li id='search-no-match' className='li-search-result flx-row-align-ctr'>
                    We were unable to find any results for your search.
                </li>
            }
        </ul>
    )
};

export default SearchResults;
