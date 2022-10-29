from .db import db
from .watchlistitems import watchlist_item

class Watchlist(db.Model):
    __tablename__ = 'watchlists'

    id = db.Column(
                        db.Integer,
                        primary_key=True)
    name = db.Column(
                        db.String(64),
                        nullable=False)


    # Foreign Key Columns
    owner_id = db.Column(
                        db.Integer,
                        db.ForeignKey('users.id'))


    # Unique constraint amongst combination of watchlist name and owner_id
    # Unique Index = uix
    # __table_args__ expects a tuple
    __table_args__ = (db.UniqueConstraint(
                                name,
                                owner_id,
                                name='uix_name_owner'),)

    # Bidrectional one-to-many (user-to-watchlists)
    owner = db.relationship('User', back_populates='watchlists')


    # many-to-many
    items = db.relationship(
        'Watchitem',
        secondary=watchlist_item,
        back_populates='in_watchlists'
    )


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'items': [item.to_dict_watchlist_item() for item in self.items]
        }
