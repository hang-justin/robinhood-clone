from app.models import db, Asset

def seed_assets():
    demo1_btc = Asset(
                        owner_id = 1,
                        asset_id = 'bitcoin',
                        symbol = 'btc',
                        name = 'Bitcoin',
                        type = 'cryptocurrency',
                        quantity = 1.2)
    demo1_eth = Asset(
                        owner_id = 1,
                        asset_id = 'ethereum',
                        symbol = 'eth',
                        name = 'Ethereum',
                        type = 'cryptocurrency',
                        quantity = 0.5)
    demo1_bnb = Asset(
                        owner_id = 1,
                        asset_id = 'binancecoin',
                        symbol = 'bnb',
                        name = 'BNB',
                        type = 'cryptocurrency',
                        quantity = 10)
    demo1_cash = Asset(
                        owner_id = 1,
                        asset_id = '$$$$$',
                        symbol = '$$$$$',
                        name = '$$$$$',
                        type = 'BUYING POWER',
                        quantity = 10000.00)


    marnie2_xrp = Asset(
                        owner_id = 2,
                        asset_id = 'ripple',
                        symbol = 'xrp',
                        name = 'XRP',
                        type = 'cryptocurrency',
                        quantity = 10)
    marnie2_ada = Asset(
                        owner_id = 2,
                        asset_id = 'cardano',
                        symbol = 'ada',
                        name = 'Cardano',
                        type = 'cryptocurrency',
                        quantity = 5.5)
    marnie2_sol = Asset(
                        owner_id = 2,
                        asset_id = 'solana',
                        symbol = 'sol',
                        name = 'Solana',
                        type = 'cryptocurrency',
                        quantity = 4.38)
    marnie2_doge = Asset(
                        owner_id = 2,
                        asset_id = 'dogecoin',
                        symbol = 'doge',
                        name = 'Dogecoin',
                        type = 'cryptocurrency',
                        quantity = 3190.845)
    marnie2_cash = Asset(
                        owner_id = 2,
                        asset_id = '$$$$$',
                        symbol = '$$$$$',
                        name = '$$$$$',
                        type = 'BUYING POWER',
                        quantity = 35000.00)

    bobbie3_matic = Asset(
                        owner_id = 3,
                        asset_id = 'matic-network',
                        symbol = 'matic',
                        name = 'Polygon',
                        type = 'cryptocurrency',
                        quantity = 5.94)
    bobbie3_dot = Asset(
                        owner_id = 3,
                        asset_id = 'polkadot',
                        symbol = 'dot',
                        name = 'Polkadot',
                        type = 'cryptocurrency',
                        quantity = 11.24)
    bobbie3_steth = Asset(
                        owner_id = 3,
                        asset_id = 'staked-ether',
                        symbol = 'steth',
                        name = 'Lido Staked Ether',
                        type = 'cryptocurrency',
                        quantity = 0.415)
    bobbie3_cash = Asset(
                        owner_id = 3,
                        asset_id = '$$$$$',
                        symbol = '$$$$$',
                        name = '$$$$$',
                        type = 'BUYING POWER',
                        quantity = 50000.00)


    db.session.add(demo1_btc)
    db.session.add(demo1_eth)
    db.session.add(demo1_bnb)
    db.session.add(demo1_cash)


    db.session.add(marnie2_xrp)
    db.session.add(marnie2_ada)
    db.session.add(marnie2_sol)
    db.session.add(marnie2_doge)
    db.session.add(marnie2_cash)


    db.session.add(bobbie3_matic)
    db.session.add(bobbie3_dot)
    db.session.add(bobbie3_steth)
    db.session.add(bobbie3_cash)


    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_assets():
    db.session.execute('TRUNCATE assets RESTART IDENTITY CASCADE;')
    db.session.commit()
