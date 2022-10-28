from app.models import db, Watchlist, Asset
from datetime import datetime

def seed_watchlists():
    demo_watchlist = Watchlist(
                            owner_id = 1,
                            name = 'My First List')

    marnie_watchlist = Watchlist(
                            owner_id = 2,
                            name = 'My First List')

    bobbie_watchlist = Watchlist(
                            owner_id = 3,
                            name = 'My First List')

    watchlist_assets = Asset.query.filter(Asset.quantity == None).all()

    for asset in watchlist_assets:
        demo_watchlist.items.append(asset)
        marnie_watchlist.items.append(asset)
        bobbie_watchlist.items.append(asset)

    db.session.add(demo_watchlist)
    db.session.add(marnie_watchlist)
    db.session.add(bobbie_watchlist)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_watchlists():
    db.session.execute('TRUNCATE watchlists RESTART IDENTITY CASCADE;')
    db.session.commit()
