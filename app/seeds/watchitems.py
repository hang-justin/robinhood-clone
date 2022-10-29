from app.models import db, Watchitem

def seed_watchitems():
    watchlist_btc = Watchitem(
                        asset_id = 'bitcoin',
                        symbol = 'btc',
                        name = 'Bitcoin',
                        type = 'cryptocurrency')
    watchlist_eth = Watchitem(
                        asset_id = 'ethereum',
                        symbol = 'eth',
                        name = 'Ethereum',
                        type = 'cryptocurrency')
    watchlist_bnb = Watchitem(
                        asset_id = 'binancecoin',
                        symbol = 'bnb',
                        name = 'BNB',
                        type = 'cryptocurrency')
    watchlist_xrp = Watchitem(
                        asset_id = 'ripple',
                        symbol = 'xrp',
                        name = 'XRP',
                        type = 'cryptocurrency')
    watchlist_ada = Watchitem(
                        asset_id = 'cardano',
                        symbol = 'ada',
                        name = 'Cardano',
                        type = 'cryptocurrency')
    watchlist_sol = Watchitem(
                        asset_id = 'solana',
                        symbol = 'sol',
                        name = 'Solana',
                        type = 'cryptocurrency')
    watchlist_doge = Watchitem(
                        asset_id = 'dogecoin',
                        symbol = 'doge',
                        name = 'Dogecoin',
                        type = 'cryptocurrency')
    watchlist_matic = Watchitem(
                        asset_id = 'matic-network',
                        symbol = 'matic',
                        name = 'Polygon',
                        type = 'cryptocurrency')
    watchlist_dot = Watchitem(
                        asset_id = 'polkadot',
                        symbol = 'dot',
                        name = 'Polkadot',
                        type = 'cryptocurrency')
    watchlist_steth = Watchitem(
                        asset_id = 'staked-ether',
                        symbol = 'steth',
                        name = 'Lido Staked Ether',
                        type = 'cryptocurrency')


    db.session.add(watchlist_btc)
    db.session.add(watchlist_eth)
    db.session.add(watchlist_bnb)
    db.session.add(watchlist_xrp)
    db.session.add(watchlist_ada)
    db.session.add(watchlist_sol)
    db.session.add(watchlist_doge)
    db.session.add(watchlist_matic)
    db.session.add(watchlist_dot)
    db.session.add(watchlist_steth)

    db.session.commit()

def undo_watchitems():
    db.session.execute('TRUNCATE watchitems RESTART IDENTITY CASCADE;')
    db.session.commit()
