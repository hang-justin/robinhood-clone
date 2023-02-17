import { useHistory } from "react-router-dom";

const HistoryOption = ({ setShowAccNavOptions }) => {
    const history = useHistory();
    
    const navToHistory = () => {
        setShowAccNavOptions(false);
        history.push('/account/history')
        return;
    }

    return (
        <li
            className='acc-nav-li flx-row-align-ctr'
            onClick={navToHistory}
            >

            <span className="material-symbols-outlined">
                history
            </span>

            <span>
                History
            </span>

        </li>
    )
};

export default HistoryOption;
