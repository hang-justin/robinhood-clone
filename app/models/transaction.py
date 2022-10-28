from .db import db

class Transaction(db.Model):
    __tablename__ = 'transactions'

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
                        db.ForeignKey('users.id'))


    # Bidrectional one-to-many
    party = db.relationship('User', back_populates='transactions')


    def to_dict(self):
        return {
            'id': self.id,
            'ticker': self.ticker,
            'name': self.name,
            'type': self.type,
            'quantity': self.quantity,
            'total': self.total,
            'timestamp': self.timestamp
        }
