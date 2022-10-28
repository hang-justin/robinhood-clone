from .db import db
from .watchlistitems import watchlist_item

class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(
                        db.Integer,
                        primary_key=True)
    asset_id = db.Column(
                        db.String(20),
                        nullable=False)
    symbol = db.Column(
                        db.String(10),
                        nullable=False)
    name = db.Column(
                        db.String(50),
                        nullable=False)
    type = db.Column(
                        db.String(20),
                        nullable=False)
    quantity = db.Column(
                        db.Float)

    # COLUMN: asset_id
    # Must be a unique identifier for use with other APIs
    # Finnhub to pull stocks and use its symbol for asset_id
    # CoinGecko (CG) to pull coins. CG has its an id for each coin
    #       type=coin   => asset_id = coin_id
    #       type=stock  => asset_id = symbol


    # Foreign Key Columns
    owner_id = db.Column(
                        db.Integer,
                        db.ForeignKey('users.id'))


    # Bidrectional one-to-many
    owner = db.relationship('User', back_populates='assets')


    # many-to-many
    in_watchlists = db.relationship(
        'Watchlist',
        secondary=watchlist_item,
        back_populates='items'
    )


    def to_dict_owner_asset(self):
        return {
            'asset_id': self.asset_id,
            'symbol': self.symbol,
            'name': self.name,
            'type': self.type,
            'quantity': self.quantity
        }


    def to_dict_watchlist_item(self):
        return {
            'asset_id': self.asset_id,
            'symbol': self.symbol,
            'name': self.name,
            'type': self.type,
        }
