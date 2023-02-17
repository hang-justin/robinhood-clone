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
                <div id='account-nav'>
                    Account
                </div>
            </button>

            {
                showAccNavOptions &&
                <AccountNavOptions />
            }
        </div>
    )
};

export default AccountNav;
