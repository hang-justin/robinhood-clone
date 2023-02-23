from flask import Blueprint, jsonify, request
from flask_login import login_required, current_user
from app.api.auth_routes import validation_errors_to_error_messages
from app.forms import TransactionForm
from app.models import db,  Transaction
from datetime import datetime, timezone

transaction_routes = Blueprint('transactions', __name__)


@transaction_routes.route('/')
@login_required
def get_all_transactions():
    # Returns all transactions made by logged in user
    party_id = current_user.id
    transactions = Transaction.query.filter(Transaction.party_id == party_id).all()

    return { 'transactions' : [transaction.to_dict() for transaction in transactions]}, 200


@transaction_routes.route('/new', methods=['POST'])
@login_required
def post_transactions():
    party_id = current_user.id

    form = TransactionForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if form.validate_on_submit():
        # find out what it is doing
        # if type is cryptocurrency
        # find out if it is adding/removing
        # other transaction is $$$$$

        transaction_A = Transaction()
        transaction_B = Transaction()

        form.populate_obj(transaction_A)
        form.populate_obj(transaction_B)

        transaction_A.party_id = party_id
        transaction_B.party_id = party_id


        if transaction_A.asset_id != '$$$$$':
            # transaction_A.total = -transaction_A.total

            transaction_B.asset_id = '$$$$$'
            transaction_B.symbol = '$$$$$'
            transaction_B.name = '$$$$$'
            transaction_B.type = 'exchange'
            transaction_B.quantity = transaction_B.total

            # if transaction_A.total > 0:
            #     # meaning that cash was added
            #     # meaning that an asset was sold
            #     # meaning that quantity must be negative
            #     transaction_A.quantity = -transaction_A.quantity

            transaction_A.timestamp = datetime.now(timezone.utc)
            transaction_B.timestamp = datetime.now(timezone.utc)
            db.session.add(transaction_A)
            # db.session.add(transaction_B)
            db.session.commit()
            return { 'message': 'Transactions successfully posted.'}

        else:
            # if asset_id is $$$$$
            # then it was a deposit
            # transaction_A.type will be Bank deposit
            transaction_B.quantity = -transaction_A.quantity
            transaction_B.total = -transaction_A.quantity
            transaction_B.type = 'Bank Withdrawl'

            transaction_A.timestamp = datetime.now(timezone.utc)
            transaction_B.timestamp = datetime.now(timezone.utc)
            db.session.add(transaction_A)
            db.session.add(transaction_B)
            db.session.commit()
            return { 'message': 'Transactions successfully posted.'}
    else:
        return { 'errors': validation_errors_to_error_messages(form.errors) }, 400
