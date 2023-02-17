import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

import { logout } from "../../../store/session";

const LogOutOption = ({ setShowAccNavOptions }) => {
    const history = useHistory();
    const dispatch = useDispatch();

    const handleLogOut = () => {

        dispatch(logout())
            .then(() => history.push('/login'))
    };

    return (
        <li
            className='acc-nav-li flx-row-align-ctr'
            onClick={handleLogOut}
            >

            <span class="material-symbols-outlined">
                logout
            </span>

            <span>
                Log Out
            </span>
        </li>
    )
};


export default LogOutOption;
