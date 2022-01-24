from app.models import db, Item


def seed_items():

    zex1 = Item(
        char_id=1,
        name='Leather Armor',
        description='Light Armor with AC of 11'
    )

    zex2 = Item(
        char_id=1,
        name='Druidic Focus'
    )

    ayl1 = Item(
        char_id=2,
        name='Chain Mail'
    )

    db.session.add(zex1)
    db.session.add(zex2)

    db.session.add(ayl1)

    db.session.commit()


def undo_items():
    db.session.execute('TRUNCATE items RESTART IDENTITY CASCADE;')
    db.session.commit()
