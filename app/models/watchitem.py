from .db import db, environment, SCHEMA, add_prefix_for_prod
from .watchlistitems import watchlist_item

class Watchitem(db.Model):
    __tablename__ = 'watchitems'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(
                        db.Integer,
                        primary_key=True)
    asset_id = db.Column(
                        db.String(20),
                        nullable=False,
                        unique=True )
    symbol = db.Column(
                        db.String(10),
                        nullable=False)
    name = db.Column(
                        db.String(50),
                        nullable=False)
    type = db.Column(
                        db.String(20),
                        nullable=False)


    # COLUMN: asset_id
    # Must be a unique identifier for use with other APIs
    # Finnhub to pull stocks and use its symbol for asset_id
    # CoinGecko (CG) to pull coins. CG has its an id for each coin
    #       type=coin   => asset_id = coin_id
    #       type=stock  => asset_id = symbol


    # many-to-many
    in_watchlists = db.relationship(
        'Watchlist',
        secondary=watchlist_item,
        back_populates='items'
    )

    def to_dict_watchlist_item(self):
        return {
            'id': self.id,
            'asset_id': self.asset_id,
            'symbol': self.symbol,
            'name': self.name,
            'type': self.type,
        }
