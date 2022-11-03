from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app import cg


cg_routes = Blueprint('cg', __name__)


@cg_routes.route('/all')
def get_all_crypto():
    coins = 'bitcoin,ethereum,binancecoin,ripple,cardano,solana,dogecoin,matic-network,polkadot,staked-ether'
    return cg.get_price(
                ids=coins,
                vs_currencies='usd',
                include_market_cap=True,
                include_24hr_vol=True,
                include_24hr_change=True,
                include_last_updated_at=True)
