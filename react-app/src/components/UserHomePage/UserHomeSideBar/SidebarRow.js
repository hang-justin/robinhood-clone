
import sparkline from '../../img/sparkline.PNG'
import './SidebarRow.css'

const SidebarRow = ({ asset }) => {
    
    return (
        <div className='sidebar-row  sidebar-row-content flx-row-align-ctr justify-space-btw'>

            <div className='sidebar-row__left flx-col'>
                <span>{asset.symbol.toUpperCase()}</span>
                <span>{asset.quantity}</span>
            </div>

            <img className='sparkline' src={sparkline} />

            <div className='sidebar-row__right flx-col-align-ctr'>
                <span>$100.00</span>
                <span>+100%</span>
            </div>

        </div>
    )
}

export default SidebarRow
