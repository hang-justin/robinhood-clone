from .db import db, environment, SCHEMA, add_prefix_for_prod
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(
                        db.Integer,
                        primary_key=True)
    username = db.Column(
                        db.String(255),
                        nullable=True,
                        unique=True)
    first_name = db.Column(
                        db.String(50),
                        nullable=False)
    last_name = db.Column(
                        db.String(50),
                        nullable=False)
    email = db.Column(
                        db.String(255),
                        nullable=False,
                        unique=True)
    hashed_password = db.Column(
                        db.String(255),
                        nullable=False)
    created_at = db.Column(
                        db.DateTime,
                        nullable=False)
    updated_at = db.Column(
                        db.DateTime,
                        nullable=False)


    @property
    def password(self):
        return self.hashed_password


    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)


    def check_password(self, password):
        return check_password_hash(self.password, password)


    # Relationships
    assets = db.relationship('Asset', back_populates='owner')
    transactions = db.relationship('Transaction', back_populates='party')
    watchlists = db.relationship('Watchlist', back_populates='owner')


    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'first_name': self.first_name,
            'last_name': self.last_name,
            'email': self.email,
            'assets': [asset.to_dict_owner_asset() for asset in self.assets],
            'watchlists': [watchlist.to_dict() for watchlist in self.watchlists]
        }

    def to_dict_user_transactions(self):
        return {
            'transactions': [transaction.to_dict() for transaction in self.transactions]
        }


    def __repr__(self):
        return f'<User, id={self.id}, username={self.username}>'
