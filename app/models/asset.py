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


    # Unique constraint amongst combination of asset_id and owner_id col
    # Unique Index = uix
    # __table_args__ expects a tuple
    __table_args__ = (db.UniqueConstraint(
                                asset_id,
                                owner_id,
                                name='uix_asset_owner'),)


    # Bidrectional one-to-many
    owner = db.relationship('User', back_populates='assets')


    # many-to-many
    in_watchlists = db.relationship(
        'Watchlist',
        secondary=watchlist_item,
        back_populates='items'
    )


    def add_to_asset(self, quantity):
        self.quantity = self.quantity + quantity

    def deduct_from_asset(self, quantity):
        if (quantity > self.quantity):
            return 'Insufficient funds. Unable to deduct more than holdings in asset.'
        self.quantity = self.quantity - quantity

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
