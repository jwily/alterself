from app.models import db, Item, environment, SCHEMA


def seed_items():

    zex1 = Item(
        char_id=1,
        user_id=1,
        name='Leather Armor',
        description='Light Armor with AC of 11'
    )

    zex2 = Item(
        char_id=1,
        user_id=1,
        name='Druidic Focus',
        description='',
    )

    ayl1 = Item(
        char_id=2,
        user_id=1,
        name='Chain Mail',
        description='',
    )

    db.session.add(zex1)
    db.session.add(zex2)

    db.session.add(ayl1)

    db.session.commit()


def undo_items():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.items RESTART IDENTITY CASCADE;")
    else:
        db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
