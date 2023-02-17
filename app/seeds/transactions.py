from app.models import db, Transaction
from datetime import datetime, timezone

def seed_transactions():
    demo1_btc = Transaction(
                        party_id = 1,
                        asset_id = 'bitcoin',
                        symbol = 'btc',
                        name = 'Bitcoin',
                        type = 'buy cryptocurrency',
                        quantity = 1.2,
                        total = 20150.16,
                        timestamp = datetime.now(timezone.utc))
    demo1_eth = Transaction(
                        party_id = 1,
                        asset_id = 'ethereum',
                        symbol = 'eth',
                        name = 'Ethereum',
                        type = 'buy cryptocurrency',
                        quantity = 0.5,
                        total = 703.18,
                        timestamp = datetime.now(timezone.utc))
    demo1_bnb = Transaction(
                        party_id = 1,
                        asset_id = 'binancecoin',
                        symbol = 'bnb',
                        name = 'BNB',
                        type = 'buy cryptocurrency',
                        quantity = 10,
                        total = 2524.15,
                        timestamp = datetime.now(timezone.utc))
    demo1_cash = Transaction(
                        party_id = 1,
                        asset_id = '$$$$$',
                        symbol = '$$$$$',
                        name = '$$$$$',
                        type = 'deposit cash',
                        quantity = 10000,
                        total = 10000,
                        timestamp = datetime.now(timezone.utc))


    marnie2_xrp = Transaction(
                        party_id = 2,
                        asset_id = 'ripple',
                        symbol = 'xrp',
                        name = 'XRP',
                        type = 'buy cryptocurrency',
                        quantity = 10,
                        total = 3.84,
                        timestamp = datetime.now(timezone.utc))
    marnie2_ada = Transaction(
                        party_id = 2,
                        asset_id = 'cardano',
                        symbol = 'ada',
                        name = 'Cardano',
                        type = 'buy cryptocurrency',
                        quantity = 5.5,
                        total = 1.58,
                        timestamp = datetime.now(timezone.utc))
    marnie2_sol = Transaction(
                        party_id = 2,
                        asset_id = 'solana',
                        symbol = 'sol',
                        name = 'Solana',
                        type = 'buy cryptocurrency',
                        quantity = 4.38,
                        total = 94.38,
                        timestamp = datetime.now(timezone.utc))
    marnie2_doge = Transaction(
                        party_id = 2,
                        asset_id = 'dogecoin',
                        symbol = 'doge',
                        name = 'Dogecoin',
                        type = 'buy cryptocurrency',
                        quantity = 3190.845,
                        total = 204.96,
                        timestamp = datetime.now(timezone.utc))
    marnie2_cash = Transaction(
                        party_id = 2,
                        asset_id = '$$$$$',
                        symbol = '$$$$$',
                        name = '$$$$$',
                        type = 'deposit cash',
                        quantity = 35000,
                        total = 35000,
                        timestamp = datetime.now(timezone.utc))


    bobbie_matic = Transaction(
                        party_id = 3,
                        asset_id = 'matic-network',
                        symbol = 'matic',
                        name = 'Polygon',
                        type = 'buy cryptocurrency',
                        quantity = 5.94,
                        total = 4.29,
                        timestamp = datetime.now(timezone.utc))
    bobbie_dot = Transaction(
                        party_id = 3,
                        asset_id = 'polkadot',
                        symbol = 'dot',
                        name = 'Polkadot',
                        type = 'buy cryptocurrency',
                        quantity = 11.24,
                        total = 57.82,
                        timestamp = datetime.now(timezone.utc))
    bobbie_steth = Transaction(
                        party_id = 3,
                        asset_id = 'staked-ether',
                        symbol = 'steth',
                        name = 'Lido Staked Ether',
                        type = 'buy cryptocurrency',
                        quantity = 0.415,
                        total = 514.82,
                        timestamp = datetime.now(timezone.utc))
    bobbie_cash = Transaction(
                        party_id = 3,
                        asset_id = '$$$$$',
                        symbol = '$$$$$',
                        name = '$$$$$',
                        type = 'deposit cash',
                        quantity = 50000,
                        total = 50000,
                        timestamp = datetime.now(timezone.utc))


    db.session.add(demo1_btc)
    db.session.add(demo1_eth)
    db.session.add(demo1_bnb)
    db.session.add(demo1_cash)
    db.session.add(marnie2_xrp)
    db.session.add(marnie2_ada)
    db.session.add(marnie2_sol)
    db.session.add(marnie2_doge)
    db.session.add(marnie2_cash)
    db.session.add(bobbie_matic)
    db.session.add(bobbie_dot)
    db.session.add(bobbie_steth)
    db.session.add(bobbie_cash)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_transactions():
    db.session.execute('TRUNCATE transactions RESTART IDENTITY CASCADE;')
    db.session.commit()
