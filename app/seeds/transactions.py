from app.models import db, Transaction
from datetime import datetime

def seed_transactions():
    demo1_btc = Transaction(
                        party_id = 1,
                        asset_id = 'bitcoin',
                        symbol = 'btc',
                        name = 'Bitcoin',
                        type = 'cryptocurrency',
                        quantity = 1.2,
                        total = 20150.16,
                        timestamp = datetime.now())
    demo1_eth = Transaction(
                        party_id = 1,
                        asset_id = 'ethereum',
                        symbol = 'eth',
                        name = 'Ethereum',
                        type = 'cryptocurrency',
                        quantity = 0.5,
                        total = 703.18,
                        timestamp = datetime.now())
    demo1_bnb = Transaction(
                        party_id = 1,
                        asset_id = 'binancecoin',
                        symbol = 'bnb',
                        name = 'BNB',
                        type = 'cryptocurrency',
                        quantity = 10,
                        total = 2524.15,
                        timestamp = datetime.now())


    marnie2_xrp = Transaction(
                        party_id = 2,
                        asset_id = 'ripple',
                        symbol = 'xrp',
                        name = 'XRP',
                        type = 'cryptocurrency',
                        quantity = 10,
                        total = 3.84,
                        timestamp = datetime.now())
    marnie2_ada = Transaction(
                        party_id = 2,
                        asset_id = 'cardano',
                        symbol = 'ada',
                        name = 'Cardano',
                        type = 'cryptocurrency',
                        quantity = 5.5,
                        total = 1.58,
                        timestamp = datetime.now())
    marnie2_sol = Transaction(
                        party_id = 2,
                        asset_id = 'solana',
                        symbol = 'sol',
                        name = 'Solana',
                        type = 'cryptocurrency',
                        quantity = 4.38,
                        total = 94.38,
                        timestamp = datetime.now())
    marnie2_doge = Transaction(
                        party_id = 2,
                        asset_id = 'dogecoin',
                        symbol = 'doge',
                        name = 'Dogecoin',
                        type = 'cryptocurrency',
                        quantity = 3190.845,
                        total = 204.96,
                        timestamp = datetime.now())


    bobbie_matic = Transaction(
                        party_id = 3,
                        asset_id = 'matic-network',
                        symbol = 'matic',
                        name = 'Polygon',
                        type = 'cryptocurrency',
                        quantity = 5.94,
                        total = 4.29,
                        timestamp = datetime.now())
    bobbie_dot = Transaction(
                        party_id = 3,
                        asset_id = 'polkadot',
                        symbol = 'dot',
                        name = 'Polkadot',
                        type = 'cryptocurrency',
                        quantity = 11.24,
                        total = 57.82,
                        timestamp = datetime.now())
    bobbie_steth = Transaction(
                        party_id = 3,
                        asset_id = 'staked-ether',
                        symbol = 'steth',
                        name = 'Lido Staked Ether',
                        type = 'cryptocurrency',
                        quantity = 0.415,
                        total = 514.82,
                        timestamp = datetime.now())


    db.session.add(demo1_btc)
    db.session.add(demo1_eth)
    db.session.add(demo1_bnb)
    db.session.add(marnie2_xrp)
    db.session.add(marnie2_ada)
    db.session.add(marnie2_sol)
    db.session.add(marnie2_doge)
    db.session.add(bobbie_matic)
    db.session.add(bobbie_dot)
    db.session.add(bobbie_steth)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
