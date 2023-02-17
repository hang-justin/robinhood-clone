import './AccountNavOptions.css';

const AccountNavOptions = () => {

    return (
        <ul id='account-nav-options' onClick={e => e.stopPropagation()}>

            <li className='acc-nav-li flx-row-align-ctr'>
                <span class="material-symbols-outlined">
                    history
                </span>

                <span>
                    History
                </span>
            </li>

            <li className='acc-nav-li flx-row-align-ctr'>
                <span class="material-symbols-outlined">
                    logout
                </span>

                <span>
                    Log Out
                </span>
            </li>
        </ul>
    )
}

export default AccountNavOptions;
