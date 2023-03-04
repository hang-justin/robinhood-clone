import { useHistory } from 'react-router-dom';
import './AccountNavOptions.css';
import HistoryOption from './HistoryOption';
import LogOutOption from './LogOutOption';

const AccountNavOptions = ({ setShowAccNavOptions }) => {

    return (
        <ul id='account-nav-options' onClick={e => e.stopPropagation()}>

            <HistoryOption setShowAccNavOptions={setShowAccNavOptions}/>

            <LogOutOption setShowAccNavOptions={setShowAccNavOptions} />
        </ul>
    )
}

export default AccountNavOptions;
