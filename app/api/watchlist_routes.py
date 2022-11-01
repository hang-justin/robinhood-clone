from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import WatchlistForm
from app.models import db, Watchlist, Watchitem

watchlist_routes = Blueprint('watchlists', __name__)

# Get all watchlists owned by current user
@watchlist_routes.route('/')
@login_required
def get_all_watchlists():
    '''
    Return an object containing an array of watchlists objects/dictionary
    '''

    owner_id = current_user.id

    watchlists = Watchlist.query.filter(Watchlist.owner_id == owner_id).all()

    return {'watchlists': [watchlist.to_dict() for watchlist in watchlists]}, 200

# Create a watchlist
@watchlist_routes.route('/new', methods=['POST'])
@login_required
def create_watchlist():
    '''
    Returns watchlist object upon successful validation
    '''

    form = WatchlistForm()
    form['owner_id'].data = current_user.id
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        new_watchlist = Watchlist()
        form.populate_obj(new_watchlist)

        db.session.add(new_watchlist)
        db.session.commit()

        return new_watchlist.to_dict(), 201

    else:
        return {'errors': validation_errors_to_error_messages(form.errors)}, 400

# Edit a watchlist
@watchlist_routes.route('/<int:watchlist_id>', methods=['POST'])
@login_required
def edit_watchlist_name(watchlist_id):
    form = WatchlistForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    watchlist = Watchlist.query.get(watchlist_id)

    if watchlist is None:
        return { 'message' : 'Watchlist not found'}, 404

    if current_user.id != watchlist.owner_id:
        return { 'message' : 'You do not have permission to edit this watchlist.' }, 403

    form['owner_id'].data = current_user.id

    if form.validate_on_submit():
        form.populate_obj(watchlist)
        db.session.commit()
        return {
            'message': 'Successfully updated watchlist.',
            'watchlist': watchlist.to_dict()}, 200
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400


# Add/remove item to/from watchlist
@watchlist_routes.route('/<int:watchlist_id>/<string:edit_action>/<int:asset_id>', methods=['POST'])
@login_required
def edit_watchlist_items(watchlist_id, edit_action, asset_id):
    '''
    Adds/remove asset to/from a watchlist
    '''

    # Initial guard clauses for malformed requests to avoid DB connection
    if edit_action != 'add' or edit_action != 'remove':
        return { 'message' : 'Invalid edit action. Valid edit actions are add/remove.' }, 400

    # v-- prob not necessary... asset_id is required to hit this field
    if not asset_id:
        return { 'message' : 'Please specify an asset_id.'}

    # First db connection
    current_watchlist = Watchlist.query.get(watchlist_id)

    # Additional guard clauses to avoid second DB connection
    if not current_watchlist:
        return { 'message' : 'Watchlist not found'}, 404

    if not current_user.id == current_watchlist.owner_id:
        return { 'message' : 'You do not have permission to edit this watchlist.' }, 403

    # Second/last db connection
    # Maybe we can search current_watchlist.items to see if those
    # Watchitem objects have the id of asset_id have the requested asset_id
    watchlist_item = Watchitem.query.filter(Watchitem.asset_id == asset_id, Watchitem.owner_id == None)

    if not watchlist_item:
        return { 'message' : 'Item not supported or found. Unable to add to watchlist' }, 400

    if watchlist_item in current_watchlist.items and edit_action == 'add':
        return { 'message' : 'Item is already in watchlist.' }, 400

    if watchlist_item not in current_watchlist.items and edit_action == 'remove':
        return { 'message' : 'Item not found in watchlist. Unable to remove.' }, 400

    if (edit_action == 'remove'):
        current_watchlist.items.remove(watchlist_item)
        db.session.commit()
        return {
            'message': 'Successfully updated watchlist.',
            'watchlist': current_watchlist.to_dict()}, 200

    if (edit_action == 'add'):
        current_watchlist.items.append(watchlist_item)
        db.session.commit()
        return {
            'message': 'Successfully updated watchlist.',
            'watchlist': current_watchlist.to_dict()}, 200

# Delete watchlist
@watchlist_routes.route('/<int:watchlist_id>', methods=['DELETE'])
@login_required
def delete_watchlist(watchlist_id):
    current_watchlist = Watchlist.query.get(watchlist_id)

    if not current_watchlist:
        return { 'message' : 'Watchlist not found.' }, 404

    if current_watchlist.owner_id != current_user.id:
        return { 'message' : 'You do not have permission to edit this watchlist.' }, 403

    db.session.delete(current_watchlist)
    db.session.commit()
    return { 'message': 'Watchlist successfully deleted' }
