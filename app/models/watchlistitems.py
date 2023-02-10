from .db import db, environment, SCHEMA, add_prefix_for_prod

watchlist_item = db.Table(
    'watchlist_item',
    db.Model.metadata,
        db.Column('watchlist_id', db.Integer, db.ForeignKey('watchlists.id'), primary_key=True),
    db.Column('item_id', db.Integer, db.ForeignKey('watchitems.id'), primary_key=True)
    # db.Column('watchlist_id', db.Integer, db.ForeignKey(add_prefix_for_prod('watchlists.id')), primary_key=True),
    # db.Column('item_id', db.Integer, db.ForeignKey(add_prefix_for_prod('watchitems.id')), primary_key=True)
)

# if environment == "production":
#     watchlist_item.schema = SCHEMA
