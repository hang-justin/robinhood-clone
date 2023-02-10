from flask.cli import AppGroup
from .users import seed_users, undo_users
from .assets import seed_assets, undo_assets
from .transactions import seed_transactions, undo_transactions
from .watchlists import seed_watchlists, undo_watchlists
from .watchitems import seed_watchitems, undo_watchitems

# import added for render.com
from app.models.db import db, environment, SCHEMA

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    # if environment == 'production':
    #     # Before seeding, truncate all tables prefixed with schema name
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    #     # Add a truncate command here for every table that will be seeded.
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.assets RESTART IDENTITY CASCADE;")
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.transactions RESTART IDENTITY CASCADE;")
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.watchitems RESTART IDENTITY CASCADE;")
    #     db.session.execute(f"TRUNCATE table {SCHEMA}.watchlists RESTART IDENTITY CASCADE;")
    #     # Will this truncate table for watchlist item be needed? we aren't seeding it...
    #     # db.session.execute(f"TRUNCATE table {SCHEMA}.watchlist_item RESTART IDENTITY CASCADE;")
    #     db.session.commit()

    seed_users()
    seed_assets()
    seed_transactions()
    seed_watchitems()
    seed_watchlists()


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_watchlists()
    undo_assets()
    undo_transactions()
    undo_watchitems()
    undo_users()
