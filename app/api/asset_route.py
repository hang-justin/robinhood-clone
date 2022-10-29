from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import AssetForm
from app.models import db,  Asset

asset_routes = Blueprint('assets', __name__)

@asset_routes.route('/')
@login_required
def get_all_assets():
    # Returns all assets owned by logged in user
    owner_id = current_user.id
    assets = Asset.query.filter(Asset.owner_id == owner_id).all()

    return { 'assets' : [asset.to_dict_owner_asset() for asset in assets]}, 200


@asset_routes.route('/addfunds', methods=['POST'])
@login_required
def add_funds():
    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    del form.data['total']

    if form.validate_on_submit():
        buying_power = Asset.query.filter(
                                    Asset.owner_id == current_user.id,
                                    Asset.asset_id == '$$$$$').first()
        buying_power.add_to_asset(form.data['quantity'])
        db.session.commit()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400




@asset_routes.route('/<str:asset_id>/buy', methods=['POST'])
@login_required
def buy_asset(asset_id):
    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_holding_in_asset = Asset.query.filter(
                                            Asset.owner_id == current_user.id,
                                            Asset.asset_id == asset_id).first()

    buying_power = Asset.query.filter(
                                    Asset.owner_id == current_user.id,
                                    Asset.asset_id == '$$$$$').first()

    transaction_total = form.data['total']
    if buying_power.quantity < transaction_total:
        return { 'message' : 'Insufficient cash funds.' }, 412

    del form.data['total']

    if form.validate_on_submit():

        # If user does not have the asset in the portfolio, add it as a new asest
        if current_holding_in_asset is None:
            asset_posting = Asset()
            form.populate_obj(asset_posting)
            asset_posting.owner_id = current_user.id

            db.session.add(asset_posting)
            buying_power.add_to_asset(transaction_total)
            db.session.commit()

            return { 'message' : 'Asset successfully posted.' }, 201

        # If users already owns that asset, add onto the quantity of that asset
        if current_holding_in_asset is not None:
            current_holding_in_asset.add_to_asset(form.data['quantity'])
            buying_power.add_to_asset(transaction_total)
            db.session.commit()
            return { 'message' : 'Asset successfully posted.' }, 200

    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@asset_routes.route('/<str:asset_id>/sell', methods=['POST'])
@login_required
def sell_asset(asset_id):
    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_holding_in_asset = Asset.query.filter(
                                            Asset.owner_id == current_user.id,
                                            Asset.asset_id == asset_id).first()

    buying_power = Asset.query.filter(
                                    Asset.owner_id == current_user.id,
                                    Asset.asset_id == '$$$$$').first()
    transaction_total = form.data['total']
    del form.data['total']

    sell_quantity = form.data['quantity']

    if current_holding_in_asset is None:
        return { 'message' : 'You do not own any of this asset to sell.' }, 412

    if current_holding_in_asset.quantity < sell_quantity:
        return { 'message' : 'Insufficient funds. Unable to deduct more than current holdings in asset.' }, 412

    if form.validate_on_submit():
        if current_holding_in_asset.quantity == sell_quantity:
            buying_power.add_to_asset(transaction_total)
            db.session.delete(current_holding_in_asset)
            db.session.commit()
            return { 'message': 'Successfully sold all holdings in asset.' }, 200
        try:
            current_holding_in_asset.deduct_from_asset(sell_quantity)
            buying_power.add_to_asset(transaction_total)
            db.session.commit()
            return { 'message' : 'Successfully deducted holdings from asset.' }, 200
        except:
            return { 'message' : 'Insufficient funds. Unable to deduct more than current holdings in asset.' }, 412
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


@asset_routes.route('/<str:asset_id>/sell/all', methods=['DELETE'])
@login_required
def sell_all_asset(asset_id):
    form = AssetForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    current_holding_in_asset = Asset.query.filter(
                                            Asset.owner_id == current_user.id,
                                            Asset.asset_id == asset_id).first()

    buying_power = Asset.query.filter(
                                    Asset.owner_id == current_user.id,
                                    Asset.asset_id == '$$$$$').first()
    transaction_total = form.data['total']
    del form.data['total']

    if not current_holding_in_asset:
        return { 'message' : 'You do not own any of this asset to sell.' }, 412

    if form.validate_on_submit():
        db.session.delete(current_holding_in_asset)
        buying_power.add_to_asset(transaction_total)
        db.session.commit()
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
