import { useEffect, useState } from 'react';
import AccountNavOptions from '../AccountNavOptions';
import './AccountNav.css';

const AccountNav = () => {
    const [showAccNavOptions, setShowAccNavOptions] = useState(false);

    useEffect(() => {
        if (!showAccNavOptions) return;

        const closeOptions = () => {
            setShowAccNavOptions(false);
        };

        document.addEventListener('click', closeOptions)

        return () => document.removeEventListener('click', closeOptions)
    })

    return (
        <div className='pos-rel'>
            <button id='account-nav-btn' onClick={() => setShowAccNavOptions(prev => !prev)}>
                <div id='account-nav' className={showAccNavOptions ? 'account-nav-active' : ''}>
                    Account
                </div>
            </button>

            {
                showAccNavOptions &&
                <AccountNavOptions setShowAccNavOptions={setShowAccNavOptions}/>
            }
        </div>
    )
};

export default AccountNav;
