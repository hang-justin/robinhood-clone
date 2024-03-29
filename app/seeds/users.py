from app.models import db, User
from datetime import datetime, timezone

def seed_users():
    demo = User(
        username='Demo1',
        email='demo@aa.io',
        first_name= 'Demo',
        last_name= 'Lition',
        password='password',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc))
    marnie = User(
        username='marnie2',
        email='marnie@aa.io',
        first_name= 'Marnie',
        last_name= 'Doe',
        password='password',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc))
    bobbie = User(
        username='bobbie3',
        email='bobbie@aa.io',
        first_name= 'Bobbie',
        last_name= 'Nguyen',
        password='password',
        created_at=datetime.now(timezone.utc),
        updated_at=datetime.now(timezone.utc))

    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
