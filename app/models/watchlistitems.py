from .db import db

watchlist_item = db.Table(
    'watchlist_item',
    db.Model.metadata,
    db.Column('watchlist_id', db.Integer, db.ForeignKey('watchlists.id'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey('watchitems.id'), primary_key=True)
)
