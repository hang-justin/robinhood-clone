from .db import db, environment, SCHEMA, add_prefix_for_prod

class Asset(db.Model):
    __tablename__ = 'assets'

    # COLUMN: asset_id
    # Must be a unique identifier for use with other APIs
    # Finnhub to pull stocks and use its symbol for asset_id
    # CoinGecko (CG) to pull coins. CG has its an id for each coin
    #       type=coin   => asset_id = coin_id
    #       type=stock  => asset_id = symbol

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
                        db.Float,
                        nullable=False)

    # Foreign Key Columns
    owner_id = db.Column(
                        db.Integer,
                        db.ForeignKey(add_prefix_for_prod('users.id')))

    # Bidrectional one-to-many
    owner = db.relationship('User', back_populates='assets')


    # Unique constraint amongst combination of asset_id and owner_id col
    # Unique Index = uix
    # __table_args__ expects a tuple
    if environment == 'production':
        __table_args__ = (
                            db.UniqueConstraint(
                                    asset_id,
                                    owner_id,
                                    name='uix_asset_owner'),
                            {'schema': SCHEMA})
    else:
        __table_args__ = (
                            db.UniqueConstraint(
                                    asset_id,
                                    owner_id,
                                    name='uix_asset_owner'),)


    def add_to_asset(self, quantity):
        self.quantity = self.quantity + quantity

    def deduct_from_asset(self, quantity):
        if (quantity > self.quantity):
            raise Exception('Insufficient funds. Unable to deduct more than current holdings in asset.')
        self.quantity = self.quantity - quantity

    def to_dict_owner_asset(self):
        return {
            'id': self.id,
            'asset_id': self.asset_id,
            'symbol': self.symbol,
            'name': self.name,
            'type': self.type,
            'quantity': self.quantity
        }
