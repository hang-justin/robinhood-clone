from .db import db, environment, SCHEMA, add_prefix_for_prod

class Transaction(db.Model):
    __tablename__ = 'transactions'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

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
    total = db.Column(
                        db.Float,
                        nullable=False)
    timestamp = db.Column(
                        db.DateTime,
                        nullable=False)


    # Foreign Key Columns
    party_id = db.Column(
                        db.Integer,
                        db.ForeignKey(add_prefix_for_prod('users.id')))


    # Bidrectional one-to-many
    party = db.relationship('User', back_populates='transactions')


    def to_dict(self):
        return {
            'id': self.id,
            'asset_id': self.asset_id,
            'symbol': self.symbol,
            'name': self.name,
            'type': self.type,
            'quantity': self.quantity,
            'total': self.total,
            'timestamp': self.timestamp
        }
