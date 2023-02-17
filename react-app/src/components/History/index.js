import { useSelector } from 'react-redux';
import './History.css';
import Transactions from './Transactions';

const History = () => {
    const user = useSelector(state => state.session.user);

    return (
        <div id='history-page' className='flx-row-justify-ctr'>
            <div id='history-content' className='flx-col'>
                <span className='font-size-30'>
                    {user.first_name} {user.last_name}
                </span>

                <Transactions />
            </div>
        </div>
    )
};

export default History;
