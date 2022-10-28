from .db import db
from .watchlistitems import watchlist_item

class Asset(db.Model):
    __tablename__ = 'assets'

    id = db.Column(
                        db.Integer,
                        primary_key=True)
    ticker = db.Column(
                        db.String(10),
                        nullable=False)
    name = db.Column(
                        db.String(50),
                        nullable=False)
    type = db.Column(
                        db.String(10),
                        nullable=False)
    quantity = db.Column(
                        db.Float)


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
            'ticker': self.ticker,
            'name': self.name,
            'type': self.type,
            'quantity': self.quantity
        }


    def to_dict_watchlist_item(self):
        return {
            'ticker': self.ticker,
            'name': self.name,
            'type': self.type,
        }
