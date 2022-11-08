"""restore db for render deploy

Revision ID: ace7b16e7366
Revises:
Create Date: 2022-11-07 20:31:15.804965

"""
from alembic import op
import sqlalchemy as sa


# Add for render deploy
import os
environment = os.getenv("FLASK_ENV")
SCHEMA = os.environ.get("SCHEMA")


# revision identifiers, used by Alembic.
revision = 'ace7b16e7366'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('users',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('username', sa.String(length=255), nullable=True),
    sa.Column('first_name', sa.String(length=50), nullable=False),
    sa.Column('last_name', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=255), nullable=False),
    sa.Column('hashed_password', sa.String(length=255), nullable=False),
    sa.Column('created_at', sa.DateTime(), nullable=False),
    sa.Column('updated_at', sa.DateTime(), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('watchitems',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('asset_id', sa.String(length=20), nullable=False),
    sa.Column('symbol', sa.String(length=10), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('type', sa.String(length=20), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('asset_id')
    )
    op.create_table('assets',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('asset_id', sa.String(length=20), nullable=False),
    sa.Column('symbol', sa.String(length=10), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('type', sa.String(length=20), nullable=False),
    sa.Column('quantity', sa.Float(), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('asset_id', 'owner_id', name='uix_asset_owner')
    )
    op.create_table('transactions',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('asset_id', sa.String(length=20), nullable=False),
    sa.Column('symbol', sa.String(length=10), nullable=False),
    sa.Column('name', sa.String(length=50), nullable=False),
    sa.Column('type', sa.String(length=20), nullable=False),
    sa.Column('quantity', sa.Float(), nullable=False),
    sa.Column('total', sa.Float(), nullable=False),
    sa.Column('timestamp', sa.DateTime(), nullable=False),
    sa.Column('party_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['party_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('watchlists',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('name', sa.String(length=64), nullable=False),
    sa.Column('owner_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['owner_id'], ['users.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('name', 'owner_id', name='uix_asset_owner')
    )
    op.create_table('watchlist_item',
    sa.Column('watchlist_id', sa.Integer(), nullable=False),
    sa.Column('item_id', sa.Integer(), nullable=False),
    sa.ForeignKeyConstraint(['item_id'], ['watchitems.id'], ),
    sa.ForeignKeyConstraint(['watchlist_id'], ['watchlists.id'], ),
    sa.PrimaryKeyConstraint('watchlist_id', 'item_id')
    )
    # ### end Alembic commands ###

    # Add command for schema prefix
    if environment == "production":
        op.execute(f"ALTER TABLE users SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE watchitems SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE assets SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE transactions SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE watchlists SET SCHEMA {SCHEMA};")
        op.execute(f"ALTER TABLE watchlist_item SET SCHEMA {SCHEMA};")


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('watchlist_item')
    op.drop_table('watchlists')
    op.drop_table('transactions')
    op.drop_table('assets')
    op.drop_table('watchitems')
    op.drop_table('users')
    # ### end Alembic commands ###