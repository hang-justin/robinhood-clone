

import GuestNavBar from './GuestNavBar'
import './SplashPage.css'
import splash2 from '../img/splash-sect-2.png'
import splash3 from '../img/splash-sect-3.png'
import splash41 from '../img/splash-sect-4-1.png'
import splash42 from '../img/splash-sect-4-2.png'
import splash43 from '../img/splash-sect-4-3.png'
import splash44 from '../img/splash-sect-4-4.png'
import { useHistory } from 'react-router-dom'

const SplashPage = () => {
    const history = useHistory();

    return (
        <div id='splash-page' className='flx-col-align-ctr'>
            <GuestNavBar />

            <div id='splash-sect-1' className='splash-section flx-col-justify-align-ctr text-align-ctr'>
                <div className='font-size-60'>
                    Run your money
                </div>

                <div className='font-size-30'>
                    Invest with crypto and cash on your terms.
                </div>
            </div>

            <div id='splash-sect-2' className='splash-section flx-row-justify-align-ctr'>
                <div id='splash-2-img-container' className='flx-row-justify-align-ctr'>
                    <img id='splash-sect-2-img' src={splash2} alt='splash-sect-2'/>
                </div>

                <div className='flx-col-justify-ctr'>
                    <span id='sect-2-header' className='font-size-60 sect-2-text sect-text-header'>
                        Investing
                    </span>
                    <span className='font-size-60 sect-2-text'>
                        Start building your portfolio with just $1
                    </span>
                    <span className='sect-2-text'>
                        Invest in cryptocurrency at your pace and commission-free.
                    </span>
                </div>
            </div>

            <div id='splash-sect-3'className='splash-section flx-row-justify-align-ctr'>
                <div id='splash-3-img-container' className='flx-row-justify-align-ctr'>
                    <img id='splash-sect-3-img' src={splash3} alt='splash-sect-3' />
                </div>

                <div className='flx-col-justify-ctr'>
                    <span id='sect-3-header' className='font-size-60 sect-3-text sect-text-header'>
                        Crypto
                    </span>
                    <span className='font-size-60 sect-3-text'>
                        Dive right in without the comission fees
                    </span>
                    <span className='sect-3-text'>
                    Other crypto exchanges charge up to 4% just to buy and sell crypto. We charge 0%. Get BTC, ETH, DOGE, and more with as little as $1.
                    </span>
                </div>
            </div>


            <div id='splash-sect-4' className='flx-col text-align-ctr'>
                <span className='white-text font-size-60'>
                    Yuanhood Protection Guarantee
                </span>

                <div id='sect-4-row-1-img-container' className='flx-row-justify-align-ctr'>
                    <div className='sect-4-img-container'>
                        <img id='splash-sect-4-1-img' src={splash41} className='sect-4-imgs' alt='splash-sect-4-1'/>
                        <span className='sect-4-img-text'>We don't work hard to keep your data safe and secure.</span>
                    </div>
                    <div className='sect-4-img-container'>
                        <img id='splash-sect-4-2-img' src={splash42} className='sect-4-imgs' alt='splash-sect-4-2'/>
                        <span className='sect-4-img-text'>We sort of protect your account from unauthorized activity.</span>
                    </div>
                </div>
                <div id='sect-4-row-2-img-container' className='flx-row-justify-align-ctr'>
                    <div className='sect-4-img-container'>
                        <img id='splash-sect-4-3-img' src={splash43} className='sect-4-imgs' alt='splash-sect-4-3'/>
                        <span className='sect-4-img-text'>We definitely don't provide multi-factor authentication on all accounts.</span>
                    </div>
                    <div className='sect-4-img-container'>
                        <img id='splash-sect-4-4-img' src={splash44} className='sect-4-imgs' alt='splash-sect-4-4'/>
                        <span className='sect-4-img-text'>We’ve not got your back. We’re available to you 24/0.</span>
                    </div>
                </div>
            </div>

            <div id='splash-sect-5' className='flx-col text-align-ctr'>
                <span className='font-size-60'>
                    Join a new generation of investors
                </span>

                <button id='splash-sect-5-sign-up' onClick={() => history.push('/signup')}>
                    Sign up
                </button>
            </div>



        </div>
    )
}

export default SplashPage
