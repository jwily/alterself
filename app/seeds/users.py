from app.models import db, User, Campaign, environment, SCHEMA


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@alterself.com', password='password', first_name='stranger')
    squall = User(
        username='Leonhart', email='rough@divide.com', password='password', first_name='Squall')
    rinoa = User(
        username='Heartilly', email='shooting@star.com', password='password', first_name='Rinoa')

    arr = Campaign(user_id=1, name="A Realm Reborn")

    hw = Campaign(user_id=2, name="Heavensward")

    db.session.add(demo)
    db.session.add(squall)
    db.session.add(rinoa)

    db.session.add(arr)
    db.session.add(hw)

    demo.joined_campaigns.append(hw)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.campaigns RESTART IDENTITY CASCADE;")
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.users RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE campaigns RESTART IDENTITY CASCADE;')
        db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
