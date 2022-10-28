from .db import db

watchlist_item = db.Table(
    'watchlist_item',
    db.Model.metadata,
    db.column('watchlist_id', db.Integer, db.ForeignKey('watchlists.id'), primary_key=True),
    db.column('item_id', db.String(10), db.ForeignKey('assets.id'), primary_key=True)
)
